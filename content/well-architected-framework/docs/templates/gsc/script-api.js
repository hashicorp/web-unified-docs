// Google Search Console API Report (Standalone)
// VERSION: 1.0
//
// This is a standalone script — paste only this file into Apps Script.
//
// Setup (one time):
// 1. In Apps Script editor, click Project Settings (gear icon)
// 2. Check "Show appsscript.json manifest file in editor"
// 3. Open appsscript.json and set "oauthScopes" to:
//      ["https://www.googleapis.com/auth/spreadsheets",
//       "https://www.googleapis.com/auth/webmasters.readonly"]
// 4. Save. On first run you will be prompted to re-authorize.
//
// Run: runGscSeoReportApi()
// No sheets to prepare — date ranges are calculated automatically from today.

const SITE_URL = "https://developer.hashicorp.com/";

function runGscSeoReportApi() {
  const ss = SpreadsheetApp.getActive();
  const ui = SpreadsheetApp.getUi();

  // Auto-calculate: current = last 90 days, previous = 90 days before that
  const { current, previous } = calculateApiDateRanges_();

  const confirm = ui.alert(
    'Fetching from Search Console API',
    `Current:  ${current.start} → ${current.end}\nPrevious: ${previous.start} → ${previous.end}\n\nContinue?`,
    ui.ButtonSet.OK_CANCEL
  );
  if (confirm !== ui.Button.OK) return;

  Logger.log(`Fetching current period: ${current.start} to ${current.end}`);
  const currentRows  = fetchAllGscRows_(current.start, current.end);

  Logger.log(`Fetching previous period: ${previous.start} to ${previous.end}`);
  const previousRows = fetchAllGscRows_(previous.start, previous.end);

  const currentData  = apiRowsToMap_(currentRows);
  const previousData = apiRowsToMap_(previousRows);

  Logger.log(`API returned ${currentData.size} current URLs, ${previousData.size} previous URLs`);

  if (currentData.size === 0) {
    throw new Error(
      'No URLs returned from the API.\n\n' +
      'Check that your Google account has access to ' + SITE_URL + ' in Search Console.'
    );
  }

  // Build active/deprecated URL lists
  cleanupOldTabs_(ss);

  const activeUrls       = Array.from(currentData.keys());
  const deprecatedUrls   = [];
  const currentNormalized = new Set(activeUrls.map(url => normalizeUrl_(url)));

  for (const url of previousData.keys()) {
    if (!currentNormalized.has(normalizeUrl_(url))) {
      deprecatedUrls.push(url);
    }
  }

  // Process URLs (same logic as runGscSeoReportManual)
  const urlData    = [];
  const pillarData = new Map();

  for (const url of activeUrls) {
    const cur  = currentData.get(url)  || { clicks: 0, impressions: 0, ctr: 0, position: 0 };
    const prev = previousData.get(url) || { clicks: 0, impressions: 0, ctr: 0, position: 0 };
    const pillar      = getPillarFromUrl_(url);
    const displayName = extractUrlLabel_(url);

    const clicksDelta = cur.clicks - prev.clicks;
    const clicksPct   = safePctChange_(cur.clicks, prev.clicks);
    const imprDelta   = cur.impressions - prev.impressions;
    const imprPct     = safePctChange_(cur.impressions, prev.impressions);
    const ctrDelta    = cur.ctr - prev.ctr;
    const posDelta    = cur.position - prev.position;
    const status      = getStatus_(cur, prev, clicksPct, imprPct, ctrDelta, posDelta);

    urlData.push({ url, displayName, pillar, status, cur, prev, clicksDelta, clicksPct, imprDelta, imprPct, ctrDelta, posDelta });

    if (!pillarData.has(pillar)) {
      pillarData.set(pillar, { pillar, curClicks: 0, prevClicks: 0, curImpr: 0, prevImpr: 0, posSum: 0, posCount: 0, pageCount: 0, urls: [] });
    }
    const pd = pillarData.get(pillar);
    pd.curClicks += cur.clicks;
    pd.prevClicks += prev.clicks;
    pd.curImpr += cur.impressions;
    pd.prevImpr += prev.impressions;
    if (cur.position > 0) { pd.posSum += cur.position; pd.posCount++; }
    pd.pageCount++;
    pd.urls.push({ url, displayName, clicks: cur.clicks, clicksDelta });
  }

  const deprecatedData = [];
  for (const url of deprecatedUrls) {
    const prev = previousData.get(url);
    deprecatedData.push({
      url,
      displayName: extractUrlLabel_(url),
      pillar:      getPillarFromUrl_(url) || "Deprecated",
      prevClicks:  prev.clicks,
      prevImpr:    prev.impressions,
      prevCtr:     prev.ctr,
      prevPos:     prev.position
    });
  }

  // Generate report tabs
  const dateRanges = { current, previous };
  writeExecutiveSummary_(ss, urlData, pillarData, dateRanges);
  writePillarAnalysis_(ss, pillarData, dateRanges);
  writePageDetails_(ss, urlData, dateRanges);
  writeCharts_(ss, urlData, pillarData);
  writeActionItems_(ss, urlData, dateRanges);
  writeDeprecated_(ss, deprecatedData, dateRanges);
  writeAbout_(ss, dateRanges);
  reorderTabs_(ss);

  const improving = urlData.filter(d => d.status === "🟢").length;
  const declining  = urlData.filter(d => d.status === "🔴").length;

  ui.alert(
    `✅ Report Generated!\n\n` +
    `${urlData.length} active pages analyzed\n` +
    `${deprecatedData.length} deprecated pages found\n` +
    `${improving} improving | ${declining} declining\n\n` +
    `Current:  ${current.start} → ${current.end}\n` +
    `Previous: ${previous.start} → ${previous.end}`
  );
}

// ============================================================================
// API HELPERS
// ============================================================================

// Fetch all rows for a date range, paginating through results if needed.
// GSC API returns a maximum of 25,000 rows per request.
function fetchAllGscRows_(startDate, endDate) {
  const token    = ScriptApp.getOAuthToken();
  const siteUrl  = encodeURIComponent(SITE_URL);
  const endpoint = `https://searchconsole.googleapis.com/webmasters/v3/sites/${siteUrl}/searchAnalytics/query`;

  const allRows  = [];
  const pageSize = 25000;
  let   startRow = 0;

  while (true) {
    const payload = {
      startDate,
      endDate,
      dimensions: ['page'],
      rowLimit:   pageSize,
      startRow
    };

    const response = UrlFetchApp.fetch(endpoint, {
      method:             'post',
      contentType:        'application/json',
      headers:            { Authorization: `Bearer ${token}` },
      payload:            JSON.stringify(payload),
      muteHttpExceptions: true
    });

    const status = response.getResponseCode();
    if (status !== 200) {
      throw new Error(
        `GSC API error (HTTP ${status}):\n${response.getContentText()}\n\n` +
        `Make sure your account has access to ${SITE_URL} in Search Console ` +
        `and that webmasters.readonly scope is in appsscript.json.`
      );
    }

    const data = JSON.parse(response.getContentText());
    const rows = data.rows || [];
    allRows.push(...rows);

    Logger.log(`  Page startRow=${startRow}: got ${rows.length} rows`);

    if (rows.length < pageSize) break; // Reached last page
    startRow += pageSize;
  }

  Logger.log(`Total rows fetched for ${startDate} → ${endDate}: ${allRows.length}`);
  return allRows;
}

// Convert API response rows to Map<url, {clicks, impressions, ctr, position}>
function apiRowsToMap_(rows) {
  const map = new Map();
  for (const row of rows) {
    const url = row.keys[0];
    map.set(url, {
      clicks:      row.clicks      || 0,
      impressions: row.impressions || 0,
      ctr:         row.ctr         || 0,
      position:    row.position    || 0
    });
  }
  return map;
}

// Calculate two non-overlapping 90-day windows ending yesterday.
// Current  = yesterday going back 90 days
// Previous = the 90 days immediately before that
function calculateApiDateRanges_() {
  const fmt = (d) => d.toISOString().split('T')[0]; // YYYY-MM-DD

  const today     = new Date();
  const curEnd    = new Date(today);
  curEnd.setDate(curEnd.getDate() - 1);           // yesterday

  const curStart  = new Date(curEnd);
  curStart.setDate(curStart.getDate() - 89);      // 90 days inclusive

  const prevEnd   = new Date(curStart);
  prevEnd.setDate(prevEnd.getDate() - 1);         // day before current window

  const prevStart = new Date(prevEnd);
  prevStart.setDate(prevStart.getDate() - 89);    // 90 days inclusive

  return {
    current:  { start: fmt(curStart),  end: fmt(curEnd)  },
    previous: { start: fmt(prevStart), end: fmt(prevEnd) }
  };
}

// ============================================================================
// REPORT TAB FUNCTIONS
// ============================================================================

// ============================================================================
// EXECUTIVE SUMMARY TAB
// ============================================================================

function writeExecutiveSummary_(ss, urlData, pillarData, dateRanges) {
  const sheet = getOrCreateSheet_(ss, "Executive Summary");
  sheet.clear();
  sheet.setColumnWidths(1, 10, 120);
  
  let row = 1;
  
  // Title
  sheet.getRange(row, 1, 1, 6).merge();
  sheet.getRange(row, 1).setValue("📊 SEO Performance Executive Summary");
  sheet.getRange(row, 1).setFontSize(18).setFontWeight("bold").setBackground("#4285F4").setFontColor("#ffffff");
  row += 2;
  
  // Period info
  sheet.getRange(row, 1, 1, 6).merge();
  sheet.getRange(row, 1).setValue(
    `Comparing: ${dateRanges.current.start} to ${dateRanges.current.end} vs ${dateRanges.previous.start} to ${dateRanges.previous.end}`
  );
  sheet.getRange(row, 1).setFontSize(11).setFontColor("#666666");
  row += 2;
  
  // === BIG NUMBER CARDS ===
  const totalCurClicks = urlData.reduce((sum, d) => sum + d.cur.clicks, 0);
  const totalPrevClicks = urlData.reduce((sum, d) => sum + d.prev.clicks, 0);
  const totalCurImpr = urlData.reduce((sum, d) => sum + d.cur.impressions, 0);
  const totalPrevImpr = urlData.reduce((sum, d) => sum + d.prev.impressions, 0);
  
  const clicksChange = totalCurClicks - totalPrevClicks;
  const clicksPct = safePctChange_(totalCurClicks, totalPrevClicks);
  const imprChange = totalCurImpr - totalPrevImpr;
  const imprPct = safePctChange_(totalCurImpr, totalPrevImpr);
  
  const avgPosCur = calculateWeightedAvgPosition_(urlData.map(d => d.cur));
  const avgPosPrev = calculateWeightedAvgPosition_(urlData.map(d => d.prev));
  const avgCtrCur = totalCurImpr > 0 ? totalCurClicks / totalCurImpr : 0;
  const avgCtrPrev = totalPrevImpr > 0 ? totalPrevClicks / totalPrevImpr : 0;
  
  // Card row 1: Clicks and Impressions (Current | Previous | Change)
  sheet.getRange(row, 1).setValue("Total Clicks").setFontSize(10).setFontColor("#666666");
  sheet.getRange(row, 4).setValue("Total Impressions").setFontSize(10).setFontColor("#666666");
  row++;
  
  // Current period (large)
  sheet.getRange(row, 1).setValue(totalCurClicks).setFontSize(24).setFontWeight("bold").setNumberFormat("#,##0");
  sheet.getRange(row, 4).setValue(totalCurImpr).setFontSize(24).setFontWeight("bold").setNumberFormat("#,##0");
  row++;
  
  // Previous period (smaller, side by side)
  sheet.getRange(row, 1).setValue(`Previous: ${totalPrevClicks.toLocaleString()}`).setFontSize(11).setFontColor("#666666");
  sheet.getRange(row, 4).setValue(`Previous: ${totalPrevImpr.toLocaleString()}`).setFontSize(11).setFontColor("#666666");
  row++;
  
  // Change (with color)
  const clicksChangeColor = clicksChange >= 0 ? "#34A853" : "#EA4335";
  const imprChangeColor = imprChange >= 0 ? "#34A853" : "#EA4335";
  sheet.getRange(row, 1).setValue(formatChange_(clicksChange, clicksPct)).setFontSize(12).setFontColor(clicksChangeColor).setFontWeight("bold");
  sheet.getRange(row, 4).setValue(formatChange_(imprChange, imprPct)).setFontSize(12).setFontColor(imprChangeColor).setFontWeight("bold");
  
  // Borders for cards
  sheet.getRange(row - 3, 1, 4, 2).setBackground("#f8f9fa").setBorder(true, true, true, true, false, false, "#dddddd", SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(row - 3, 4, 4, 2).setBackground("#f8f9fa").setBorder(true, true, true, true, false, false, "#dddddd", SpreadsheetApp.BorderStyle.SOLID);
  
  row += 2;
  
  // Card row 2: CTR and Position
  sheet.getRange(row, 1).setValue("Avg CTR").setFontSize(10).setFontColor("#666666");
  sheet.getRange(row, 4).setValue("Avg Position").setFontSize(10).setFontColor("#666666");
  row++;
  
  sheet.getRange(row, 1).setValue(avgCtrCur).setFontSize(24).setFontWeight("bold").setNumberFormat("0.00%");
  sheet.getRange(row, 4).setValue(avgPosCur.toFixed(1)).setFontSize(24).setFontWeight("bold");
  row++;
  
  sheet.getRange(row, 1).setValue(`Previous: ${(avgCtrPrev * 100).toFixed(2)}%`).setFontSize(11).setFontColor("#666666");
  sheet.getRange(row, 4).setValue(`Previous: ${avgPosPrev.toFixed(1)}`).setFontSize(11).setFontColor("#666666");
  row++;
  
  const ctrChange = avgCtrCur - avgCtrPrev;
  const posChange = avgPosCur - avgPosPrev;
  const ctrChangeColor = ctrChange >= 0 ? "#34A853" : "#EA4335";
  const posChangeColor = posChange <= 0 ? "#34A853" : "#EA4335"; // Lower position is better
  
  sheet.getRange(row, 1).setValue(ctrChange >= 0 ? `↗ +${(ctrChange * 100).toFixed(2)}%` : `↘ ${(ctrChange * 100).toFixed(2)}%`).setFontSize(12).setFontColor(ctrChangeColor).setFontWeight("bold");
  sheet.getRange(row, 4).setValue(posChange <= 0 ? `↗ ${posChange.toFixed(1)} (Better)` : `↘ +${posChange.toFixed(1)} (Worse)`).setFontSize(12).setFontColor(posChangeColor).setFontWeight("bold");
  
  sheet.getRange(row - 3, 1, 4, 2).setBackground("#f8f9fa").setBorder(true, true, true, true, false, false, "#dddddd", SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(row - 3, 4, 4, 2).setBackground("#f8f9fa").setBorder(true, true, true, true, false, false, "#dddddd", SpreadsheetApp.BorderStyle.SOLID);
  
  row += 2;
  
  // === PILLAR PERFORMANCE GRID ===
  sheet.getRange(row, 1).setValue("📂 Performance by Pillar");
  sheet.getRange(row, 1).setFontSize(14).setFontWeight("bold");
  row++;
  
  const pillarArray = Array.from(pillarData.values());
  pillarArray.forEach(pd => {
    pd.clicksDelta = pd.curClicks - pd.prevClicks;
    pd.clicksPct = safePctChange_(pd.curClicks, pd.prevClicks);
    pd.avgPos = pd.posCount > 0 ? pd.posSum / pd.posCount : 0;
  });
  pillarArray.sort((a, b) => Math.abs(b.clicksDelta) - Math.abs(a.clicksDelta));
  
  const pillarHeaders = ["Pillar", "Clicks", "Change", "Status"];
  sheet.getRange(row, 1, 1, 4).setValues([pillarHeaders]);
  sheet.getRange(row, 1, 1, 4).setFontWeight("bold").setBackground("#e8f0fe");
  row++;
  
  const pillarStartRow = row;
  for (const pd of pillarArray) {
    const statusEmoji = pd.clicksDelta > 0 ? "🟢" : pd.clicksDelta < 0 ? "🔴" : "⚪";
    const changeText = formatChange_(pd.clicksDelta, pd.clicksPct);
    
    sheet.getRange(row, 1).setValue(pd.pillar);
    sheet.getRange(row, 2).setValue(pd.curClicks).setNumberFormat("#,##0");
    sheet.getRange(row, 3).setValue(changeText);
    sheet.getRange(row, 4).setValue(statusEmoji);
    
    // Color code the row
    const bgColor = pd.clicksDelta > pd.prevClicks * 0.1 ? "#d9f2e6" : 
                    pd.clicksDelta < -pd.prevClicks * 0.1 ? "#fce8e6" : "#ffffff";
    sheet.getRange(row, 1, 1, 4).setBackground(bgColor);
    
    const changeColor = pd.clicksDelta >= 0 ? "#34A853" : "#EA4335";
    sheet.getRange(row, 3).setFontColor(changeColor).setFontWeight("bold");
    
    row++;
  }
  
  sheet.getRange(pillarStartRow, 1, pillarArray.length, 4).setBorder(
    true, true, true, true, true, true, "#dddddd", SpreadsheetApp.BorderStyle.SOLID
  );
  
  row += 2;
  
  // === TOP WINNERS & LOSERS ===
  sheet.getRange(row, 1).setValue("🏆 Top 5 Winners");
  sheet.getRange(row, 1).setFontSize(14).setFontWeight("bold");
  sheet.getRange(row, 4).setValue("⚠️ Top 5 Decliners");
  sheet.getRange(row, 4).setFontSize(14).setFontWeight("bold");
  row++;
  
  const winners = [...urlData].sort((a, b) => b.clicksDelta - a.clicksDelta).slice(0, 5);
  const losers = [...urlData].sort((a, b) => a.clicksDelta - b.clicksDelta).slice(0, 5);
  
  const winnerHeaders = ["Page", "Clicks", "Change"];
  sheet.getRange(row, 1, 1, 3).setValues([winnerHeaders]);
  sheet.getRange(row, 4, 1, 3).setValues([winnerHeaders]);
  sheet.getRange(row, 1, 1, 3).setFontWeight("bold").setBackground("#d9f2e6");
  sheet.getRange(row, 4, 1, 3).setFontWeight("bold").setBackground("#fce8e6");
  row++;
  
  const winnerStartRow = row;
  for (let i = 0; i < Math.max(winners.length, losers.length); i++) {
    if (i < winners.length) {
      const w = winners[i];
      sheet.getRange(row + i, 1).setValue(w.displayName);
      sheet.getRange(row + i, 2).setValue(w.cur.clicks).setNumberFormat("#,##0");
      sheet.getRange(row + i, 3).setValue(formatChange_(w.clicksDelta, w.clicksPct)).setFontColor("#34A853").setFontWeight("bold");
    }
    
    if (i < losers.length) {
      const l = losers[i];
      sheet.getRange(row + i, 4).setValue(l.displayName);
      sheet.getRange(row + i, 5).setValue(l.cur.clicks).setNumberFormat("#,##0");
      sheet.getRange(row + i, 6).setValue(formatChange_(l.clicksDelta, l.clicksPct)).setFontColor("#EA4335").setFontWeight("bold");
    }
  }
  
  sheet.getRange(winnerStartRow, 1, Math.max(winners.length, losers.length), 3).setBorder(
    true, true, true, true, true, true, "#dddddd", SpreadsheetApp.BorderStyle.SOLID
  );
  sheet.getRange(winnerStartRow, 4, Math.max(winners.length, losers.length), 3).setBorder(
    true, true, true, true, true, true, "#dddddd", SpreadsheetApp.BorderStyle.SOLID
  );
  
  row += Math.max(winners.length, losers.length) + 2;
  
  // === QUICK STATS ===
  const improving = urlData.filter(d => d.status === "🟢").length;
  const declining = urlData.filter(d => d.status === "🔴").length;
  const stable = urlData.filter(d => d.status === "⚪").length;
  const mixed = urlData.filter(d => d.status === "🟡").length;
  
  sheet.getRange(row, 1).setValue("📊 Quick Stats");
  sheet.getRange(row, 1).setFontSize(14).setFontWeight("bold");
  row++;
  
  const stats = [
    ["🟢 Improving Pages", improving, `${(improving / urlData.length * 100).toFixed(0)}%`],
    ["🔴 Declining Pages", declining, `${(declining / urlData.length * 100).toFixed(0)}%`],
    ["🟡 Mixed Performance", mixed, `${(mixed / urlData.length * 100).toFixed(0)}%`],
    ["⚪ Stable Pages", stable, `${(stable / urlData.length * 100).toFixed(0)}%`]
  ];
  
  sheet.getRange(row, 1, stats.length, 3).setValues(stats);
  sheet.getRange(row, 2, stats.length, 1).setNumberFormat("#,##0");
  sheet.getRange(row, 1, stats.length, 3).setBorder(
    true, true, true, true, true, true, "#dddddd", SpreadsheetApp.BorderStyle.SOLID
  );
  
  sheet.setColumnWidth(1, 200);
  sheet.setColumnWidth(2, 120);
  sheet.setColumnWidth(3, 120);
  sheet.setColumnWidth(4, 200);
  sheet.setColumnWidth(5, 120);
  sheet.setColumnWidth(6, 120);
}

// ============================================================================
// PILLAR ANALYSIS TAB
// ============================================================================

function writePillarAnalysis_(ss, pillarData, dateRanges) {
  const sheet = getOrCreateSheet_(ss, "Pillar Analysis");
  sheet.clear();
  
  let row = 1;
  
  // Title
  sheet.getRange(row, 1, 1, 8).merge();
  sheet.getRange(row, 1).setValue("📊 Performance by Content Pillar");
  sheet.getRange(row, 1).setFontSize(18).setFontWeight("bold").setBackground("#4285F4").setFontColor("#ffffff");
  row += 2;
  
  // Period info
  sheet.getRange(row, 1, 1, 8).merge();
  sheet.getRange(row, 1).setValue(
    `Comparing: ${dateRanges.current.start} to ${dateRanges.current.end} vs ${dateRanges.previous.start} to ${dateRanges.previous.end}`
  );
  sheet.getRange(row, 1).setFontSize(10).setFontColor("#666666");
  row += 2;
  
  // Summary table header
  sheet.getRange(row, 1).setValue("📊 Pillar Performance Summary");
  sheet.getRange(row, 1).setFontSize(14).setFontWeight("bold");
  row++;
  
  const summaryHeaders = ["Pillar", "Pages", "Clicks", "Prev Clicks", "Change", "Impressions", "Prev Impr", "Change %"];
  sheet.getRange(row, 1, 1, 8).setValues([summaryHeaders]);
  sheet.getRange(row, 1, 1, 8).setFontWeight("bold").setBackground("#4285F4").setFontColor("#ffffff");
  row++;
  
  const pillarArray = Array.from(pillarData.values());
  pillarArray.forEach(pd => {
    pd.clicksDelta = pd.curClicks - pd.prevClicks;
    pd.clicksPct = safePctChange_(pd.curClicks, pd.prevClicks);
    pd.imprDelta = pd.curImpr - pd.prevImpr;
    pd.imprPct = safePctChange_(pd.curImpr, pd.prevImpr);
    pd.avgPos = pd.posCount > 0 ? pd.posSum / pd.posCount : 0;
    pd.avgCtr = pd.curImpr > 0 ? pd.curClicks / pd.curImpr : 0;
  });
  
  // Sort by current traffic
  pillarArray.sort((a, b) => b.curClicks - a.curClicks);
  
  // Summary table data
  const summaryStartRow = row;
  for (const pd of pillarArray) {
    sheet.getRange(row, 1).setValue(pd.pillar).setFontWeight("bold");
    sheet.getRange(row, 2).setValue(pd.pageCount);
    sheet.getRange(row, 3).setValue(pd.curClicks).setNumberFormat("#,##0");
    sheet.getRange(row, 4).setValue(pd.prevClicks).setNumberFormat("#,##0");
    sheet.getRange(row, 5).setValue(formatChange_(pd.clicksDelta, pd.clicksPct));
    sheet.getRange(row, 6).setValue(pd.curImpr).setNumberFormat("#,##0");
    sheet.getRange(row, 7).setValue(pd.prevImpr).setNumberFormat("#,##0");
    sheet.getRange(row, 8).setValue(pd.imprPct).setNumberFormat("0.0%");
    
    // Color code the row based on performance
    const bgColor = pd.clicksPct > 0.1 ? "#d9f2e6" :     // Green if >10% growth
                    pd.clicksPct < -0.1 ? "#fce8e6" :    // Red if >10% decline
                    "#ffffff";                            // White if stable
    sheet.getRange(row, 1, 1, 8).setBackground(bgColor);
    
    // Color code changes
    const changeColor = pd.clicksDelta >= 0 ? "#34A853" : "#EA4335";
    sheet.getRange(row, 5).setFontColor(changeColor).setFontWeight("bold");
    sheet.getRange(row, 8).setFontColor(changeColor).setFontWeight("bold");
    
    row++;
  }
  
  sheet.getRange(summaryStartRow, 1, pillarArray.length, 8).setBorder(
    true, true, true, true, true, true, "#dddddd", SpreadsheetApp.BorderStyle.SOLID
  );
  
  row += 2;
  
  // Detailed breakdown for each pillar
  for (const pd of pillarArray) {
    // Pillar header with visual indicator
    const statusIndicator = pd.clicksDelta >= 0 ? "📈 Growing" : "📉 Declining";
    sheet.getRange(row, 1, 1, 8).merge();
    sheet.getRange(row, 1).setValue(`${pd.pillar} - ${statusIndicator}`);
    sheet.getRange(row, 1).setFontSize(14).setFontWeight("bold").setBackground("#e8f0fe");
    row++;
    
    // Key metrics cards in a row
    const metricsRow = row;
    
    // Card 1: Clicks
    sheet.getRange(row, 1).setValue("Total Clicks");
    sheet.getRange(row + 1, 1).setValue(pd.curClicks).setNumberFormat("#,##0").setFontSize(16).setFontWeight("bold");
    sheet.getRange(row + 2, 1).setValue(`Previous: ${pd.prevClicks.toLocaleString()}`).setFontSize(9).setFontColor("#666666");
    sheet.getRange(row + 3, 1).setValue(formatChange_(pd.clicksDelta, pd.clicksPct)).setFontColor(pd.clicksDelta >= 0 ? "#34A853" : "#EA4335").setFontWeight("bold");
    sheet.getRange(row, 1, 4, 1).setBackground("#f8f9fa").setBorder(true, true, true, true, false, false, "#dddddd", SpreadsheetApp.BorderStyle.SOLID);
    
    // Card 2: Impressions
    sheet.getRange(row, 2).setValue("Impressions");
    sheet.getRange(row + 1, 2).setValue(pd.curImpr).setNumberFormat("#,##0").setFontSize(16).setFontWeight("bold");
    sheet.getRange(row + 2, 2).setValue(`Previous: ${pd.prevImpr.toLocaleString()}`).setFontSize(9).setFontColor("#666666");
    sheet.getRange(row + 3, 2).setValue(formatChange_(pd.imprDelta, pd.imprPct)).setFontColor(pd.imprDelta >= 0 ? "#34A853" : "#EA4335").setFontWeight("bold");
    sheet.getRange(row, 2, 4, 1).setBackground("#f8f9fa").setBorder(true, true, true, true, false, false, "#dddddd", SpreadsheetApp.BorderStyle.SOLID);
    
    // Card 3: Avg CTR
    sheet.getRange(row, 3).setValue("Avg CTR");
    sheet.getRange(row + 1, 3).setValue(pd.avgCtr).setNumberFormat("0.00%").setFontSize(16).setFontWeight("bold");
    sheet.getRange(row + 2, 3).setValue(`${pd.curClicks} clicks`).setFontSize(9).setFontColor("#666666");
    sheet.getRange(row + 3, 3).setValue(`${pd.curImpr.toLocaleString()} impr`).setFontSize(9).setFontColor("#666666");
    sheet.getRange(row, 3, 4, 1).setBackground("#f8f9fa").setBorder(true, true, true, true, false, false, "#dddddd", SpreadsheetApp.BorderStyle.SOLID);
    
    // Card 4: Avg Position
    sheet.getRange(row, 4).setValue("Avg Position");
    sheet.getRange(row + 1, 4).setValue(pd.avgPos.toFixed(1)).setFontSize(16).setFontWeight("bold");
    const posQuality = pd.avgPos <= 10 ? "Page 1" : pd.avgPos <= 20 ? "Page 2" : "Page 3+";
    sheet.getRange(row + 2, 4).setValue(posQuality).setFontSize(9).setFontColor("#666666");
    sheet.getRange(row + 3, 4).setValue(`${pd.pageCount} pages`).setFontSize(9).setFontColor("#666666");
    sheet.getRange(row, 4, 4, 1).setBackground("#f8f9fa").setBorder(true, true, true, true, false, false, "#dddddd", SpreadsheetApp.BorderStyle.SOLID);
    
    row += 5;
    
    // Performance insight
    let insight = "";
    if (pd.clicksDelta > pd.prevClicks * 0.2) {
      insight = `🎉 Strong growth! ${pd.pillar} gained ${pd.clicksDelta.toLocaleString()} clicks (+${(pd.clicksPct * 100).toFixed(0)}%). Keep up the momentum!`;
    } else if (pd.clicksDelta > 0) {
      insight = `✅ Positive trend. ${pd.pillar} gained ${pd.clicksDelta.toLocaleString()} clicks (+${(pd.clicksPct * 100).toFixed(0)}%). Look for optimization opportunities.`;
    } else if (pd.clicksDelta < -pd.prevClicks * 0.1) {
      insight = `⚠️ Needs attention. ${pd.pillar} lost ${Math.abs(pd.clicksDelta).toLocaleString()} clicks (${(pd.clicksPct * 100).toFixed(0)}%). Review content and rankings.`;
    } else {
      insight = `➡️ Stable performance. ${pd.pillar} is maintaining traffic levels. Consider optimization opportunities.`;
    }
    
    sheet.getRange(row, 1, 1, 4).merge();
    sheet.getRange(row, 1).setValue(insight);
    sheet.getRange(row, 1).setBackground("#fff3cd").setWrap(true).setFontSize(10).setFontStyle("italic");
    row += 2;
    
    // Top performing pages
    sheet.getRange(row, 1, 1, 4).merge();
    sheet.getRange(row, 1).setValue(`📄 Top 10 Pages in ${pd.pillar}`);
    sheet.getRange(row, 1).setFontWeight("bold").setFontSize(11);
    row++;
    
    const topPages = pd.urls.sort((a, b) => b.clicks - a.clicks).slice(0, 10);
    const pageHeaders = ["Page", "Clicks", "Change", "Status"];
    sheet.getRange(row, 1, 1, 4).setValues([pageHeaders]);
    sheet.getRange(row, 1, 1, 4).setFontWeight("bold").setBackground("#f3f3f3");
    row++;
    
    const pageStartRow = row;
    for (const page of topPages) {
      const pageChange = formatChange_(page.clicksDelta, safePctChange_(page.clicks, page.clicks - page.clicksDelta));
      const pageStatus = page.clicksDelta > 0 ? "📈" : page.clicksDelta < 0 ? "📉" : "➡️";
      
      sheet.getRange(row, 1).setValue(page.displayName);
      sheet.getRange(row, 2).setValue(page.clicks).setNumberFormat("#,##0");
      sheet.getRange(row, 3).setValue(pageChange);
      sheet.getRange(row, 4).setValue(pageStatus);
      
      sheet.getRange(row, 3).setFontColor(page.clicksDelta >= 0 ? "#34A853" : "#EA4335");
      
      row++;
    }
    
    sheet.getRange(pageStartRow, 1, topPages.length, 4).setBorder(
      true, true, true, true, true, true, "#dddddd", SpreadsheetApp.BorderStyle.SOLID
    );
    
    row += 2;
  }
  
  sheet.setColumnWidth(1, 300);
  sheet.setColumnWidth(2, 120);
  sheet.setColumnWidth(3, 120);
  sheet.setColumnWidth(4, 120);
  sheet.setColumnWidth(5, 120);
  sheet.setColumnWidth(6, 120);
  sheet.setColumnWidth(7, 120);
  sheet.setColumnWidth(8, 100);
}

// ============================================================================
// PAGE DETAILS TAB (SIMPLIFIED)
// ============================================================================

function writePageDetails_(ss, urlData, dateRanges) {
  const sheet = getOrCreateSheet_(ss, "Page Details");
  sheet.clear();
  
  let row = 1;
  
  // Title
  sheet.getRange(row, 1, 1, 11).merge();
  sheet.getRange(row, 1).setValue("📄 Detailed Page Performance");
  sheet.getRange(row, 1).setFontSize(18).setFontWeight("bold").setBackground("#4285F4").setFontColor("#ffffff");
  row += 2;
  
  // Period info
  sheet.getRange(row, 1, 1, 11).merge();
  sheet.getRange(row, 1).setValue(
    `Current: ${dateRanges.current.start} to ${dateRanges.current.end} | Previous: ${dateRanges.previous.start} to ${dateRanges.previous.end}`
  );
  sheet.getRange(row, 1).setFontSize(10).setFontColor("#666666");
  row += 2;
  
  // Headers
  const headers = [
    "Page",
    "Pillar",
    "Status",
    "Clicks",
    "Δ Clicks",
    "Impressions",
    "Δ Impr",
    "CTR",
    "Position",
    "Δ Pos",
    "Trend"
  ];
  
  sheet.getRange(row, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(row, 1, 1, headers.length)
    .setFontWeight("bold")
    .setBackground("#4285F4")
    .setFontColor("#ffffff")
    .setWrap(true)
    .setVerticalAlignment("middle");
  
  sheet.setFrozenRows(row);
  row++;
  
  // Data rows
  const dataStartRow = row;
  urlData.sort((a, b) => b.cur.clicks - a.cur.clicks);
  
  for (const d of urlData) {
    const trendEmoji = d.clicksPct > 0.1 ? "📈" : d.clicksPct < -0.1 ? "📉" : "➡️";
    
    sheet.getRange(row, 1).setValue(d.displayName);
    sheet.getRange(row, 2).setValue(d.pillar);
    sheet.getRange(row, 3).setValue(d.status);
    sheet.getRange(row, 4).setValue(d.cur.clicks);
    sheet.getRange(row, 5).setValue(formatChange_(d.clicksDelta, d.clicksPct));
    sheet.getRange(row, 6).setValue(d.cur.impressions);
    sheet.getRange(row, 7).setValue(formatChange_(d.imprDelta, d.imprPct));
    sheet.getRange(row, 8).setValue(d.cur.ctr);
    sheet.getRange(row, 9).setValue(d.cur.position);
    sheet.getRange(row, 10).setValue(d.posDelta.toFixed(1));
    sheet.getRange(row, 11).setValue(trendEmoji);
    
    // Color coding
    const bgColor = d.status === "🟢" ? "#d9f2e6" : 
                    d.status === "🔴" ? "#fce8e6" : 
                    d.status === "🟡" ? "#fef7e0" : "#ffffff";
    sheet.getRange(row, 1, 1, headers.length).setBackground(bgColor);
    
    sheet.getRange(row, 5).setFontColor(d.clicksDelta >= 0 ? "#34A853" : "#EA4335").setFontWeight("bold");
    sheet.getRange(row, 7).setFontColor(d.imprDelta >= 0 ? "#34A853" : "#EA4335").setFontWeight("bold");
    sheet.getRange(row, 10).setFontColor(d.posDelta <= 0 ? "#34A853" : "#EA4335").setFontWeight("bold");
    
    row++;
  }
  
  // Formatting
  sheet.getRange(dataStartRow, 4, urlData.length, 1).setNumberFormat("#,##0");
  sheet.getRange(dataStartRow, 6, urlData.length, 1).setNumberFormat("#,##0");
  sheet.getRange(dataStartRow, 8, urlData.length, 1).setNumberFormat("0.00%");
  sheet.getRange(dataStartRow, 9, urlData.length, 1).setNumberFormat("0.0");
  sheet.getRange(dataStartRow, 10, urlData.length, 1).setNumberFormat("0.0");
  
  // Add data bars for clicks
  addDataBars_(sheet, dataStartRow, 4, urlData.length, 1, "#4285F4");
  
  // Borders
  sheet.getRange(dataStartRow, 1, urlData.length, headers.length).setBorder(
    true, true, true, true, true, true, "#dddddd", SpreadsheetApp.BorderStyle.SOLID
  );
  
  // Column widths
  sheet.setColumnWidth(1, 250);
  sheet.setColumnWidth(2, 150);
  sheet.setColumnWidth(3, 60);
  sheet.setColumnWidth(4, 80);
  sheet.setColumnWidth(5, 120);
  sheet.setColumnWidth(6, 100);
  sheet.setColumnWidth(7, 120);
  sheet.setColumnWidth(8, 70);
  sheet.setColumnWidth(9, 80);
  sheet.setColumnWidth(10, 80);
  sheet.setColumnWidth(11, 60);
}

// ============================================================================
// CHARTS TAB
// ============================================================================

function writeCharts_(ss, urlData, pillarData) {
  const sheet = getOrCreateSheet_(ss, "Charts");
  sheet.clear();
  
  // Clear existing charts
  sheet.getCharts().forEach(chart => sheet.removeChart(chart));
  
  let row = 1;
  
  // Title
  sheet.getRange(row, 1).setValue("📊 Visual Performance Analysis");
  sheet.getRange(row, 1).setFontSize(18).setFontWeight("bold");
  row += 2;
  
  // === CHART 1: Pillar Performance (Horizontal Bar) ===
  sheet.getRange(row, 1).setValue("Clicks by Pillar - Current vs Previous");
  sheet.getRange(row, 1).setFontSize(12).setFontWeight("bold");
  row++;
  
  const pillarArray = Array.from(pillarData.values());
  pillarArray.sort((a, b) => b.curClicks - a.curClicks);
  
  const pillarChartData = [["Pillar", "Current", "Previous"]];
  for (const pd of pillarArray) {
    pillarChartData.push([pd.pillar, pd.curClicks, pd.prevClicks]);
  }
  
  const pillarDataRange = sheet.getRange(row, 1, pillarChartData.length, 3);
  pillarDataRange.setValues(pillarChartData);
  
  const pillarChart = sheet.newChart()
    .setChartType(Charts.ChartType.BAR)
    .addRange(pillarDataRange)
    .setPosition(row + pillarChartData.length + 1, 1, 0, 0)
    .setOption('title', 'Clicks by Pillar')
    .setOption('height', 400)
    .setOption('width', 600)
    .setOption('legend', { position: 'top' })
    .setOption('colors', ['#34A853', '#FBBC04'])
    .build();
  sheet.insertChart(pillarChart);
  
  row += pillarChartData.length + 20;
  
  // === CHART 2: Top Movers ===
  sheet.getRange(row, 1).setValue("Top 10 Movers (by Click Change)");
  sheet.getRange(row, 1).setFontSize(12).setFontWeight("bold");
  row++;
  
  const movers = [...urlData].sort((a, b) => Math.abs(b.clicksDelta) - Math.abs(a.clicksDelta)).slice(0, 10);
  const moverChartData = [["Page", "Change"]];
  for (const m of movers) {
    moverChartData.push([m.displayName, m.clicksDelta]);
  }
  
  const moverDataRange = sheet.getRange(row, 1, moverChartData.length, 2);
  moverDataRange.setValues(moverChartData);
  
  const moverChart = sheet.newChart()
    .setChartType(Charts.ChartType.BAR)
    .addRange(moverDataRange)
    .setPosition(row + moverChartData.length + 1, 1, 0, 0)
    .setOption('title', 'Top 10 Pages by Absolute Click Change')
    .setOption('height', 400)
    .setOption('width', 600)
    .setOption('legend', { position: 'none' })
    .build();
  sheet.insertChart(moverChart);
  
  row += moverChartData.length + 20;
  
  // === CHART 3: CTR vs Position Scatter ===
  sheet.getRange(row, 1).setValue("CTR vs Position (Current Period)");
  sheet.getRange(row, 1).setFontSize(12).setFontWeight("bold");
  row++;
  
  const scatterData = [["Position", "CTR", "Page"]];
  for (const d of urlData) {
    if (d.cur.position > 0 && d.cur.ctr > 0) {
      scatterData.push([d.cur.position, d.cur.ctr, d.displayName]);
    }
  }
  
  const scatterDataRange = sheet.getRange(row, 1, scatterData.length, 3);
  scatterDataRange.setValues(scatterData);
  
  const scatterChart = sheet.newChart()
    .setChartType(Charts.ChartType.SCATTER)
    .addRange(scatterDataRange)
    .setPosition(row + Math.min(scatterData.length, 20) + 1, 1, 0, 0)
    .setOption('title', 'CTR vs Position Analysis')
    .setOption('height', 400)
    .setOption('width', 600)
    .setOption('hAxis', { title: 'Position' })
    .setOption('vAxis', { title: 'CTR' })
    .build();
  sheet.insertChart(scatterChart);
  
  sheet.setColumnWidth(1, 250);
  sheet.setColumnWidth(2, 120);
  sheet.setColumnWidth(3, 120);
}

// ============================================================================
// ACTION ITEMS TAB
// ============================================================================

function writeActionItems_(ss, urlData, dateRanges) {
  const sheet = getOrCreateSheet_(ss, "Action Items");
  sheet.clear();
  
  let row = 1;
  
  // Title
  sheet.getRange(row, 1, 1, 6).merge();
  sheet.getRange(row, 1).setValue("🎯 Recommended Actions");
  sheet.getRange(row, 1).setFontSize(18).setFontWeight("bold").setBackground("#4285F4").setFontColor("#ffffff");
  row += 2;
  
  // === URGENT: Large Declines ===
  const urgent = urlData.filter(d => d.clicksPct < -0.2 && d.prev.clicks > 50);
  if (urgent.length > 0) {
    sheet.getRange(row, 1).setValue("🚨 URGENT - Large Traffic Declines (>20%)");
    sheet.getRange(row, 1).setFontSize(14).setFontWeight("bold").setBackground("#fce8e6");
    row++;
    
    sheet.getRange(row, 1, 1, 6).merge();
    sheet.getRange(row, 1).setValue("These pages have lost significant traffic. Investigate immediately for ranking drops, technical issues, or content problems.");
    sheet.getRange(row, 1).setFontSize(10).setFontColor("#666666").setWrap(true);
    row++;
    
    const urgentHeaders = ["Page", "Pillar", "Lost Clicks", "% Change", "Prev Position", "Action Needed"];
    sheet.getRange(row, 1, 1, 6).setValues([urgentHeaders]);
    sheet.getRange(row, 1, 1, 6).setFontWeight("bold").setBackground("#f3f3f3");
    row++;
    
    for (const d of urgent.sort((a, b) => a.clicksDelta - b.clicksDelta).slice(0, 15)) {
      setPageCell_(sheet, row, 1, d);
      sheet.getRange(row, 2).setValue(d.pillar);
      sheet.getRange(row, 3).setValue(d.clicksDelta).setNumberFormat("#,##0").setFontColor("#EA4335");
      sheet.getRange(row, 4).setValue(d.clicksPct).setNumberFormat("0.0%").setFontColor("#EA4335");
      sheet.getRange(row, 5).setValue(d.prev.position > 0 ? d.prev.position.toFixed(1) : "N/A");
      
      // Detailed action based on signals
      let action = "";
      if (d.posDelta > 5) {
        action = `Position dropped ${d.posDelta.toFixed(0)} spots - Check for algorithm changes or competitor content`;
      } else if (d.imprPct < -0.2) {
        action = "Impressions also down - May have lost rankings for key terms";
      } else if (d.ctrDelta < -0.01) {
        action = "CTR declined significantly - Update title/meta description";
      } else {
        action = "Review for content freshness, broken links, or technical issues";
      }
      
      sheet.getRange(row, 6).setValue(action).setWrap(true);
      row++;
    }
    row++;
  }
  
  // === WATCH: Moderate Declines ===
  const watch = urlData.filter(d => d.clicksPct >= -0.2 && d.clicksPct < -0.1 && d.prev.clicks > 30);
  if (watch.length > 0) {
    sheet.getRange(row, 1).setValue("⚠️ WATCH - Moderate Declines (10-20%)");
    sheet.getRange(row, 1).setFontSize(14).setFontWeight("bold").setBackground("#fef7e0");
    row++;
    
    sheet.getRange(row, 1, 1, 6).merge();
    sheet.getRange(row, 1).setValue("Monitor these pages closely. Small declines can become larger if not addressed.");
    sheet.getRange(row, 1).setFontSize(10).setFontColor("#666666").setWrap(true);
    row++;
    
    const watchHeaders = ["Page", "Pillar", "Lost Clicks", "% Change", "Current Position", "Action Needed"];
    sheet.getRange(row, 1, 1, 6).setValues([watchHeaders]);
    sheet.getRange(row, 1, 1, 6).setFontWeight("bold").setBackground("#f3f3f3");
    row++;
    
    for (const d of watch.sort((a, b) => a.clicksDelta - b.clicksDelta).slice(0, 15)) {
      setPageCell_(sheet, row, 1, d);
      sheet.getRange(row, 2).setValue(d.pillar);
      sheet.getRange(row, 3).setValue(d.clicksDelta).setNumberFormat("#,##0");
      sheet.getRange(row, 4).setValue(d.clicksPct).setNumberFormat("0.0%");
      sheet.getRange(row, 5).setValue(d.cur.position > 0 ? d.cur.position.toFixed(1) : "N/A");
      sheet.getRange(row, 6).setValue("Review content freshness, update publish date, add recent examples").setWrap(true);
      row++;
    }
    row++;
  }
  
  // === OPTIMIZE: High Impressions, Low CTR ===
  const optimize = urlData.filter(d => d.cur.impressions > 500 && d.cur.ctr < 0.025);
  if (optimize.length > 0) {
    sheet.getRange(row, 1).setValue("🎯 OPTIMIZE - High Visibility, Low CTR (<2.5%)");
    sheet.getRange(row, 1).setFontSize(14).setFontWeight("bold").setBackground("#e8f0fe");
    row++;
    
    sheet.getRange(row, 1, 1, 6).merge();
    sheet.getRange(row, 1).setValue("These pages rank well but have poor click-through rates. Optimizing titles and descriptions can yield quick wins.");
    sheet.getRange(row, 1).setFontSize(10).setFontColor("#666666").setWrap(true);
    row++;
    
    const optHeaders = ["Page", "Pillar", "Impressions", "CTR", "Position", "Optimization Opportunity"];
    sheet.getRange(row, 1, 1, 6).setValues([optHeaders]);
    sheet.getRange(row, 1, 1, 6).setFontWeight("bold").setBackground("#f3f3f3");
    row++;
    
    for (const d of optimize.sort((a, b) => b.cur.impressions - a.cur.impressions).slice(0, 15)) {
      setPageCell_(sheet, row, 1, d);
      sheet.getRange(row, 2).setValue(d.pillar);
      sheet.getRange(row, 3).setValue(d.cur.impressions).setNumberFormat("#,##0");
      sheet.getRange(row, 4).setValue(d.cur.ctr).setNumberFormat("0.00%");
      sheet.getRange(row, 5).setValue(d.cur.position > 0 ? d.cur.position.toFixed(1) : "N/A");
      
      // Calculate potential clicks if CTR improves to 3%
      const potentialClicks = Math.round(d.cur.impressions * 0.03) - d.cur.clicks;
      sheet.getRange(row, 6).setValue(`Could gain ${potentialClicks} clicks with better CTR - Improve title tag and meta description`).setWrap(true);
      row++;
    }
    row++;
  }
  
  // === CAPITALIZE: Strong Growth ===
  const capitalize = urlData.filter(d => d.clicksPct > 0.2 && d.cur.clicks > 50);
  if (capitalize.length > 0) {
    sheet.getRange(row, 1).setValue("🚀 CAPITALIZE - Strong Growth (>20%)");
    sheet.getRange(row, 1).setFontSize(14).setFontWeight("bold").setBackground("#d9f2e6");
    row++;
    
    sheet.getRange(row, 1, 1, 6).merge();
    sheet.getRange(row, 1).setValue("These pages are performing exceptionally well. Double down on what's working!");
    sheet.getRange(row, 1).setFontSize(10).setFontColor("#666666").setWrap(true);
    row++;
    
    const capHeaders = ["Page", "Pillar", "Gained Clicks", "% Change", "Current Clicks", "How to Capitalize"];
    sheet.getRange(row, 1, 1, 6).setValues([capHeaders]);
    sheet.getRange(row, 1, 1, 6).setFontWeight("bold").setBackground("#f3f3f3");
    row++;
    
    for (const d of capitalize.sort((a, b) => b.clicksDelta - a.clicksDelta).slice(0, 15)) {
      setPageCell_(sheet, row, 1, d);
      sheet.getRange(row, 2).setValue(d.pillar);
      sheet.getRange(row, 3).setValue(d.clicksDelta).setNumberFormat("#,##0").setFontColor("#34A853");
      sheet.getRange(row, 4).setValue(d.clicksPct).setNumberFormat("0.0%").setFontColor("#34A853");
      sheet.getRange(row, 5).setValue(d.cur.clicks).setNumberFormat("#,##0");
      sheet.getRange(row, 6).setValue("Create related content, add internal links from this page, update with more depth").setWrap(true);
      row++;
    }
    row++;
  }
  
  // === POSITION IMPROVEMENTS ===
  const posWins = urlData.filter(d => d.posDelta < -3 && d.prev.position > 10);
  if (posWins.length > 0) {
    sheet.getRange(row, 1).setValue("📍 POSITION IMPROVEMENTS - Moved Up 3+ Spots");
    sheet.getRange(row, 1).setFontSize(14).setFontWeight("bold").setBackground("#d9f2e6");
    row++;
    
    sheet.getRange(row, 1, 1, 6).merge();
    sheet.getRange(row, 1).setValue("These pages improved their rankings significantly. Analyze what worked and replicate it.");
    sheet.getRange(row, 1).setFontSize(10).setFontColor("#666666").setWrap(true);
    row++;
    
    const posHeaders = ["Page", "Pillar", "Old Position", "New Position", "Improvement", "Next Steps"];
    sheet.getRange(row, 1, 1, 6).setValues([posHeaders]);
    sheet.getRange(row, 1, 1, 6).setFontWeight("bold").setBackground("#f3f3f3");
    row++;
    
    for (const d of posWins.sort((a, b) => a.posDelta - b.posDelta).slice(0, 15)) {
      setPageCell_(sheet, row, 1, d);
      sheet.getRange(row, 2).setValue(d.pillar);
      sheet.getRange(row, 3).setValue(d.prev.position.toFixed(1)).setNumberFormat("0.0");
      sheet.getRange(row, 4).setValue(d.cur.position.toFixed(1)).setNumberFormat("0.0").setFontColor("#34A853");
      sheet.getRange(row, 5).setValue(`↗ ${Math.abs(d.posDelta).toFixed(1)} spots`).setFontColor("#34A853").setFontWeight("bold");
      
      let nextStep = "";
      if (d.cur.position <= 3) {
        nextStep = "Nearly #1! Add featured snippet content to capture position zero";
      } else if (d.cur.position <= 10) {
        nextStep = "On page 1 - Maintain with regular updates and fresh examples";
      } else {
        nextStep = "Keep improving - Review top 10 results and enhance content depth";
      }
      
      sheet.getRange(row, 6).setValue(nextStep).setWrap(true);
      row++;
    }
    row++;
  }
  
  // === LOW HANGING FRUIT: Page 2 Rankings ===
  const page2 = urlData.filter(d => d.cur.position > 10 && d.cur.position <= 20 && d.cur.impressions > 200);
  if (page2.length > 0) {
    sheet.getRange(row, 1).setValue("🍇 LOW HANGING FRUIT - Page 2 Rankings (Positions 11-20)");
    sheet.getRange(row, 1).setFontSize(14).setFontWeight("bold").setBackground("#e8f0fe");
    row++;
    
    sheet.getRange(row, 1, 1, 6).merge();
    sheet.getRange(row, 1).setValue("These pages are close to page 1! Small improvements can dramatically increase traffic.");
    sheet.getRange(row, 1).setFontSize(10).setFontColor("#666666").setWrap(true);
    row++;
    
    const page2Headers = ["Page", "Pillar", "Position", "Impressions", "Current Clicks", "Push to Page 1"];
    sheet.getRange(row, 1, 1, 6).setValues([page2Headers]);
    sheet.getRange(row, 1, 1, 6).setFontWeight("bold").setBackground("#f3f3f3");
    row++;
    
    for (const d of page2.sort((a, b) => a.cur.position - b.cur.position).slice(0, 15)) {
      setPageCell_(sheet, row, 1, d);
      sheet.getRange(row, 2).setValue(d.pillar);
      sheet.getRange(row, 3).setValue(d.cur.position.toFixed(1));
      sheet.getRange(row, 4).setValue(d.cur.impressions).setNumberFormat("#,##0");
      sheet.getRange(row, 5).setValue(d.cur.clicks).setNumberFormat("#,##0");
      sheet.getRange(row, 6).setValue("Add depth, update content, improve internal linking, target featured snippets").setWrap(true);
      row++;
    }
    row++;
  }
  
  sheet.setColumnWidth(1, 250);
  sheet.setColumnWidth(2, 150);
  sheet.setColumnWidth(3, 100);
  sheet.setColumnWidth(4, 100);
  sheet.setColumnWidth(5, 120);
  sheet.setColumnWidth(6, 350);
}

// ============================================================================
// DEPRECATED TAB
// ============================================================================

function writeDeprecated_(ss, deprecatedData, dateRanges) {
  const sheet = getOrCreateSheet_(ss, "Deprecated");
  sheet.clear();
  
  let row = 1;
  
  // Title
  sheet.getRange(row, 1, 1, 6).merge();
  sheet.getRange(row, 1).setValue("🗑️ Deprecated URLs (Removed from Tracking)");
  sheet.getRange(row, 1).setFontSize(18).setFontWeight("bold").setBackground("#EA4335").setFontColor("#ffffff");
  row += 2;
  
  // Explanation
  sheet.getRange(row, 1, 1, 6).merge();
  sheet.getRange(row, 1).setValue(
    `These URLs appeared in the previous period (${dateRanges.previous.start} to ${dateRanges.previous.end}) ` +
    `but NOT in the current period (${dateRanges.current.start} to ${dateRanges.current.end}). ` +
    `They may have been removed, redirected, or deleted.`
  );
  sheet.getRange(row, 1).setFontSize(10).setFontColor("#666666").setWrap(true);
  row += 3;
  
  if (deprecatedData.length === 0) {
    sheet.getRange(row, 1).setValue("✅ No deprecated URLs found - all previous URLs are still being tracked!");
    sheet.getRange(row, 1).setFontSize(12).setFontColor("#34A853");
    sheet.setColumnWidth(1, 600);
    return;
  }
  
  // Summary stats
  const totalLostClicks = deprecatedData.reduce((sum, d) => sum + d.prevClicks, 0);
  const totalLostImpr = deprecatedData.reduce((sum, d) => sum + d.prevImpr, 0);
  
  sheet.getRange(row, 1).setValue("📊 Impact Summary");
  sheet.getRange(row, 1).setFontSize(14).setFontWeight("bold");
  row++;
  
  const summary = [
    ["Deprecated URLs", deprecatedData.length],
    ["Lost Clicks (from previous period)", totalLostClicks],
    ["Lost Impressions (from previous period)", totalLostImpr]
  ];
  
  sheet.getRange(row, 1, summary.length, 2).setValues(summary);
  sheet.getRange(row, 1, summary.length, 1).setFontWeight("bold");
  sheet.getRange(row, 2, summary.length, 1).setNumberFormat("#,##0");
  sheet.getRange(row, 1, summary.length, 2).setBackground("#fce8e6").setBorder(
    true, true, true, true, true, true, "#dddddd", SpreadsheetApp.BorderStyle.SOLID
  );
  row += summary.length + 2;
  
  // Headers
  sheet.getRange(row, 1).setValue("⚠️ Deprecated URLs List");
  sheet.getRange(row, 1).setFontSize(14).setFontWeight("bold");
  row++;
  
  const headers = ["URL", "Display Name", "Pillar", "Prev Clicks", "Prev Impressions", "Prev CTR", "Prev Position"];
  sheet.getRange(row, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(row, 1, 1, headers.length)
    .setFontWeight("bold")
    .setBackground("#EA4335")
    .setFontColor("#ffffff")
    .setWrap(true);
  
  sheet.setFrozenRows(row);
  row++;
  
  // Sort by previous clicks (highest impact first)
  deprecatedData.sort((a, b) => b.prevClicks - a.prevClicks);
  
  // Data rows
  const dataStartRow = row;
  for (const d of deprecatedData) {
    sheet.getRange(row, 1).setValue(d.url);
    sheet.getRange(row, 2).setValue(d.displayName);
    sheet.getRange(row, 3).setValue(d.pillar);
    sheet.getRange(row, 4).setValue(d.prevClicks);
    sheet.getRange(row, 5).setValue(d.prevImpr);
    sheet.getRange(row, 6).setValue(d.prevCtr);
    sheet.getRange(row, 7).setValue(d.prevPos);
    
    // Alternate row colors for readability
    if (row % 2 === 0) {
      sheet.getRange(row, 1, 1, headers.length).setBackground("#f8f9fa");
    }
    
    row++;
  }
  
  // Formatting
  sheet.getRange(dataStartRow, 4, deprecatedData.length, 1).setNumberFormat("#,##0");
  sheet.getRange(dataStartRow, 5, deprecatedData.length, 1).setNumberFormat("#,##0");
  sheet.getRange(dataStartRow, 6, deprecatedData.length, 1).setNumberFormat("0.00%");
  sheet.getRange(dataStartRow, 7, deprecatedData.length, 1).setNumberFormat("0.0");
  
  // Borders
  sheet.getRange(dataStartRow, 1, deprecatedData.length, headers.length).setBorder(
    true, true, true, true, true, true, "#dddddd", SpreadsheetApp.BorderStyle.SOLID
  );
  
  // Column widths
  sheet.setColumnWidth(1, 350);
  sheet.setColumnWidth(2, 200);
  sheet.setColumnWidth(3, 150);
  sheet.setColumnWidth(4, 100);
  sheet.setColumnWidth(5, 120);
  sheet.setColumnWidth(6, 80);
  sheet.setColumnWidth(7, 100);
  
  row += 2;
  
  // Recommendations
  sheet.getRange(row, 1).setValue("💡 Recommended Actions");
  sheet.getRange(row, 1).setFontSize(14).setFontWeight("bold");
  row++;
  
  const recommendations = [
    ["1.", "Check if these URLs were intentionally removed or redirected"],
    ["2.", "Set up 301 redirects if the content moved to new URLs"],
    ["3.", "If removed intentionally, verify no broken links point to these URLs"],
    ["4.", "Review if any high-traffic URLs were removed by mistake"],
    ["5.", "Update internal links and sitemaps to remove references"]
  ];
  
  sheet.getRange(row, 1, recommendations.length, 2).setValues(recommendations);
  sheet.getRange(row, 1, recommendations.length, 1).setFontWeight("bold");
  sheet.getRange(row, 1, recommendations.length, 2).setBackground("#fff3cd").setBorder(
    true, true, true, true, true, true, "#dddddd", SpreadsheetApp.BorderStyle.SOLID
  );
}

// ============================================================================
// ABOUT TAB
// ============================================================================

function writeAbout_(ss, dateRanges) {
  const sheet = getOrCreateSheet_(ss, "About");
  sheet.clear();
  
  let row = 1;
  
  // Title
  sheet.getRange(row, 1, 1, 3).merge();
  sheet.getRange(row, 1).setValue("ℹ️ About This Report");
  sheet.getRange(row, 1).setFontSize(18).setFontWeight("bold").setBackground("#4285F4").setFontColor("#ffffff");
  row += 2;
  
  // Period info
  sheet.getRange(row, 1).setValue("📅 Time Periods");
  sheet.getRange(row, 1).setFontSize(14).setFontWeight("bold");
  row++;
  
  const periods = [
    ["Recent Period:", `${dateRanges.current.start} to ${dateRanges.current.end}`],
    ["Previous Period:", `${dateRanges.previous.start} to ${dateRanges.previous.end}`]
  ];
  sheet.getRange(row, 1, periods.length, 2).setValues(periods);
  sheet.getRange(row, 1, periods.length, 1).setFontWeight("bold");
  row += periods.length + 2;
  
  // Metric definitions
  sheet.getRange(row, 1).setValue("�� Metric Definitions");
  sheet.getRange(row, 1).setFontSize(14).setFontWeight("bold");
  row++;
  
  const metrics = [
    ["Clicks", "Number of times users clicked your link in search results"],
    ["Impressions", "Number of times your link appeared in search results"],
    ["CTR", "Click-Through Rate = Clicks ÷ Impressions (higher is better)"],
    ["Position", "Average ranking position in search results (lower is better)"],
    ["Pillar", "Content area grouping (first path segment after well-architected-framework)"]
  ];
  
  sheet.getRange(row, 1, metrics.length, 2).setValues(metrics);
  sheet.getRange(row, 1, metrics.length, 1).setFontWeight("bold");
  sheet.getRange(row, 1, metrics.length, 2).setBorder(
    true, true, true, true, true, true, "#dddddd", SpreadsheetApp.BorderStyle.SOLID
  );
  row += metrics.length + 2;
  
  // Status indicators
  sheet.getRange(row, 1).setValue("🚦 Status Indicators");
  sheet.getRange(row, 1).setFontSize(14).setFontWeight("bold");
  row++;
  
  const statuses = [
    ["🟢", "Improving - Clicks and impressions both increasing"],
    ["🔴", "Declining - Clicks or impressions decreasing significantly"],
    ["🟡", "Mixed - Some metrics up, some down"],
    ["⚪", "Stable - Little to no change"]
  ];
  
  sheet.getRange(row, 1, statuses.length, 2).setValues(statuses);
  sheet.getRange(row, 1, statuses.length, 2).setBorder(
    true, true, true, true, true, true, "#dddddd", SpreadsheetApp.BorderStyle.SOLID
  );
  row += statuses.length + 2;
  
  // How to use
  sheet.getRange(row, 1).setValue("📖 How to Use This Report");
  sheet.getRange(row, 1).setFontSize(14).setFontWeight("bold");
  row++;
  
  const howTo = [
    ["1.", "Start with Executive Summary for high-level overview"],
    ["2.", "Review Pillar Analysis to understand performance by content area"],
    ["3.", "Check Action Items for specific recommendations"],
    ["4.", "Drill into Page Details for individual page analysis"],
    ["5.", "Use Charts for visual trends and comparisons"]
  ];
  
  sheet.getRange(row, 1, howTo.length, 2).setValues(howTo);
  sheet.getRange(row, 1, howTo.length, 1).setFontWeight("bold");
  row += howTo.length + 2;
  
  // Tips
  sheet.getRange(row, 1).setValue("💡 Tips");
  sheet.getRange(row, 1).setFontSize(14).setFontWeight("bold");
  row++;
  
  const tips = [
    ["•", "Green backgrounds = good news, red backgrounds = needs attention"],
    ["•", "Focus on pages with high impressions but low CTR for quick wins"],
    ["•", "Position improvements (moving up) are shown as negative deltas"],
    ["•", "Use filters in Page Details to focus on specific pillars"]
  ];
  
  sheet.getRange(row, 1, tips.length, 2).setValues(tips);
  sheet.getRange(row, 1, tips.length, 2).setBackground("#fff3cd");
  
  sheet.setColumnWidth(1, 150);
  sheet.setColumnWidth(2, 500);
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function getPillarFromUrl_(url) {
  // Extract pillar (first segment after well-architected-framework)
  // Returns friendly pillar name, or null for deprecated pillars
  try {
    // Extract pathname from URL (everything after domain)
    // Example: https://developer.hashicorp.com/well-architected-framework/secure-systems/...
    // We want: /well-architected-framework/secure-systems/...
    let pathname = url;
    if (url.includes("://")) {
      // Remove protocol and domain
      pathname = "/" + url.split("://")[1].split("/").slice(1).join("/");
    }
    
    const parts = pathname.split("/").filter(Boolean);
    
    if (parts.length >= 2 && parts[0] === "well-architected-framework") {
      const pillarSlug = parts[1];
      
      // DEPRECATED PILLARS - Return null to exclude from tracking
      const deprecatedPillars = ["operational-excellence", "security", "reliability"];
      if (deprecatedPillars.includes(pillarSlug)) {
        return null; // Signal to skip this URL
      }
      
      // Map URL slugs to friendly names (only track these 5)
      const pillarNames = {
        "define-and-automate-processes": "Define and Automate Processes",
        "secure-systems": "Secure Systems",
        "optimize-systems": "Optimize Systems",
        "design-resilient-systems": "Design Resilient Systems",
        "implementation-resources": "IR"
      };
      
      return pillarNames[pillarSlug] || "Other";
    }
    return "Other";
  } catch (e) {
    Logger.log(`Error parsing URL: ${url}, Error: ${e}`);
    return "Other";
  }
}

function getStatus_(cur, prev, clicksPct, imprPct, ctrDelta, posDelta) {
  // Determine overall status emoji
  if (clicksPct > 0.1 && imprPct > 0) return "🟢"; // Strong growth
  if (clicksPct < -0.1 || imprPct < -0.1) return "🔴"; // Declining
  if ((clicksPct > 0 && imprPct < 0) || (clicksPct < 0 && imprPct > 0)) return "🟡"; // Mixed
  return "⚪"; // Stable
}

function formatChange_(delta, pct) {
  const arrow = delta >= 0 ? "↗" : "↘";
  const sign = delta >= 0 ? "+" : "";
  return `${arrow} ${sign}${(pct * 100).toFixed(0)}%`;
}

function setPageCell_(sheet, row, column, data) {
  const safeLabel = String(data.displayName).replace(/"/g, '""');
  const safeUrl = String(data.url).replace(/"/g, '""');
  sheet.getRange(row, column).setFormula(`=HYPERLINK("${safeUrl}","${safeLabel}")`);
}

function calculateWeightedAvgPosition_(dataArray) {
  let totalPosImpr = 0;
  let totalImpr = 0;
  for (const d of dataArray) {
    if (d.position > 0 && d.impressions > 0) {
      totalPosImpr += d.position * d.impressions;
      totalImpr += d.impressions;
    }
  }
  return totalImpr > 0 ? totalPosImpr / totalImpr : 0;
}

function safePctChange_(current, previous) {
  if (previous === 0) return current > 0 ? 1 : 0;
  return (current - previous) / previous;
}

function normalizeUrl_(url) {
  const trimmed = String(url).trim();
  if (!trimmed) return "";
  try {
    const normalized = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
    const u = new URL(normalized);
    const collapsedPath = u.pathname.replace(/\/{2,}/g, "/").replace(/\/+$/, "") || "/";
    return `${u.protocol}//${u.hostname.toLowerCase()}${collapsedPath}`;
  } catch (e) {
    return trimmed.replace(/\/{2,}/g, "/").replace(/\/+$/, "");
  }
}

function extractUrlLabel_(url) {
  // Generate short name from URL
  try {
    const normalized = /^https?:\/\//i.test(url) ? url : `https://${url}`;
    const u = new URL(normalized);
    const parts = u.pathname.split("/").filter(Boolean);
    if (parts.length > 0) {
      const lastPart = parts[parts.length - 1];
      return lastPart.replace(/[-_]/g, " ").replace(/\b\w/g, l => l.toUpperCase());
    }
    return u.hostname;
  } catch (e) {
    const match = String(url).match(/\/([^/?#]+)\/?$/);
    if (match) {
      return match[1].replace(/[-_]/g, " ").replace(/\b\w/g, l => l.toUpperCase());
    }
    return url;
  }
}

function getOrCreateSheet_(ss, name) {
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
  }
  return sheet;
}

function addDataBars_(sheet, startRow, startCol, numRows, numCols, color = "#4285f4") {
  // Add data bar conditional formatting
  const range = sheet.getRange(startRow, startCol, numRows, numCols);
  const rule = SpreadsheetApp.newConditionalFormatRule()
    .setGradientMaxpoint(color)
    .setGradientMinpoint("#ffffff")
    .setRanges([range])
    .build();
  const rules = sheet.getConditionalFormatRules();
  rules.push(rule);
  sheet.setConditionalFormatRules(rules);
}

function reorderTabs_(ss) {
  // Reorder tabs: Report tabs first, GSC data sheets at end (before Deprecated)
  const desiredOrder = [
    "Executive Summary",
    "Pillar Analysis",
    "Page Details",
    "Charts",
    "Action Items",
    "About",
    "GSC Recent 3mo",
    "GSC Previous 3mo",
    "Deprecated"
  ];
  
  const sheets = ss.getSheets();
  const sheetMap = new Map();
  
  // Build map of sheet names to sheets
  for (const sheet of sheets) {
    sheetMap.set(sheet.getName(), sheet);
  }
  
  // Reorder sheets according to desired order
  for (let i = 0; i < desiredOrder.length; i++) {
    const sheetName = desiredOrder[i];
    const sheet = sheetMap.get(sheetName);
    if (sheet) {
      ss.setActiveSheet(sheet);
      ss.moveActiveSheet(i + 1); // Sheets are 1-indexed
    }
  }
  
  // Set Executive Summary as active sheet
  const execSummary = ss.getSheetByName("Executive Summary");
  if (execSummary) {
    ss.setActiveSheet(execSummary);
  }
}

function cleanupOldTabs_(ss) {
  // Remove old report tabs from previous version
  const oldTabs = [
    "Dashboard",
    "Report", 
    "Sections",
    "Insights",
    "Guide"
    // Note: "Charts" is kept and reused
  ];
  
  let removedCount = 0;
  for (const tabName of oldTabs) {
    const sheet = ss.getSheetByName(tabName);
    if (sheet) {
      ss.deleteSheet(sheet);
      removedCount++;
      Logger.log(`Removed old tab: ${tabName}`);
    }
  }
  
  if (removedCount > 0) {
    Logger.log(`Cleaned up ${removedCount} old report tabs`);
  }
}
