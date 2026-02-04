// Google Search Console → Google Sheets report (Manual CSV Upload Version)
// Enhanced with: Dashboard, Color-coding, Status indicators, Charts, Insights
// Creates tabs: Dashboard, Report, Sections, Charts, Insights
// Compares two periods of GSC data that you manually upload as CSV
//
// Setup:
// 1) Export GSC data for your URLs for two time periods (e.g., last 90 days and previous 90 days)
//    - In GSC: Performance → Pages → Filter by your URLs → Export
//    - Export with columns: Page, Clicks, Impressions, CTR, Position
// 2) Create two sheets in your Google Sheets:
//    - "GSC Current" - Paste current period data (with headers in row 1)
//    - "GSC Previous" - Paste previous period data (with headers in row 1)
// 3) Create a sheet named "URLs" with full URLs in column A (starting at A2)
//    - Optional: Add short names in column B for cleaner chart labels
//
// Expected CSV format in both sheets:
// | Page (URL) | Clicks | Impressions | CTR | Position |
// | https://... | 123 | 4567 | 2.69% | 8.5 |
//
// Run:
// - runGscSeoReportManual()
// - generateExportReport() (optional - creates a PDF-ready summary)

const SITE_URL = "https://developer.hashicorp.com/";

function runGscSeoReportManual() {
  const ss = SpreadsheetApp.getActive();

  // Get the manually uploaded data sheets
  const currentSheet = ss.getSheetByName("GSC Current");
  const previousSheet = ss.getSheetByName("GSC Previous");

  if (!currentSheet) throw new Error('Missing sheet "GSC Current". Create this sheet and paste your current period GSC export data.');
  if (!previousSheet) throw new Error('Missing sheet "GSC Previous". Create this sheet and paste your previous period GSC export data.');

  // Parse the GSC data from both sheets
  const currentData = parseGscData_(currentSheet);
  const previousData = parseGscData_(previousSheet);

  // Get URLs to track from URLs sheet (REQUIRED)
  const urlsSheet = ss.getSheetByName("URLs");

  if (!urlsSheet) {
    throw new Error('Missing sheet "URLs". Create this sheet and list the specific URLs you want to track in column A (starting at A2).');
  }

  // Get URLs and optional short names
  const urlsData = urlsSheet
    .getRange(2, 1, Math.max(urlsSheet.getLastRow() - 1, 0), 2)
    .getValues();

  const urlsToTrack = [];
  const shortNames = new Map(); // URL -> short name

  for (const row of urlsData) {
    const url = String(row[0]).trim();
    if (!url) continue;
    urlsToTrack.push(url);

    const shortName = String(row[1]).trim();
    if (shortName) {
      shortNames.set(url, shortName);
    }
  }

  if (urlsToTrack.length === 0) {
    throw new Error('No URLs found in "URLs" sheet. Add URLs to column A starting at row 2.');
  }

  Logger.log(`Processing ${urlsToTrack.length} URLs from "URLs" sheet.`);

  // Get date ranges from the data
  const dateRanges = extractDateRanges_(currentSheet, previousSheet);

  // Per-URL results with status indicators
  const urlRows = [];

  // Section rollups (weighted avg position by impressions)
  const sectionAgg = new Map(); // key -> {cur:{clicks,impr,posImpr}, prev:{...}}

  for (const pageUrl of urlsToTrack) {
    const cur = currentData.get(pageUrl) || { clicks: 0, impressions: 0, ctr: 0, position: 0 };
    const prev = previousData.get(pageUrl) || { clicks: 0, impressions: 0, ctr: 0, position: 0 };

    const curCtr = cur.ctr;
    const prevCtr = prev.ctr;

    // Calculate status and health score
    const status = calculateStatus_(cur, prev);
    const healthScore = calculateHealthScore_(cur, prev);

    // Get short name if available
    const displayName = shortNames.get(pageUrl) || extractUrlLabel_(pageUrl);

    // Calculate trend indicators
    const clicksTrend = getTrendIndicator_(cur.clicks, prev.clicks);
    const imprTrend = getTrendIndicator_(cur.impressions, prev.impressions);
    const ctrTrend = getTrendIndicator_(cur.ctr, prev.ctr);
    const posTrend = prev.position > 0 && cur.position > 0
      ? getTrendIndicator_(prev.position, cur.position) // Reverse for position (lower is better)
      : "⚪";

    urlRows.push([
      pageUrl,
      displayName,
      sectionKey_(pageUrl),
      status,
      healthScore,

      cur.clicks,
      prev.clicks,
      cur.clicks - prev.clicks,
      safePctChange_(cur.clicks, prev.clicks),
      clicksTrend,

      cur.impressions,
      prev.impressions,
      cur.impressions - prev.impressions,
      safePctChange_(cur.impressions, prev.impressions),
      imprTrend,

      curCtr,
      prevCtr,
      curCtr - prevCtr,
      ctrTrend,

      cur.position,
      prev.position,
      cur.position - prev.position, // negative delta is improvement (lower is better)
      posTrend,

      dateRanges.current.start,
      dateRanges.current.end,
      dateRanges.previous.start,
      dateRanges.previous.end,
    ]);

    const key = sectionKey_(pageUrl);
    if (!sectionAgg.has(key)) sectionAgg.set(key, emptyAgg_());

    const agg = sectionAgg.get(key);
    agg.cur.clicks += cur.clicks;
    agg.cur.impr += cur.impressions;
    agg.cur.posImpr += (cur.position * cur.impressions);

    agg.prev.clicks += prev.clicks;
    agg.prev.impr += prev.impressions;
    agg.prev.posImpr += (prev.position * prev.impressions);
  }

  // Generate all sheets
  writeDashboard_(ss, urlRows, sectionAgg, dateRanges);
  writeUrlReport_(ss, urlRows, dateRanges.current, dateRanges.previous);
  writeSectionReport_(ss, sectionAgg, dateRanges.current, dateRanges.previous);
  createCharts_(ss, urlRows, sectionAgg);
  writeInsights_(ss, urlRows, sectionAgg, dateRanges);
  writeGuide_(ss);

  SpreadsheetApp.getUi().alert(`Report generated successfully!\n\nProcessed ${urlsToTrack.length} URLs.\n\nCheck these tabs:\n• Dashboard - Executive summary\n• Report - Per-URL analysis\n• Insights - Auto-generated findings\n• Charts - Visual comparisons\n• Guide - How to read this report`);
}

function calculateStatus_(current, previous) {
  // Returns emoji status indicator based on performance
  // 🟢 = Strong (most metrics improving)
  // 🟡 = Mixed (some up, some down)
  // 🔴 = Declining (most metrics down)
  // ⚪ = New (no previous data)

  if (previous.clicks === 0 && previous.impressions === 0) {
    return "⚪"; // New URL
  }

  let improvements = 0;
  let declines = 0;

  // Check clicks
  if (current.clicks > previous.clicks * 1.05) improvements++;
  else if (current.clicks < previous.clicks * 0.95) declines++;

  // Check impressions
  if (current.impressions > previous.impressions * 1.05) improvements++;
  else if (current.impressions < previous.impressions * 0.95) declines++;

  // Check CTR
  if (current.ctr > previous.ctr * 1.05) improvements++;
  else if (current.ctr < previous.ctr * 0.95) declines++;

  // Check position (lower is better)
  if (current.position > 0 && previous.position > 0) {
    if (current.position < previous.position * 0.95) improvements++;
    else if (current.position > previous.position * 1.05) declines++;
  }

  if (improvements >= 3) return "🟢";
  if (declines >= 3) return "🔴";
  return "🟡";
}

function calculateHealthScore_(current, previous) {
  // Calculate a 0-100 health score based on current performance and trends
  // Weighted: 40% clicks, 25% CTR, 20% position, 15% impressions

  let score = 0;

  // Clicks component (40 points) - based on volume and trend
  const clicksBase = Math.min(current.clicks / 10, 20); // Up to 20 points for volume
  const clicksTrend = previous.clicks > 0
    ? Math.min(Math.max((current.clicks / previous.clicks - 1) * 50, -10), 20) // Up to 20 points for trend
    : 10; // Default for new URLs
  score += clicksBase + clicksTrend;

  // CTR component (25 points) - based on CTR value and trend
  const ctrBase = Math.min(current.ctr * 500, 15); // Up to 15 points (3% CTR = 15 points)
  const ctrTrend = previous.ctr > 0
    ? Math.min(Math.max((current.ctr / previous.ctr - 1) * 50, -5), 10) // Up to 10 points for trend
    : 5; // Default for new URLs
  score += ctrBase + ctrTrend;

  // Position component (20 points) - lower position is better
  if (current.position > 0) {
    const posBase = Math.max(20 - current.position * 2, 0); // Position 1 = 18 points, Position 10 = 0
    const posTrend = previous.position > 0
      ? Math.min(Math.max((previous.position - current.position) * 2, -5), 10) // Improvement = positive
      : 5; // Default for new URLs
    score += posBase + posTrend;
  } else {
    score += 10; // Default if no position data
  }

  // Impressions component (15 points) - based on volume and trend
  const imprBase = Math.min(current.impressions / 100, 8); // Up to 8 points for volume
  const imprTrend = previous.impressions > 0
    ? Math.min(Math.max((current.impressions / previous.impressions - 1) * 25, -4), 7) // Up to 7 points for trend
    : 4; // Default for new URLs
  score += imprBase + imprTrend;

  return Math.round(Math.min(Math.max(score, 0), 100));
}

function getTrendIndicator_(current, previous) {
  // Returns a visual trend indicator
  if (previous === 0) return "⚪"; // New
  const change = (current - previous) / previous;

  if (change > 0.1) return "📈"; // Strong up
  if (change > 0.05) return "↗️"; // Up
  if (change < -0.1) return "📉"; // Strong down
  if (change < -0.05) return "↘️"; // Down
  return "→"; // Stable
}

function generateActionItems_(urlRows) {
  // Generate specific, prioritized action items
  // Array indices: [0]=url, [1]=displayName, [2]=section, [3]=status, [4]=healthScore,
  // [5]=curClicks, [6]=prevClicks, [7]=clicksDelta, [8]=clicksPct, [9]=clicksTrend,
  // [10]=curImpr, [11]=prevImpr, [12]=imprDelta, [13]=imprPct, [14]=imprTrend,
  // [15]=curCTR, [16]=prevCTR, [17]=ctrDelta, [18]=ctrTrend,
  // [19]=curPos, [20]=prevPos, [21]=posDelta, [22]=posTrend
  const actions = [];

  // Find high-impression, low-CTR URLs (opportunity for title/description optimization)
  const lowCtrOpportunities = urlRows
    .filter(r => r[10] > 500 && r[15] < 0.02 && r[19] > 0) // >500 impressions, <2% CTR, has position
    .sort((a, b) => b[10] - a[10]) // Sort by impressions descending
    .slice(0, 3);

  for (const row of lowCtrOpportunities) {
    const potentialClicks = Math.round(row[10] * 0.03 - row[5]); // If CTR improved to 3%
    actions.push({
      priority: "HIGH",
      type: "CTR Optimization",
      url: row[1],
      action: `Optimize title/description - Position ${row[19].toFixed(1)}, ${row[10]} impressions, ${(row[15] * 100).toFixed(1)}% CTR`,
      impact: `+${potentialClicks} potential clicks`
    });
  }

  // Find position 4-10 URLs (close to page 1)
  const nearPageOne = urlRows
    .filter(r => r[19] >= 4 && r[19] <= 10 && r[10] > 100)
    .sort((a, b) => (b[10] / b[19]) - (a[10] / a[19])) // Sort by impressions/position ratio
    .slice(0, 3);

  for (const row of nearPageOne) {
    const potentialClicks = Math.round(row[10] * 0.15); // Estimate 15% CTR if reach position 1-3
    actions.push({
      priority: "MEDIUM",
      type: "Position Improvement",
      url: row[1],
      action: `Boost to page 1 - Currently position ${row[19].toFixed(1)}, ${row[10]} impressions`,
      impact: `+${potentialClicks} potential clicks`
    });
  }

  // Find declining URLs that need investigation
  const decliningUrls = urlRows
    .filter(r => r[3] === "🔴" && r[6] > 50) // Declining status, had >50 prev clicks
    .sort((a, b) => a[7] - b[7]) // Sort by clicks delta (most negative first)
    .slice(0, 3);

  for (const row of decliningUrls) {
    actions.push({
      priority: "HIGH",
      type: "Investigate Decline",
      url: row[1],
      action: `Lost ${Math.abs(row[7])} clicks (${(row[8] * 100).toFixed(0)}% decline)`,
      impact: `Fix to recover traffic`
    });
  }

  // Find cannibalization opportunities (multiple similar URLs in same section)
  const sectionUrls = new Map();
  for (const row of urlRows) {
    const section = row[2];
    if (!sectionUrls.has(section)) sectionUrls.set(section, []);
    sectionUrls.get(section).push(row);
  }

  for (const [section, urls] of sectionUrls.entries()) {
    if (urls.length >= 3) {
      const totalClicks = urls.reduce((sum, r) => sum + r[5], 0); // Current clicks
      const avgClicks = totalClicks / urls.length;
      const lowPerformers = urls.filter(r => r[5] < avgClicks * 0.5).length;

      if (lowPerformers >= 2) {
        actions.push({
          priority: "MEDIUM",
          type: "Content Consolidation",
          url: section,
          action: `${urls.length} URLs competing, ${lowPerformers} underperforming`,
          impact: `Consider consolidating content`
        });
      }
    }
  }

  // Sort by priority
  const priorityOrder = { "HIGH": 0, "MEDIUM": 1, "LOW": 2 };
  actions.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  return actions.slice(0, 10); // Top 10 actions
}

function extractUrlLabel_(url) {
  // Extract last path segment for cleaner labels
  try {
    const urlParts = url.split('/').filter(Boolean);
    return urlParts[urlParts.length - 1] || url;
  } catch (e) {
    return url;
  }
}

function writeDashboard_(ss, urlRows, sectionAgg, dateRanges) {
  const sheet = getOrCreateSheet_(ss, "Dashboard");

  // Clear everything to avoid merge conflicts
  sheet.clear(); // Clear all content, formatting, and data validation
  sheet.clearConditionalFormatRules(); // Clear all conditional formatting
  sheet.setFrozenRows(0);
  sheet.setFrozenColumns(0);

  // Calculate summary metrics (updated indices for new data structure)
  let totalClicksCur = 0, totalClicksPrev = 0;
  let totalImprCur = 0, totalImprPrev = 0;
  let totalPosImprCur = 0, totalPosImprPrev = 0;
  let improving = 0, declining = 0, mixed = 0, newUrls = 0;
  let totalHealthScore = 0;

  for (const row of urlRows) {
    const status = row[3];
    if (status === "🟢") improving++;
    else if (status === "🔴") declining++;
    else if (status === "🟡") mixed++;
    else if (status === "⚪") newUrls++;

    totalHealthScore += row[4]; // health score
    totalClicksCur += row[5]; // cur clicks
    totalClicksPrev += row[6]; // prev clicks
    totalImprCur += row[10]; // cur impressions
    totalImprPrev += row[11]; // prev impressions
    totalPosImprCur += (row[19] * row[10]); // cur position * cur impressions
    totalPosImprPrev += (row[20] * row[11]); // prev position * prev impressions
  }

  const avgHealthScore = totalHealthScore / urlRows.length;

  const avgPosCur = totalImprCur > 0 ? totalPosImprCur / totalImprCur : 0;
  const avgPosPrev = totalImprPrev > 0 ? totalPosImprPrev / totalImprPrev : 0;
  const avgCtrCur = totalImprCur > 0 ? totalClicksCur / totalImprCur : 0;
  const avgCtrPrev = totalImprPrev > 0 ? totalClicksPrev / totalImprPrev : 0;

  // === TITLE AND SUMMARY ===
  sheet.getRange("A1").setValue("📊 SEO Performance Dashboard");
  sheet.getRange("A1").setFontSize(20).setFontWeight("bold");
  sheet.getRange("A2").setValue(`${dateRanges.current.start} to ${dateRanges.current.end} vs ${dateRanges.previous.start} to ${dateRanges.previous.end}`);
  sheet.getRange("A2").setFontSize(10).setFontColor("#666666");

  let cardRow = 4;

  // === QUICK REFERENCE CARD ===
  sheet.getRange(cardRow, 1).setValue("📖 Quick Reference");
  sheet.getRange(cardRow, 1).setFontSize(12).setFontWeight("bold").setBackground("#e8f0fe");
  cardRow++;

  const quickRef = [
    ["Status Indicators:", "🟢 Strong | 🟡 Mixed | 🔴 Declining | ⚪ New"],
    ["Trends:", "📈 Up >10% | 📉 Down >10% | ➡️ Stable | ⚪ No data"],
    ["Colors:", "Green = Good | Red = Needs attention | Gray = Neutral"],
    ["Position:", "1-10 = Page 1 | 11-20 = Page 2 (Quick wins!) | Lower is better"],
    ["CTR:", "Click-Through Rate = Clicks ÷ Impressions | Higher is better"],
    ["Health Score:", "70+ Healthy | 50-69 Moderate | <50 Needs work"],
    ["💡 Tip:", "Check 'Guide' tab for detailed explanations and troubleshooting"]
  ];

  sheet.getRange(cardRow, 1, quickRef.length, 2).setValues(quickRef);
  sheet.getRange(cardRow, 1, quickRef.length, 1).setFontWeight("bold");
  sheet.getRange(cardRow, 1, quickRef.length, 2).setBackground("#f8f9fa").setBorder(true, true, true, true, true, true);
  sheet.getRange(cardRow + quickRef.length - 1, 1, 1, 2).setBackground("#fff3cd"); // Highlight tip row
  cardRow += quickRef.length + 2;

  // Summary stats row (no merged cells)
  const clicksChange = totalClicksCur - totalClicksPrev;
  const clicksPct = safePctChange_(totalClicksCur, totalClicksPrev);
  const imprChange = totalImprCur - totalImprPrev;
  const imprPct = safePctChange_(totalImprCur, totalImprPrev);

  sheet.getRange(cardRow, 1).setValue("Total Clicks:");
  sheet.getRange(cardRow, 2).setValue(totalClicksCur).setNumberFormat("#,##0").setFontWeight("bold").setFontSize(14);
  sheet.getRange(cardRow, 3).setValue(`${clicksChange > 0 ? '↗' : '↘'} ${(clicksPct * 100).toFixed(1)}%`).setFontColor(clicksChange > 0 ? "#0f9d58" : "#d93025");

  sheet.getRange(cardRow, 4).setValue("Total Impr:");
  sheet.getRange(cardRow, 5).setValue(totalImprCur).setNumberFormat("#,##0").setFontWeight("bold").setFontSize(14);
  sheet.getRange(cardRow, 6).setValue(`${imprChange > 0 ? '↗' : '↘'} ${(imprPct * 100).toFixed(1)}%`).setFontColor(imprChange > 0 ? "#0f9d58" : "#d93025");

  sheet.getRange(cardRow, 7).setValue("Avg Health:");
  sheet.getRange(cardRow, 8).setValue(avgHealthScore.toFixed(0)).setFontWeight("bold").setFontSize(14);
  const scoreColor = avgHealthScore >= 70 ? "#0f9d58" : avgHealthScore >= 50 ? "#f9ab00" : "#d93025";
  sheet.getRange(cardRow, 8).setFontColor(scoreColor);

  sheet.getRange(cardRow, 1, 1, 8).setBackground("#f8f9fa");
  cardRow += 2;

  // Key metrics section
  sheet.getRange(cardRow, 1).setValue("📊 Key Metrics");
  sheet.getRange(cardRow, 1).setFontSize(14).setFontWeight("bold").setBackground("#e8f0fe");
  sheet.getRange(cardRow, 2).setValue("(Green = improving, Red = declining)");
  sheet.getRange(cardRow, 2).setFontSize(9).setFontColor("#666666").setFontStyle("italic");
  cardRow++;

  const metricsData = [
    ["Metric", "Current", "Previous", "Change", "% Change"],
    ["Total Clicks", totalClicksCur, totalClicksPrev, totalClicksCur - totalClicksPrev, safePctChange_(totalClicksCur, totalClicksPrev)],
    ["Total Impressions", totalImprCur, totalImprPrev, totalImprCur - totalImprPrev, safePctChange_(totalImprCur, totalImprPrev)],
    ["Avg CTR", avgCtrCur, avgCtrPrev, avgCtrCur - avgCtrPrev, safePctChange_(avgCtrCur, avgCtrPrev)],
    ["Avg Position", avgPosCur, avgPosPrev, avgPosCur - avgPosPrev, safePctChange_(avgPosCur, avgPosPrev)],
  ];

  sheet.getRange(cardRow, 1, metricsData.length, 5).setValues(metricsData);
  sheet.getRange(cardRow, 1, 1, 5).setFontWeight("bold").setBackground("#f3f3f3");
  sheet.getRange(cardRow + 1, 4, 4, 1).setNumberFormat("#,##0");
  sheet.getRange(cardRow + 1, 5, 4, 1).setNumberFormat("0.00%");
  sheet.getRange(cardRow + 3, 2, 2, 2).setNumberFormat("0.00%"); // CTR rows
  sheet.getRange(cardRow + 4, 2, 1, 2).setNumberFormat("0.00"); // Position row

  // Apply color coding to metrics
  applyColorCoding_(sheet, cardRow + 1, 5, 3, 1); // % Change column for Clicks, Impressions, CTR (normal)
  applyColorCoding_(sheet, cardRow + 4, 5, 1, 1, true); // % Change for Avg Position (inverse - lower is better)
  cardRow += metricsData.length + 1;

  // URL Status Summary
  sheet.getRange(cardRow, 1).setValue("🚦 URL Performance Status");
  sheet.getRange(cardRow, 1).setFontSize(14).setFontWeight("bold").setBackground("#e8f0fe");
  sheet.getRange(cardRow, 2).setValue("(Distribution of page performance)");
  sheet.getRange(cardRow, 2).setFontSize(9).setFontColor("#666666").setFontStyle("italic");
  cardRow++;

  const statusData = [
    ["Status", "Count", "% of Total"],
    ["🟢 Strong Performance", improving, improving / urlRows.length],
    ["🟡 Mixed Performance", mixed, mixed / urlRows.length],
    ["🔴 Declining Performance", declining, declining / urlRows.length],
    ["⚪ New URLs", newUrls, newUrls / urlRows.length],
    ["", "", ""],
    ["Total URLs", urlRows.length, ""],
  ];

  sheet.getRange(cardRow, 1, statusData.length, 3).setValues(statusData);
  sheet.getRange(cardRow, 1, 1, 3).setFontWeight("bold").setBackground("#f3f3f3");
  sheet.getRange(cardRow + 1, 3, 4, 1).setNumberFormat("0.00%");
  sheet.getRange(cardRow + 6, 1, 1, 2).setFontWeight("bold");
  cardRow += statusData.length + 1;

  // Top Performers
  sheet.getRange(cardRow, 1).setValue("🏆 Top 3 Gainers (by Clicks)");
  sheet.getRange(cardRow, 1).setFontSize(14).setFontWeight("bold").setBackground("#e8f0fe");
  sheet.getRange(cardRow, 2).setValue("(Pages with biggest traffic increases)");
  sheet.getRange(cardRow, 2).setFontSize(9).setFontColor("#666666").setFontStyle("italic");
  cardRow++;

  const topGainers = [...urlRows]
    .sort((a, b) => b[7] - a[7]) // Sort by clicks delta descending (updated index)
    .slice(0, 3)
    .map(row => [
      row[1], // URL
      row[5], // Current Clicks
      row[6], // Previous Clicks
      row[7], // Clicks Change
      safePctChange_(row[5], row[6]), // Clicks % Change
      row[10], // Current Impressions
      row[11], // Previous Impressions
      row[12], // Impressions Change
      safePctChange_(row[10], row[11]) // Impressions % Change
    ]);

  sheet.getRange(cardRow, 1, 1, 9).setValues([["URL", "Current Clicks", "Previous Clicks", "Clicks Δ", "Clicks %Δ", "Current Impr", "Previous Impr", "Impr Δ", "Impr %Δ"]]);
  sheet.getRange(cardRow, 1, 1, 9).setFontWeight("bold").setBackground("#d9ead3");
  if (topGainers.length > 0) {
    sheet.getRange(cardRow + 1, 1, topGainers.length, 9).setValues(topGainers);
    sheet.getRange(cardRow + 1, 5, topGainers.length, 1).setNumberFormat("0.00%"); // Clicks %
    sheet.getRange(cardRow + 1, 9, topGainers.length, 1).setNumberFormat("0.00%"); // Impressions %
  }
  cardRow += 5;

  // Attention Needed
  sheet.getRange(cardRow, 1).setValue("⚠️ Top 3 Decliners (by Clicks)");
  sheet.getRange(cardRow, 1).setFontSize(14).setFontWeight("bold").setBackground("#e8f0fe");
  sheet.getRange(cardRow, 2).setValue("(Pages losing traffic - needs attention!)");
  sheet.getRange(cardRow, 2).setFontSize(9).setFontColor("#666666").setFontStyle("italic");
  cardRow++;

  const topDecliners = [...urlRows]
    .sort((a, b) => a[7] - b[7]) // Sort by clicks delta ascending (most negative first, updated index)
    .slice(0, 3)
    .map(row => [
      row[1], // URL
      row[5], // Current Clicks
      row[6], // Previous Clicks
      row[7], // Clicks Change
      safePctChange_(row[5], row[6]), // Clicks % Change
      row[10], // Current Impressions
      row[11], // Previous Impressions
      row[12], // Impressions Change
      safePctChange_(row[10], row[11]) // Impressions % Change
    ]);

  sheet.getRange(cardRow, 1, 1, 9).setValues([["URL", "Current Clicks", "Previous Clicks", "Clicks Δ", "Clicks %Δ", "Current Impr", "Previous Impr", "Impr Δ", "Impr %Δ"]]);
  sheet.getRange(cardRow, 1, 1, 9).setFontWeight("bold").setBackground("#f4cccc");
  if (topDecliners.length > 0) {
    sheet.getRange(cardRow + 1, 1, topDecliners.length, 9).setValues(topDecliners);
    sheet.getRange(cardRow + 1, 5, topDecliners.length, 1).setNumberFormat("0.00%"); // Clicks %
    sheet.getRange(cardRow + 1, 9, topDecliners.length, 1).setNumberFormat("0.00%"); // Impressions %
  }

  // Top Performers by Impressions
  sheet.getRange(cardRow, 1).setValue("🏆 Top 3 Gainers (by Impressions)");
  sheet.getRange(cardRow, 1).setFontSize(14).setFontWeight("bold").setBackground("#e8f0fe");
  sheet.getRange(cardRow, 2).setValue("(Pages gaining visibility in search)");
  sheet.getRange(cardRow, 2).setFontSize(9).setFontColor("#666666").setFontStyle("italic");
  cardRow++;

  const topGainersImpr = [...urlRows]
    .sort((a, b) => b[12] - a[12]) // Sort by impressions delta descending
    .slice(0, 3)
    .map(row => [
      row[1], // URL
      row[10], // Current Impressions
      row[11], // Previous Impressions
      row[12], // Impressions Change
      safePctChange_(row[10], row[11]), // Impressions % Change
    ]);

  sheet.getRange(cardRow, 1, 1, 5).setValues([["URL", "Current Impr", "Previous Impr", "Impr Δ", "Impr %Δ"]]);
  sheet.getRange(cardRow, 1, 1, 5).setFontWeight("bold").setBackground("#d9ead3");
  if (topGainersImpr.length > 0) {
    sheet.getRange(cardRow + 1, 1, topGainersImpr.length, 5).setValues(topGainersImpr);
    sheet.getRange(cardRow + 1, 5, topGainersImpr.length, 1).setNumberFormat("0.00%");
  }
  cardRow += 5;

  // Attention Needed by Impressions
  sheet.getRange(cardRow, 1).setValue("⚠️ Top 3 Decliners (by Impressions)");
  sheet.getRange(cardRow, 1).setFontSize(14).setFontWeight("bold").setBackground("#e8f0fe");
  sheet.getRange(cardRow, 2).setValue("(Pages losing visibility - investigate why)");
  sheet.getRange(cardRow, 2).setFontSize(9).setFontColor("#666666").setFontStyle("italic");
  cardRow++;

  const topDeclinersImpr = [...urlRows]
    .sort((a, b) => a[12] - b[12]) // Sort by impressions delta ascending (most negative first)
    .slice(0, 3)
    .map(row => [
      row[1], // URL
      row[10], // Current Impressions
      row[11], // Previous Impressions
      row[12], // Impressions Change
      safePctChange_(row[10], row[11]), // Impressions % Change
    ]);

  sheet.getRange(cardRow, 1, 1, 5).setValues([["URL", "Current Impr", "Previous Impr", "Impr Δ", "Impr %Δ"]]);
  sheet.getRange(cardRow, 1, 1, 5).setFontWeight("bold").setBackground("#f4cccc");
  if (topDeclinersImpr.length > 0) {
    sheet.getRange(cardRow + 1, 1, topDeclinersImpr.length, 5).setValues(topDeclinersImpr);
    sheet.getRange(cardRow + 1, 5, topDeclinersImpr.length, 1).setNumberFormat("0.00%");
  }
  cardRow += 5;
  cardRow += 5;

  // Section Performance
  sheet.getRange(cardRow, 1).setValue("📁 Section Performance Summary");
  sheet.getRange(cardRow, 1).setFontSize(14).setFontWeight("bold").setBackground("#e8f0fe");
  sheet.getRange(cardRow, 2).setValue("(Top 5 site sections by traffic)");
  sheet.getRange(cardRow, 2).setFontSize(9).setFontColor("#666666").setFontStyle("italic");
  cardRow++;

  const sectionSummary = Array.from(sectionAgg.entries())
    .map(([key, agg]) => {
      return [
        key,
        agg.cur.clicks,
        agg.prev.clicks,
        agg.cur.clicks - agg.prev.clicks,
        safePctChange_(agg.cur.clicks, agg.prev.clicks),
      ];
    })
    .sort((a, b) => b[1] - a[1]) // Sort by current clicks
    .slice(0, 5); // Top 5 sections

  sheet.getRange(cardRow, 1, 1, 5).setValues([["Section", "Current Clicks", "Previous Clicks", "Change", "% Change"]]);
  sheet.getRange(cardRow, 1, 1, 5).setFontWeight("bold").setBackground("#f3f3f3");
  if (sectionSummary.length > 0) {
    sheet.getRange(cardRow + 1, 1, sectionSummary.length, 5).setValues(sectionSummary);
    sheet.getRange(cardRow + 1, 5, sectionSummary.length, 1).setNumberFormat("0.00%");
    applyColorCoding_(sheet, cardRow + 1, 5, sectionSummary.length, 1);
  }

  // Auto-resize columns
  sheet.autoResizeColumns(1, 5);
  sheet.setColumnWidth(1, 300);

  Logger.log("Enhanced dashboard with summary cards created successfully");
}

function writeInsights_(ss, urlRows, sectionAgg, dateRanges) {
  const sheet = getOrCreateSheet_(ss, "Insights");

  // Clear everything to avoid merge conflicts
  sheet.clear();
  sheet.clearConditionalFormatRules();

  // Title
  sheet.getRange("A1").setValue("🔍 Auto-Generated Insights");
  sheet.getRange("A1").setFontSize(18).setFontWeight("bold");
  sheet.getRange("A2").setValue(`Analysis for ${dateRanges.current.start} to ${dateRanges.current.end}`);
  sheet.getRange("A2").setFontSize(10).setFontColor("#666666");

  const insights = [];
  let row = 4;

  // Array indices: [0]=url, [1]=displayName, [2]=section, [3]=status, [4]=healthScore,
  // [5]=curClicks, [6]=prevClicks, [7]=clicksDelta, [8]=clicksPct, [9]=clicksTrend,
  // [10]=curImpr, [11]=prevImpr, [12]=imprDelta, [13]=imprPct, [14]=imprTrend,
  // [15]=curCTR, [16]=prevCTR, [17]=ctrDelta, [18]=ctrTrend,
  // [19]=curPos, [20]=prevPos, [21]=posDelta, [22]=posTrend

  // Overall performance insight
  const totalClicksCur = urlRows.reduce((sum, r) => sum + r[5], 0);
  const totalClicksPrev = urlRows.reduce((sum, r) => sum + r[6], 0);
  const clicksChange = safePctChange_(totalClicksCur, totalClicksPrev);

  insights.push(["📈 Overall Performance", ""]);
  if (clicksChange > 0.1) {
    insights.push(["", `Strong growth: Total clicks increased by ${formatPct_(clicksChange)} (${totalClicksCur - totalClicksPrev} clicks)`]);
  } else if (clicksChange < -0.1) {
    insights.push(["", `Attention needed: Total clicks decreased by ${formatPct_(Math.abs(clicksChange))} (${totalClicksCur - totalClicksPrev} clicks)`]);
  } else {
    insights.push(["", `Stable performance: Total clicks changed by ${formatPct_(clicksChange)}`]);
  }
  insights.push(["", ""]);

  // Top gainer
  const topGainer = [...urlRows].sort((a, b) => b[7] - a[7])[0]; // Sort by clicks delta
  insights.push(["🏆 Top Gainer", ""]);
  insights.push(["", `${topGainer[1]}`]);
  insights.push(["", `• Clicks: ${topGainer[5]} (${formatPctWithSign_(safePctChange_(topGainer[5], topGainer[6]))})`]);
  insights.push(["", `• Change: +${topGainer[7]} clicks`]);
  insights.push(["", ""]);

  // Top decliner
  const topDecliner = [...urlRows].sort((a, b) => a[7] - b[7])[0]; // Sort by clicks delta (most negative first)
  if (topDecliner[7] < 0) {
    insights.push(["⚠️ Needs Attention", ""]);
    insights.push(["", `${topDecliner[1]}`]);
    insights.push(["", `• Clicks: ${topDecliner[5]} (${formatPctWithSign_(safePctChange_(topDecliner[5], topDecliner[6]))})`]);
    insights.push(["", `• Change: ${topDecliner[7]} clicks`]);
    insights.push(["", ""]);
  }

  // Position insights
  const positionGainers = urlRows.filter(r => r[21] < -1).length; // Position improved by >1
  const positionLosers = urlRows.filter(r => r[21] > 1).length; // Position declined by >1

  insights.push(["📍 Position Changes", ""]);
  insights.push(["", `• ${positionGainers} URLs improved position by more than 1 spot`]);
  insights.push(["", `• ${positionLosers} URLs declined position by more than 1 spot`]);
  insights.push(["", ""]);

  // CTR opportunities
  const lowCtrUrls = urlRows.filter(r => r[15] < 0.02 && r[10] > 100).length; // CTR < 2% with >100 impressions
  if (lowCtrUrls > 0) {
    insights.push(["💡 Opportunities", ""]);
    insights.push(["", `• ${lowCtrUrls} URLs have CTR below 2% despite good visibility (>100 impressions)`]);
    insights.push(["", `• Consider optimizing titles and meta descriptions for these URLs`]);
    insights.push(["", ""]);
  }

  // Section performance
  const bestSection = Array.from(sectionAgg.entries())
    .map(([key, agg]) => ({
      key,
      clicks: agg.cur.clicks,
      change: agg.cur.clicks - agg.prev.clicks,
      pctChange: safePctChange_(agg.cur.clicks, agg.prev.clicks)
    }))
    .sort((a, b) => b.change - a.change)[0];

  if (bestSection) {
    insights.push(["📂 Best Performing Section", ""]);
    insights.push(["", `${bestSection.key}`]);
    insights.push(["", `• Clicks: ${bestSection.clicks} (${formatPctWithSign_(bestSection.pctChange)})`]);
    insights.push(["", `• Change: ${bestSection.change > 0 ? '+' : ''}${bestSection.change} clicks`]);
    insights.push(["", ""]);
  }

  // New URLs
  const newUrls = urlRows.filter(r => r[3] === "⚪");
  if (newUrls.length > 0) {
    insights.push(["🆕 New Rankings", ""]);
    insights.push(["", `• ${newUrls.length} URLs started ranking in this period`]);
    const topNew = newUrls.sort((a, b) => b[5] - a[5])[0]; // Sort by current clicks
    insights.push(["", `• Top new URL: ${topNew[1]} (${topNew[5]} clicks)`]);
    insights.push(["", ""]);
  }

  // === ACTION ITEMS SECTION (NEW) ===
  const actionItems = generateActionItems_(urlRows);
  if (actionItems.length > 0) {
    insights.push(["🎯 Recommended Actions", ""]);
    insights.push(["", `${actionItems.length} specific action items identified:`]);
    insights.push(["", ""]);

    for (const item of actionItems) {
      const priorityEmoji = item.priority === "HIGH" ? "🔴" : item.priority === "MEDIUM" ? "🟡" : "⚪";
      insights.push(["", `${priorityEmoji} ${item.type}: ${item.url}`]);
      insights.push(["", `   ${item.action}`]);
      insights.push(["", `   Impact: ${item.impact}`]);
      insights.push(["", ""]);
    }
  }

  // Write insights
  sheet.getRange(row, 1, insights.length, 2).setValues(insights);

  // Format section headers (bold)
  const sectionHeaders = ["📈 Overall Performance", "🏆 Top Gainer", "⚠️ Needs Attention",
                          "📍 Position Changes", "💡 Opportunities", "📂 Best Performing Section",
                          "🆕 New Rankings", "🎯 Recommended Actions"];
  for (let i = 0; i < insights.length; i++) {
    if (sectionHeaders.includes(insights[i][0])) {
      sheet.getRange(row + i, 1).setFontWeight("bold").setFontSize(12);
    }
  }

  sheet.setColumnWidth(1, 200);
  sheet.setColumnWidth(2, 600);

  Logger.log("Insights with action items created successfully");
}

function writeGuide_(ss) {
  const sheet = getOrCreateSheet_(ss, "Guide");
  sheet.clear();
  sheet.clearConditionalFormatRules();

  // Title
  sheet.getRange("A1").setValue("📖 How to Read This Report");
  sheet.getRange("A1").setFontSize(18).setFontWeight("bold");
  sheet.getRange("A2").setValue("Complete guide to understanding your GSC SEO Performance Report");
  sheet.getRange("A2").setFontSize(10).setFontColor("#666666");

  let row = 4;
  const content = [];

  // === OVERVIEW ===
  content.push(["═══════════════════════════════════════════════════════════════", ""]);
  content.push(["📊 REPORT OVERVIEW", ""]);
  content.push(["═══════════════════════════════════════════════════════════════", ""]);
  content.push(["", ""]);
  content.push(["This report compares two time periods of Google Search Console data to help you:", ""]);
  content.push(["  • Identify which pages are gaining or losing traffic", ""]);
  content.push(["  • Spot opportunities for quick SEO wins", ""]);
  content.push(["  • Track overall site performance trends", ""]);
  content.push(["  • Make data-driven decisions about content optimization", ""]);
  content.push(["", ""]);

  // === TABS EXPLAINED ===
  content.push(["═══════════════════════════════════════════════════════════════", ""]);
  content.push(["📑 TABS EXPLAINED", ""]);
  content.push(["═══════════════════════════════════════════════════════════════", ""]);
  content.push(["", ""]);
  content.push(["Dashboard", "Executive summary with key metrics and top performers/decliners"]);
  content.push(["Report", "Detailed per-URL analysis with all metrics and trends"]);
  content.push(["Sections", "Performance grouped by site sections (e.g., /docs, /blog)"]);
  content.push(["Charts", "Visual comparisons of top URLs and performance changes"]);
  content.push(["Insights", "Auto-generated findings and recommended actions"]);
  content.push(["Guide", "This tab - explains how to read and use the report"]);
  content.push(["", ""]);

  // === KEY METRICS ===
  content.push(["═══════════════════════════════════════════════════════════════", ""]);
  content.push(["📈 KEY METRICS EXPLAINED", ""]);
  content.push(["═══════════════════════════════════════════════════════════════", ""]);
  content.push(["", ""]);
  content.push(["Clicks", "Number of times users clicked your URL in search results"]);
  content.push(["", "→ Higher is better. This is actual traffic to your site."]);
  content.push(["", ""]);
  content.push(["Impressions", "Number of times your URL appeared in search results"]);
  content.push(["", "→ Higher means more visibility. Not all impressions lead to clicks."]);
  content.push(["", ""]);
  content.push(["CTR (Click-Through Rate)", "Percentage of impressions that resulted in clicks"]);
  content.push(["", "→ Formula: (Clicks ÷ Impressions) × 100"]);
  content.push(["", "→ Higher is better. Good CTR varies by position:"]);
  content.push(["", "   • Position 1-3: 20-40% is typical"]);
  content.push(["", "   • Position 4-10: 5-15% is typical"]);
  content.push(["", "   • Position 11-20: 1-5% is typical"]);
  content.push(["", ""]);
  content.push(["Position", "Average ranking position in search results"]);
  content.push(["", "→ Lower is better (Position 1 is the top result)"]);
  content.push(["", "→ Position 1-10 = Page 1 of Google"]);
  content.push(["", "→ Position 11-20 = Page 2 of Google"]);
  content.push(["", ""]);
  content.push(["Health Score", "Overall performance score from 0-100"]);
  content.push(["", "→ Combines clicks, impressions, CTR, and position changes"]);
  content.push(["", "→ 70+ = Healthy, 50-69 = Moderate, <50 = Needs attention"]);
  content.push(["", ""]);

  // === STATUS INDICATORS ===
  content.push(["═══════════════════════════════════════════════════════════════", ""]);
  content.push(["🚦 STATUS INDICATORS", ""]);
  content.push(["═══════════════════════════════════════════════════════════════", ""]);
  content.push(["", ""]);
  content.push(["🟢 Strong Performance", "URL is improving across multiple metrics"]);
  content.push(["", "→ Clicks and impressions are up"]);
  content.push(["", "→ Position may be improving"]);
  content.push(["", "→ Action: Monitor and maintain current strategy"]);
  content.push(["", ""]);
  content.push(["🟡 Mixed Performance", "URL has both gains and losses"]);
  content.push(["", "→ Some metrics up, others down"]);
  content.push(["", "→ Action: Investigate which metrics need attention"]);
  content.push(["", ""]);
  content.push(["🔴 Declining Performance", "URL is losing traffic or visibility"]);
  content.push(["", "→ Clicks and/or impressions are down significantly"]);
  content.push(["", "→ Action: Priority for investigation and optimization"]);
  content.push(["", ""]);
  content.push(["⚪ New URL", "URL appeared in current period but not previous"]);
  content.push(["", "→ Could be newly published content"]);
  content.push(["", "→ Action: Monitor growth trajectory"]);
  content.push(["", ""]);

  // === TREND ARROWS ===
  content.push(["═══════════════════════════════════════════════════════════════", ""]);
  content.push(["📊 TREND ARROWS", ""]);
  content.push(["═══════════════════════════════════════════════════════════════", ""]);
  content.push(["", ""]);
  content.push(["📈 Trending Up", "Metric increased by more than 10%"]);
  content.push(["📉 Trending Down", "Metric decreased by more than 10%"]);
  content.push(["➡️ Stable", "Metric changed by less than 10%"]);
  content.push(["⚪ No Data", "No previous period data available"]);
  content.push(["", ""]);

  // === COLOR CODING ===
  content.push(["═══════════════════════════════════════════════════════════════", ""]);
  content.push(["🎨 COLOR CODING", ""]);
  content.push(["═══════════════════════════════════════════════════════════════", ""]);
  content.push(["", ""]);
  content.push(["Green Text/Background", "Positive change (increase in clicks, impressions, CTR)"]);
  content.push(["Red Text/Background", "Negative change (decrease in clicks, impressions, CTR)"]);
  content.push(["Gray Text", "Minimal change (less than 5%)"]);
  content.push(["", ""]);
  content.push(["Position Colors:", ""]);
  content.push(["  Light Green", "Position 1-3 (Top of page 1)"]);
  content.push(["  Light Yellow", "Position 4-10 (Rest of page 1)"]);
  content.push(["  Light Orange", "Position 11-20 (Page 2)"]);
  content.push(["  Light Red", "Position 21+ (Page 3 and beyond)"]);
  content.push(["", ""]);

  // === HOW TO USE ===
  content.push(["═══════════════════════════════════════════════════════════════", ""]);
  content.push(["💡 HOW TO USE THIS REPORT", ""]);
  content.push(["═══════════════════════════════════════════════════════════════", ""]);
  content.push(["", ""]);
  content.push(["1. Start with Dashboard", "Get the big picture of overall performance"]);
  content.push(["", ""]);
  content.push(["2. Check Top Decliners", "These need immediate attention"]);
  content.push(["", "→ Look for patterns (similar topics, old content, etc.)"]);
  content.push(["", "→ Investigate why traffic dropped"]);
  content.push(["", ""]);
  content.push(["3. Review Insights Tab", "See auto-generated recommendations"]);
  content.push(["", "→ Focus on 'Quick Win' opportunities first"]);
  content.push(["", "→ Address CTR optimization opportunities"]);
  content.push(["", ""]);
  content.push(["4. Explore Charts", "Visualize trends and patterns"]);
  content.push(["", "→ Identify which content types perform best"]);
  content.push(["", "→ Spot seasonal patterns"]);
  content.push(["", ""]);
  content.push(["5. Dive into Report Tab", "Detailed analysis of specific URLs"]);
  content.push(["", "→ Use filters to focus on specific sections"]);
  content.push(["", "→ Sort by different metrics to find opportunities"]);
  content.push(["", ""]);

  // === COMMON SCENARIOS ===
  content.push(["═══════════════════════════════════════════════════════════════", ""]);
  content.push(["🔍 COMMON SCENARIOS & ACTIONS", ""]);
  content.push(["═══════════════════════════════════════════════════════════════", ""]);
  content.push(["", ""]);
  content.push(["Scenario: High Impressions, Low CTR", ""]);
  content.push(["Problem:", "Your page shows up in search but people don't click"]);
  content.push(["Action:", "• Improve title tag to be more compelling"]);
  content.push(["", "• Update meta description to better match search intent"]);
  content.push(["", "• Add relevant keywords to title"]);
  content.push(["", ""]);
  content.push(["Scenario: Position 11-20 (Page 2)", ""]);
  content.push(["Problem:", "You're close to page 1 but not quite there"]);
  content.push(["Action:", "• Add more comprehensive content"]);
  content.push(["", "• Improve internal linking to this page"]);
  content.push(["", "• Update content to be more current"]);
  content.push(["", "• These are 'Quick Win' opportunities!"]);
  content.push(["", ""]);
  content.push(["Scenario: Declining Clicks & Impressions", ""]);
  content.push(["Problem:", "Page is losing visibility in search"]);
  content.push(["Action:", "• Check if content is outdated"]);
  content.push(["", "• Look for technical issues (broken links, slow load)"]);
  content.push(["", "• See if competitors published better content"]);
  content.push(["", "• Consider refreshing/updating the content"]);
  content.push(["", ""]);
  content.push(["Scenario: Good Position, Low Clicks", ""]);
  content.push(["Problem:", "Ranking well but not getting traffic"]);
  content.push(["Action:", "• Content may not match search intent"]);
  content.push(["", "• Title/description may be misleading"]);
  content.push(["", "• Consider rewriting to better match what users want"]);
  content.push(["", ""]);

  // === TIPS ===
  content.push(["═══════════════════════════════════════════════════════════════", ""]);
  content.push(["💡 PRO TIPS", ""]);
  content.push(["═══════════════════════════════════════════════════════════════", ""]);
  content.push(["", ""]);
  content.push(["✓ Focus on trends, not single data points", "One bad week doesn't mean failure"]);
  content.push(["✓ Prioritize pages with existing traffic", "Easier to improve than start from zero"]);
  content.push(["✓ Look for patterns across similar content", "What works for one page may work for others"]);
  content.push(["✓ Don't ignore 'stable' pages", "Maintaining good performance is also important"]);
  content.push(["✓ Compare similar time periods", "Avoid seasonal bias (e.g., holiday vs non-holiday)"]);
  content.push(["✓ Track changes over multiple periods", "Run this report monthly to see long-term trends"]);
  content.push(["", ""]);

  // === TROUBLESHOOTING ===
  content.push(["═══════════════════════════════════════════════════════════════", ""]);
  content.push(["🔧 TROUBLESHOOTING", ""]);
  content.push(["═══════════════════════════════════════════════════════════════", ""]);
  content.push(["", ""]);
  content.push(["Missing Data?", ""]);
  content.push(["", "• Check that both 'GSC Current' and 'GSC Previous' sheets exist"]);
  content.push(["", "• Verify data is pasted starting at row 1 with headers"]);
  content.push(["", "• Ensure 'URLs' sheet has URLs in column A starting at row 2"]);
  content.push(["", ""]);
  content.push(["Zeros or N/A Values?", ""]);
  content.push(["", "• URL may not have appeared in that time period"]);
  content.push(["", "• Could be newly published content (⚪ status)"]);
  content.push(["", "• Check if URL is correct in URLs sheet"]);
  content.push(["", ""]);
  content.push(["Unexpected Results?", ""]);
  content.push(["", "• Verify date ranges are correct and comparable"]);
  content.push(["", "• Check for major site changes during the period"]);
  content.push(["", "• Consider seasonal factors (holidays, events)"]);
  content.push(["", ""]);

  // === NEXT STEPS ===
  content.push(["═══════════════════════════════════════════════════════════════", ""]);
  content.push(["🚀 NEXT STEPS", ""]);
  content.push(["═══════════════════════════════════════════════════════════════", ""]);
  content.push(["", ""]);
  content.push(["1. Review Dashboard", "Understand overall performance"]);
  content.push(["2. Check Insights", "Get specific recommendations"]);
  content.push(["3. Prioritize Actions", "Focus on high-impact opportunities"]);
  content.push(["4. Make Changes", "Update content, titles, descriptions"]);
  content.push(["5. Run Report Again", "Compare results after 30-60 days"]);
  content.push(["", ""]);
  content.push(["Remember: SEO is a long-term game. Focus on consistent improvement!", ""]);
  content.push(["", ""]);

  // Write all content
  sheet.getRange(row, 1, content.length, 2).setValues(content);

  // Format section headers (lines with ═══)
  for (let i = 0; i < content.length; i++) {
    const cellValue = content[i][0];
    
    // Section dividers
    if (cellValue.includes("═══")) {
      sheet.getRange(row + i, 1, 1, 2).setBackground("#e8f0fe");
    }
    
    // Main section titles (with emojis)
    if (cellValue.match(/^[📊📑📈🚦🎨💡🔍🔧🚀]/)) {
      sheet.getRange(row + i, 1, 1, 2)
        .setFontWeight("bold")
        .setFontSize(12)
        .setBackground("#d9ead3");
    }
    
    // Subsection titles (Scenario:, Problem:, Action:, etc.)
    if (cellValue.match(/^(Scenario:|Problem:|Action:|Remember:)/)) {
      sheet.getRange(row + i, 1, 1, 2).setFontWeight("bold");
    }
    
    // Status indicators
    if (cellValue.match(/^[🟢🟡🔴⚪]/)) {
      sheet.getRange(row + i, 1, 1, 2).setFontWeight("bold");
    }
  }

  // Column widths
  sheet.setColumnWidth(1, 400);
  sheet.setColumnWidth(2, 600);

  // Freeze header
  sheet.setFrozenRows(3);

  Logger.log("Guide tab created successfully");
}

function formatPct_(value) {
  return (value * 100).toFixed(1) + "%";
}

function formatPctWithSign_(value) {
  const sign = value > 0 ? "+" : "";
  return sign + (value * 100).toFixed(1) + "%";
}

function parseGscData_(sheet) {
  // Parse GSC export data from a sheet
  // Expected format: Page | Clicks | Impressions | CTR | Position
  // Returns Map: URL -> {clicks, impressions, ctr, position}

  const data = sheet.getDataRange().getValues();
  if (data.length < 2) throw new Error(`Sheet "${sheet.getName()}" has no data. Paste your GSC export with headers.`);

  const headers = data[0].map(h => String(h).toLowerCase().trim());

  // Find column indices (flexible to handle different column orders)
  const pageIdx = findColumnIndex_(headers, ['page', 'url', 'page url']);
  const clicksIdx = findColumnIndex_(headers, ['clicks']);
  const impressionsIdx = findColumnIndex_(headers, ['impressions', 'impr']);
  const ctrIdx = findColumnIndex_(headers, ['ctr', 'click-through rate']);
  const positionIdx = findColumnIndex_(headers, ['position', 'avg position', 'average position', 'avg. position']);

  if (pageIdx === -1) throw new Error(`Sheet "${sheet.getName()}" missing "Page" or "URL" column.`);
  if (clicksIdx === -1) throw new Error(`Sheet "${sheet.getName()}" missing "Clicks" column.`);
  if (impressionsIdx === -1) throw new Error(`Sheet "${sheet.getName()}" missing "Impressions" column.`);

  const result = new Map();

  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const url = String(row[pageIdx]).trim();

    if (!url) continue; // Skip empty rows

    const clicks = Number(row[clicksIdx]) || 0;
    const impressions = Number(row[impressionsIdx]) || 0;

    // CTR might be formatted as percentage (0.0269) or string ("2.69%")
    let ctr = 0;
    if (ctrIdx !== -1) {
      const ctrValue = row[ctrIdx];
      if (typeof ctrValue === 'number') {
        ctr = ctrValue;
      } else if (typeof ctrValue === 'string') {
        // Remove % and convert
        ctr = parseFloat(ctrValue.replace('%', '')) / 100;
      }
    } else {
      // Calculate CTR if not provided
      ctr = safeCtr_(clicks, impressions);
    }

    const position = positionIdx !== -1 ? (Number(row[positionIdx]) || 0) : 0;

    result.set(url, {
      clicks,
      impressions,
      ctr,
      position,
    });
  }

  Logger.log(`Parsed ${result.size} URLs from sheet "${sheet.getName()}"`);
  return result;
}

function findColumnIndex_(headers, possibleNames) {
  // Find column index by checking multiple possible header names
  for (let i = 0; i < headers.length; i++) {
    const header = headers[i];
    for (const name of possibleNames) {
      if (header.includes(name)) return i;
    }
  }
  return -1;
}

function extractDateRanges_(currentSheet, previousSheet) {
  // Try to extract date ranges from sheet names or use placeholders
  // Expected format: "GSC Current (2024-01-01 to 2024-03-31)"

  const currentName = currentSheet.getName();
  const previousName = previousSheet.getName();

  const currentDates = extractDatesFromName_(currentName);
  const previousDates = extractDatesFromName_(previousName);

  return {
    current: currentDates || { start: "Current Period Start", end: "Current Period End" },
    previous: previousDates || { start: "Previous Period Start", end: "Previous Period End" },
  };
}

function extractDatesFromName_(sheetName) {
  // Try to extract dates from sheet name like "GSC Current (2024-01-01 to 2024-03-31)"
  const match = sheetName.match(/(\d{4}-\d{2}-\d{2})\s+to\s+(\d{4}-\d{2}-\d{2})/i);
  if (match) {
    return { start: match[1], end: match[2] };
  }
  return null;
}

function applyColorCoding_(sheet, startRow, startCol, numRows, numCols, inverse = false) {
  // Apply conditional formatting: green for positive, red for negative, yellow for near-zero
  // inverse = true for metrics where decrease is good (like position)
  const range = sheet.getRange(startRow, startCol, numRows, numCols);

  // Get existing rules (don't try to filter - just add new rules)
  const rules = sheet.getConditionalFormatRules();

  if (inverse) {
    // For position: decrease (negative) is good, increase (positive) is bad
    // Green: < -5% (position improved, went down)
    const greenRule = SpreadsheetApp.newConditionalFormatRule()
      .whenNumberLessThan(-0.05)
      .setBackground("#d9ead3")
      .setFontColor("#274e13")
      .setRanges([range])
      .build();

    // Red: > 5% (position worsened, went up)
    const redRule = SpreadsheetApp.newConditionalFormatRule()
      .whenNumberGreaterThan(0.05)
      .setBackground("#f4cccc")
      .setFontColor("#990000")
      .setRanges([range])
      .build();

    // Yellow: between -5% and 5%
    const yellowRule = SpreadsheetApp.newConditionalFormatRule()
      .whenNumberBetween(-0.05, 0.05)
      .setBackground("#fff2cc")
      .setFontColor("#7f6000")
      .setRanges([range])
      .build();

    rules.push(greenRule, redRule, yellowRule);
  } else {
    // Normal: increase (positive) is good, decrease (negative) is bad
    // Green: > 5%
    const greenRule = SpreadsheetApp.newConditionalFormatRule()
      .whenNumberGreaterThan(0.05)
      .setBackground("#d9ead3")
      .setFontColor("#274e13")
      .setRanges([range])
      .build();

    // Red: < -5%
    const redRule = SpreadsheetApp.newConditionalFormatRule()
      .whenNumberLessThan(-0.05)
      .setBackground("#f4cccc")
      .setFontColor("#990000")
      .setRanges([range])
      .build();

    // Yellow: between -5% and 5%
    const yellowRule = SpreadsheetApp.newConditionalFormatRule()
      .whenNumberBetween(-0.05, 0.05)
      .setBackground("#fff2cc")
      .setFontColor("#7f6000")
      .setRanges([range])
      .build();

    rules.push(greenRule, redRule, yellowRule);
  }

  sheet.setConditionalFormatRules(rules);
}

function applyPositionColorCoding_(sheet, startRow, startCol, numRows, numCols) {
  // Apply color coding for raw position changes (not percentages)
  // For position: negative change is good (moved up in rankings)
  const range = sheet.getRange(startRow, startCol, numRows, numCols);

  // Get existing rules (don't try to filter - just add new rules)
  const rules = sheet.getConditionalFormatRules();

  // Green: position improved by more than 1 (negative change)
  const greenRule = SpreadsheetApp.newConditionalFormatRule()
    .whenNumberLessThan(-1)
    .setBackground("#d9ead3")
    .setFontColor("#274e13")
    .setRanges([range])
    .build();

  // Red: position worsened by more than 1 (positive change)
  const redRule = SpreadsheetApp.newConditionalFormatRule()
    .whenNumberGreaterThan(1)
    .setBackground("#f4cccc")
    .setFontColor("#990000")
    .setRanges([range])
    .build();

  // Yellow: position change between -1 and 1 (minimal change)
  const yellowRule = SpreadsheetApp.newConditionalFormatRule()
    .whenNumberBetween(-1, 1)
    .setBackground("#fff2cc")
    .setFontColor("#7f6000")
    .setRanges([range])
    .build();

  rules.push(greenRule, redRule, yellowRule);
  sheet.setConditionalFormatRules(rules);
}

function writeUrlReport_(ss, rows, current, previous) {
  const sheet = getOrCreateSheet_(ss, "Report");

  // Clear everything to avoid merge conflicts
  sheet.clear(); // Clear all content, formatting, and data validation
  sheet.clearConditionalFormatRules(); // Clear all conditional formatting
  sheet.setFrozenRows(0);
  sheet.setFrozenColumns(0);

  // === SUMMARY STATS (row 1 - no merged cells to avoid filter conflicts) ===
  let currentRow = 1;

  // Calculate summary stats
  const totalClicks = rows.reduce((sum, r) => sum + r[5], 0);
  const totalImpr = rows.reduce((sum, r) => sum + r[10], 0);
  const avgCtr = totalImpr > 0 ? totalClicks / totalImpr : 0;
  const avgHealthScore = rows.reduce((sum, r) => sum + r[4], 0) / rows.length;

  // Simple stats row (no merged cells)
  sheet.getRange(currentRow, 1).setValue("Total Clicks:");
  sheet.getRange(currentRow, 2).setValue(totalClicks).setNumberFormat("#,##0").setFontWeight("bold");
  sheet.getRange(currentRow, 3).setValue("Total Impressions:");
  sheet.getRange(currentRow, 4).setValue(totalImpr).setNumberFormat("#,##0").setFontWeight("bold");
  sheet.getRange(currentRow, 5).setValue("Avg CTR:");
  sheet.getRange(currentRow, 6).setValue(avgCtr).setNumberFormat("0.00%").setFontWeight("bold");
  sheet.getRange(currentRow, 7).setValue("Avg Health Score:");
  sheet.getRange(currentRow, 8).setValue(avgHealthScore).setNumberFormat("0").setFontWeight("bold");
  sheet.getRange(currentRow, 1, 1, 8).setBackground("#f8f9fa");
  currentRow++;

  // === SMART FILTERS SECTION ===
  sheet.getRange(currentRow, 1).setValue("🔍 Quick Filters: Use column filters below →  🟢 Strong  |  🔴 Declining  |  Health Score >70  |  Position 4-10");
  sheet.getRange(currentRow, 1).setBackground("#fff3cd").setFontWeight("bold").setFontSize(10);
  currentRow++;

  // === DATA TABLE (starting row 6) ===
  const dataStartRow = currentRow + 1;

  const headers = [
    "URL",
    "Display Name",
    "Section",
    "Status",
    "Health Score",
    "Clicks (cur)",
    "Clicks (prev)",
    "Δ",
    "%Δ",
    "Trend",
    "Impr (cur)",
    "Impr (prev)",
    "Δ",
    "%Δ",
    "Trend",
    "CTR (cur)",
    "CTR (prev)",
    "Δ",
    "Trend",
    "Pos (cur)",
    "Pos (prev)",
    "Δ",
    "Trend",
    "Period Start (cur)",
    "Period End (cur)",
    "Period Start (prev)",
    "Period End (prev)",
  ];

  const headerDescriptions = [
    "Full page URL",
    "Short name",
    "Site section",
    "🟢🟡🔴⚪",
    "0-100 score",
    "Actual clicks",
    "Previous clicks",
    "Change",
    "% change",
    "📈📉➡️",
    "Times shown",
    "Previous shown",
    "Change",
    "% change",
    "📈📉➡️",
    "Click rate %",
    "Previous CTR",
    "Change",
    "📈📉➡️",
    "Avg rank",
    "Previous rank",
    "Change",
    "📈📉➡️",
    "Current start",
    "Current end",
    "Previous start",
    "Previous end",
  ];

  sheet.getRange(currentRow, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(currentRow, 1, 1, headers.length).setFontWeight("bold").setBackground("#4285f4").setFontColor("#ffffff").setWrap(true).setFontSize(11);
  currentRow++;
  
  // Add description row
  sheet.getRange(currentRow, 1, 1, headerDescriptions.length).setValues([headerDescriptions]);
  sheet.getRange(currentRow, 1, 1, headerDescriptions.length).setFontSize(9).setFontColor("#666666").setBackground("#e8f0fe").setWrap(true);

  sheet.getRange(dataStartRow, 1, rows.length, rows[0].length).setValues(rows);
  sheet.setFrozenRows(currentRow); // Freeze headers and description row
  sheet.autoResizeColumns(1, 5);

  // Number formatting
  sheet.getRange(dataStartRow, 5, rows.length, 1).setNumberFormat("0"); // Health Score
  sheet.getRange(dataStartRow, 9, rows.length, 1).setNumberFormat("0.00%"); // Clicks %Δ
  sheet.getRange(dataStartRow, 14, rows.length, 1).setNumberFormat("0.00%"); // Impr %Δ
  sheet.getRange(dataStartRow, 16, rows.length, 3).setNumberFormat("0.00%"); // CTR columns
  sheet.getRange(dataStartRow, 20, rows.length, 3).setNumberFormat("0.00"); // Position columns

  // Apply color coding to delta columns
  applyColorCoding_(sheet, dataStartRow, 9, rows.length, 1); // Clicks %Δ
  applyColorCoding_(sheet, dataStartRow, 14, rows.length, 1); // Impr %Δ
  applyPositionColorCoding_(sheet, dataStartRow, 22, rows.length, 1); // Avg pos Δ

  // Add data bars for clicks and impressions
  addDataBars_(sheet, dataStartRow, 6, rows.length, 1); // Clicks current
  addDataBars_(sheet, dataStartRow, 11, rows.length, 1); // Impressions current

  // Add data bars for CTR
  addDataBars_(sheet, dataStartRow, 16, rows.length, 1, "#34a853"); // CTR current (green)

  // Color code health scores with gradient
  const healthRange = sheet.getRange(dataStartRow, 5, rows.length, 1);
  const healthRules = [
    SpreadsheetApp.newConditionalFormatRule()
      .whenNumberGreaterThanOrEqualTo(80)
      .setBackground("#d9ead3")
      .setFontColor("#274e13")
      .setRanges([healthRange])
      .build(),
    SpreadsheetApp.newConditionalFormatRule()
      .whenNumberBetween(50, 79)
      .setBackground("#fff2cc")
      .setFontColor("#7f6000")
      .setRanges([healthRange])
      .build(),
    SpreadsheetApp.newConditionalFormatRule()
      .whenNumberLessThan(50)
      .setBackground("#f4cccc")
      .setFontColor("#990000")
      .setRanges([healthRange])
      .build()
  ];

  // Add color scale for CTR delta (column 18)
  const ctrDeltaRange = sheet.getRange(dataStartRow, 18, rows.length, 1);
  const ctrDeltaRule = SpreadsheetApp.newConditionalFormatRule()
    .setGradientMaxpointWithValue("#d9ead3", SpreadsheetApp.InterpolationType.NUMBER, "0.01")
    .setGradientMidpointWithValue("#ffffff", SpreadsheetApp.InterpolationType.NUMBER, "0")
    .setGradientMinpointWithValue("#f4cccc", SpreadsheetApp.InterpolationType.NUMBER, "-0.01")
    .setRanges([ctrDeltaRange])
    .build();

  const existingRules = sheet.getConditionalFormatRules();
  sheet.setConditionalFormatRules(existingRules.concat(healthRules).concat([ctrDeltaRule]));

  // Remove existing filter if it exists, then add new filter
  const existingFilter = sheet.getFilter();
  if (existingFilter) {
    existingFilter.remove();
  }
  const lastCol = sheet.getLastColumn();
  sheet.getRange(currentRow, 1, sheet.getLastRow() - currentRow + 1, lastCol).createFilter();

  // Column widths
  sheet.setColumnWidth(2, 200); // Display Name
  sheet.setColumnWidth(3, 150); // Section

  Logger.log("Enhanced report with summary cards and filters created successfully");
}

function addDataBars_(sheet, startRow, startCol, numRows, numCols, color = "#4285f4") {
  // Add data bar visualization using gradients
  // Optional color parameter allows customizing the bar color
  const range = sheet.getRange(startRow, startCol, numRows, numCols);

  const dataBarRule = SpreadsheetApp.newConditionalFormatRule()
    .whenNumberGreaterThan(0)
    .setGradientMaxpointWithValue(color, SpreadsheetApp.InterpolationType.MAX, "")
    .setGradientMinpointWithValue("#ffffff", SpreadsheetApp.InterpolationType.MIN, "0")
    .setRanges([range])
    .build();

  const rules = sheet.getConditionalFormatRules();
  rules.push(dataBarRule);
  sheet.setConditionalFormatRules(rules);
}

function writeSectionReport_(ss, sectionAgg, current, previous) {
  const sheet = getOrCreateSheet_(ss, "Sections");

  // Clear everything to avoid merge conflicts
  sheet.clear();
  sheet.clearConditionalFormatRules();
  sheet.setFrozenRows(0);

  const rows = [];
  const keys = Array.from(sectionAgg.keys()).sort();

  for (const key of keys) {
    const agg = sectionAgg.get(key);

    const curClicks = agg.cur.clicks;
    const prevClicks = agg.prev.clicks;

    const curImpr = agg.cur.impr;
    const prevImpr = agg.prev.impr;

    const curCtr = safeCtr_(curClicks, curImpr);
    const prevCtr = safeCtr_(prevClicks, prevImpr);

    const curPos = curImpr > 0 ? (agg.cur.posImpr / curImpr) : 0;
    const prevPos = prevImpr > 0 ? (agg.prev.posImpr / prevImpr) : 0;

    rows.push([
      key,
      curClicks,
      prevClicks,
      curClicks - prevClicks,
      safePctChange_(curClicks, prevClicks),
      curImpr,
      prevImpr,
      curImpr - prevImpr,
      safePctChange_(curImpr, prevImpr),
      curCtr,
      prevCtr,
      curCtr - prevCtr,
      curPos,
      prevPos,
      curPos - prevPos,
      current.start,
      current.end,
      previous.start,
      previous.end,
    ]);
  }

  const headers = [
    "Section",
    "Clicks (current)",
    "Clicks (previous)",
    "Clicks Δ",
    "Clicks %Δ",
    "Impr (current)",
    "Impr (previous)",
    "Impr Δ",
    "Impr %Δ",
    "CTR (current)",
    "CTR (previous)",
    "CTR Δ",
    "Avg pos (current)",
    "Avg pos (previous)",
    "Avg pos Δ",
    "Start (current)",
    "End (current)",
    "Start (previous)",
    "End (previous)",
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#4285f4").setFontColor("#ffffff");

  if (rows.length) sheet.getRange(2, 1, rows.length, rows[0].length).setValues(rows);
  sheet.setFrozenRows(1);
  sheet.autoResizeColumn(1);

  // Number formatting
  sheet.getRange(2, 5, rows.length, 1).setNumberFormat("0.00%"); // Clicks %Δ
  sheet.getRange(2, 9, rows.length, 1).setNumberFormat("0.00%"); // Impr %Δ
  sheet.getRange(2, 10, rows.length, 3).setNumberFormat("0.00%"); // CTR columns
  sheet.getRange(2, 13, rows.length, 3).setNumberFormat("0.00"); // Position columns

  // Apply color coding
  if (rows.length > 0) {
    applyColorCoding_(sheet, 2, 5, rows.length, 1); // Clicks %Δ
    applyColorCoding_(sheet, 2, 9, rows.length, 1); // Impr %Δ
    applyPositionColorCoding_(sheet, 2, 15, rows.length, 1); // Avg pos Δ (inverse - lower is better)
  }

  Logger.log("Sections with color coding created successfully");
}

function sectionKey_(fullUrl) {
  // Intelligently groups URLs by product/category structure
  // Example: https://developer.../well-architected-framework/secure-systems/secrets/rotate-secrets
  //   -> /well-architected-framework/secure-systems/secrets
  try {
    const u = new URL(fullUrl);
    const parts = u.pathname.split("/").filter(Boolean);

    // For WAF URLs, group by pillar/category/subcategory (3 levels deep)
    if (parts.length >= 3 && parts[0] === "well-architected-framework") {
      // Group by: /well-architected-framework/{pillar}/{category}
      // This creates meaningful groups like:
      // - /well-architected-framework/secure-systems/secrets
      // - /well-architected-framework/secure-systems/data
      return `/${parts[0]}/${parts[1]}/${parts[2]}`;
    }

    // For other URLs, try to intelligently group by first 3 path segments
    // This works well for most documentation structures
    if (parts.length >= 3) {
      return `/${parts[0]}/${parts[1]}/${parts[2]}`;
    } else if (parts.length === 2) {
      return `/${parts[0]}/${parts[1]}`;
    } else if (parts.length === 1) {
      return `/${parts[0]}`;
    }

    return "uncategorized";
  } catch (e) {
    return "uncategorized";
  }
}

function createCharts_(ss, urlRows, sectionAgg) {
  // Create a Charts tab with enhanced visualizations
  const sheet = getOrCreateSheet_(ss, "Charts");

  // Clear existing charts
  const charts = sheet.getCharts();
  charts.forEach(chart => sheet.removeChart(chart));

  // Clear everything to avoid merge conflicts
  sheet.clear();
  sheet.clearConditionalFormatRules();

  // Add title and instructions
  sheet.getRange("A1").setValue("📊 GSC Performance Charts");
  sheet.getRange("A1").setFontSize(16).setFontWeight("bold");
  sheet.getRange("A2").setValue("Visual comparison of current vs previous period performance");
  sheet.getRange("A2").setFontSize(10).setFontColor("#666666");
  
  // Add legend
  sheet.getRange("A3").setValue("💡 Tip: Blue/Green = Current Period | Red/Orange = Previous Period | Look for big gaps to find opportunities");
  sheet.getRange("A3").setFontSize(9).setBackground("#fff3cd").setWrap(true);

  let currentRow = 5;

  // === 1. Top URLs by Clicks (Column Chart) ===
  const topUrlsData = urlRows
    .sort((a, b) => b[5] - a[5]) // Sort by current clicks descending
    .slice(0, 10)
    .map(row => [row[1], row[5], row[6]]); // Display name, current, previous

  sheet.getRange(currentRow, 1).setValue("📈 Top 10 URLs by Clicks");
  sheet.getRange(currentRow, 1).setFontWeight("bold").setFontSize(12).setBackground("#e8f0fe");
  sheet.getRange(currentRow, 2).setValue("(Pages driving the most traffic)");
  sheet.getRange(currentRow, 2).setFontSize(9).setFontColor("#666666").setFontStyle("italic");
  sheet.getRange(currentRow + 1, 1, 1, 3).setValues([["URL", "Current Period", "Previous Period"]]);
  sheet.getRange(currentRow + 1, 1, 1, 3).setFontWeight("bold").setBackground("#f3f3f3");

  if (topUrlsData.length > 0) {
    sheet.getRange(currentRow + 2, 1, topUrlsData.length, 3).setValues(topUrlsData);

    const topUrlsChart = sheet.newChart()
      .setChartType(Charts.ChartType.COLUMN)
      .addRange(sheet.getRange(currentRow + 1, 1, topUrlsData.length + 1, 3))
      .setPosition(currentRow, 5, 0, 0)
      .setOption('title', 'Top 10 URLs: Clicks Comparison')
      .setOption('width', 800)
      .setOption('height', 400)
      .setOption('legend', {position: 'bottom'})
      .setOption('hAxis', {title: 'URL', slantedText: true, slantedTextAngle: 45})
      .setOption('vAxis', {title: 'Clicks'})
      .setOption('colors', ['#4285f4', '#ea4335'])
      .build();

    sheet.insertChart(topUrlsChart);
  }

  currentRow += topUrlsData.length + 6;

  // === 2. Top URLs by Impressions (Column Chart) ===
  const topImprData = urlRows
    .sort((a, b) => b[10] - a[10]) // Sort by current impressions descending
    .slice(0, 10)
    .map(row => [row[1], row[10], row[11]]); // Display name, current, previous

  sheet.getRange(currentRow, 1).setValue("👁️ Top 10 URLs by Impressions");
  sheet.getRange(currentRow, 1).setFontWeight("bold").setFontSize(12).setBackground("#e8f0fe");
  sheet.getRange(currentRow, 2).setValue("(Pages with highest visibility in search)");
  sheet.getRange(currentRow, 2).setFontSize(9).setFontColor("#666666").setFontStyle("italic");
  sheet.getRange(currentRow + 1, 1, 1, 3).setValues([["URL", "Current Period", "Previous Period"]]);
  sheet.getRange(currentRow + 1, 1, 1, 3).setFontWeight("bold").setBackground("#f3f3f3");

  if (topImprData.length > 0) {
    sheet.getRange(currentRow + 2, 1, topImprData.length, 3).setValues(topImprData);

    const topImprChart = sheet.newChart()
      .setChartType(Charts.ChartType.COLUMN)
      .addRange(sheet.getRange(currentRow + 1, 1, topImprData.length + 1, 3))
      .setPosition(currentRow, 5, 0, 0)
      .setOption('title', 'Top 10 URLs: Impressions Comparison')
      .setOption('width', 800)
      .setOption('height', 400)
      .setOption('legend', {position: 'bottom'})
      .setOption('hAxis', {title: 'URL', slantedText: true, slantedTextAngle: 45})
      .setOption('vAxis', {title: 'Impressions'})
      .setOption('colors', ['#34a853', '#fbbc04'])
      .build();

    sheet.insertChart(topImprChart);
  }

  currentRow += topImprData.length + 6;

  // === 3. CTR vs Position Scatter Plot ===
  const scatterData = urlRows
    .filter(row => row[19] > 0 && row[15] > 0) // Has position and CTR
    .map(row => [row[1], row[19], row[15] * 100, row[5]]); // Display name, position, CTR%, clicks

  sheet.getRange(currentRow, 1).setValue("🎯 CTR vs Position Analysis");
  sheet.getRange(currentRow, 1).setFontWeight("bold").setFontSize(12).setBackground("#e8f0fe");
  sheet.getRange(currentRow, 2).setValue("(Better position should = higher CTR)");
  sheet.getRange(currentRow, 2).setFontSize(9).setFontColor("#666666").setFontStyle("italic");
  sheet.getRange(currentRow + 1, 1, 1, 4).setValues([["URL", "Position", "CTR %", "Clicks"]]);
  sheet.getRange(currentRow + 1, 1, 1, 4).setFontWeight("bold").setBackground("#f3f3f3");

  if (scatterData.length > 0) {
    sheet.getRange(currentRow + 2, 1, scatterData.length, 4).setValues(scatterData);

    const scatterChart = sheet.newChart()
      .setChartType(Charts.ChartType.SCATTER)
      .addRange(sheet.getRange(currentRow + 1, 2, scatterData.length + 1, 2))
      .setPosition(currentRow, 6, 0, 0)
      .setOption('title', 'CTR vs Position (Current Period)')
      .setOption('width', 800)
      .setOption('height', 400)
      .setOption('hAxis', {title: 'Average Position', direction: -1}) // Reverse axis (1 is best)
      .setOption('vAxis', {title: 'CTR %'})
      .setOption('pointSize', 5)
      .setOption('colors', ['#34a853'])
      .setOption('trendlines', {0: {type: 'linear', color: '#ea4335', lineWidth: 2, opacity: 0.3}})
      .build();

    sheet.insertChart(scatterChart);
  }

  currentRow += Math.min(scatterData.length, 20) + 6;

  // === 4. Performance Changes - Clicks (Bar Chart) ===
  const deltaClicksData = urlRows
    .map(row => [row[1], row[7]]) // Display name, clicks delta
    .sort((a, b) => Math.abs(b[1]) - Math.abs(a[1])) // Sort by absolute delta
    .slice(0, 15);

  sheet.getRange(currentRow, 1).setValue("📊 Biggest Changes in Clicks (Top 15)");
  sheet.getRange(currentRow, 1).setFontWeight("bold").setFontSize(12).setBackground("#e8f0fe");
  sheet.getRange(currentRow, 2).setValue("(Positive = gaining traffic, Negative = losing traffic)");
  sheet.getRange(currentRow, 2).setFontSize(9).setFontColor("#666666").setFontStyle("italic");
  sheet.getRange(currentRow + 1, 1, 1, 2).setValues([["URL", "Change in Clicks"]]);
  sheet.getRange(currentRow + 1, 1, 1, 2).setFontWeight("bold").setBackground("#f3f3f3");

  if (deltaClicksData.length > 0) {
    sheet.getRange(currentRow + 2, 1, deltaClicksData.length, 2).setValues(deltaClicksData);

    const deltaClicksChart = sheet.newChart()
      .setChartType(Charts.ChartType.BAR)
      .addRange(sheet.getRange(currentRow + 1, 1, deltaClicksData.length + 1, 2))
      .setPosition(currentRow, 4, 0, 0)
      .setOption('title', 'Biggest Changes in Clicks')
      .setOption('width', 800)
      .setOption('height', Math.max(400, deltaClicksData.length * 30))
      .setOption('legend', {position: 'none'})
      .setOption('hAxis', {title: 'Change in Clicks'})
      .setOption('vAxis', {title: 'URL'})
      .setOption('colors', ['#4285f4'])
      .build();

    sheet.insertChart(deltaClicksChart);
  }

  currentRow += deltaClicksData.length + 6;

  // === 5. Performance Changes - Impressions (Bar Chart) ===
  const deltaImprData = urlRows
    .map(row => [row[1], row[11]]) // Display name, impressions delta
    .sort((a, b) => Math.abs(b[1]) - Math.abs(a[1])) // Sort by absolute delta
    .slice(0, 15);

  sheet.getRange(currentRow, 1).setValue("📊 Biggest Changes in Impressions (Top 15)");
  sheet.getRange(currentRow, 1).setFontWeight("bold").setFontSize(12).setBackground("#e8f0fe");
  sheet.getRange(currentRow, 2).setValue("(Positive = gaining visibility, Negative = losing visibility)");
  sheet.getRange(currentRow, 2).setFontSize(9).setFontColor("#666666").setFontStyle("italic");
  sheet.getRange(currentRow + 1, 1, 1, 2).setValues([["URL", "Change in Impressions"]]);
  sheet.getRange(currentRow + 1, 1, 1, 2).setFontWeight("bold").setBackground("#f3f3f3");

  if (deltaImprData.length > 0) {
    sheet.getRange(currentRow + 2, 1, deltaImprData.length, 2).setValues(deltaImprData);

    const deltaImprChart = sheet.newChart()
      .setChartType(Charts.ChartType.BAR)
      .addRange(sheet.getRange(currentRow + 1, 1, deltaImprData.length + 1, 2))
      .setPosition(currentRow, 4, 0, 0)
      .setOption('title', 'Biggest Changes in Impressions')
      .setOption('width', 800)
      .setOption('height', Math.max(400, deltaImprData.length * 30))
      .setOption('legend', {position: 'none'})
      .setOption('hAxis', {title: 'Change in Impressions'})
      .setOption('vAxis', {title: 'URL'})
      .setOption('colors', ['#34a853'])
      .build();

    sheet.insertChart(deltaImprChart);
  }

  currentRow += deltaImprData.length + 6;

  // === 6. Section Performance - Clicks (Column Chart) ===
  const sectionClicksData = Array.from(sectionAgg.entries())
    .map(([key, agg]) => [key, agg.cur.clicks, agg.prev.clicks])
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  sheet.getRange(currentRow, 1).setValue("📁 Section Performance: Clicks Comparison");
  sheet.getRange(currentRow, 1).setFontWeight("bold").setFontSize(12).setBackground("#e8f0fe");
  sheet.getRange(currentRow, 2).setValue("(Which site sections are performing best)");
  sheet.getRange(currentRow, 2).setFontSize(9).setFontColor("#666666").setFontStyle("italic");
  sheet.getRange(currentRow + 1, 1, 1, 3).setValues([["Section", "Current Period", "Previous Period"]]);
  sheet.getRange(currentRow + 1, 1, 1, 3).setFontWeight("bold").setBackground("#f3f3f3");

  if (sectionClicksData.length > 0) {
    sheet.getRange(currentRow + 2, 1, sectionClicksData.length, 3).setValues(sectionClicksData);

    const sectionClicksChart = sheet.newChart()
      .setChartType(Charts.ChartType.COLUMN)
      .addRange(sheet.getRange(currentRow + 1, 1, sectionClicksData.length + 1, 3))
      .setPosition(currentRow, 5, 0, 0)
      .setOption('title', 'Clicks by Section')
      .setOption('width', 800)
      .setOption('height', 400)
      .setOption('isStacked', false)
      .setOption('legend', {position: 'bottom'})
      .setOption('hAxis', {title: 'Section', slantedText: true, slantedTextAngle: 45})
      .setOption('vAxis', {title: 'Clicks'})
      .setOption('colors', ['#4285f4', '#ea4335'])
      .build();

    sheet.insertChart(sectionClicksChart);
  }

  currentRow += sectionClicksData.length + 6;

  // === 7. Section Performance - Impressions (Column Chart) ===
  const sectionImprData = Array.from(sectionAgg.entries())
    .map(([key, agg]) => [key, agg.cur.impr, agg.prev.impr])
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  sheet.getRange(currentRow, 1).setValue("📁 Section Performance: Impressions Comparison");
  sheet.getRange(currentRow, 1).setFontWeight("bold").setFontSize(12).setBackground("#e8f0fe");
  sheet.getRange(currentRow, 2).setValue("(Which sections have highest search visibility)");
  sheet.getRange(currentRow, 2).setFontSize(9).setFontColor("#666666").setFontStyle("italic");
  sheet.getRange(currentRow + 1, 1, 1, 3).setValues([["Section", "Current Period", "Previous Period"]]);
  sheet.getRange(currentRow + 1, 1, 1, 3).setFontWeight("bold").setBackground("#f3f3f3");

  if (sectionImprData.length > 0) {
    sheet.getRange(currentRow + 2, 1, sectionImprData.length, 3).setValues(sectionImprData);

    const sectionImprChart = sheet.newChart()
      .setChartType(Charts.ChartType.COLUMN)
      .addRange(sheet.getRange(currentRow + 1, 1, sectionImprData.length + 1, 3))
      .setPosition(currentRow, 5, 0, 0)
      .setOption('title', 'Impressions by Section')
      .setOption('width', 800)
      .setOption('height', 400)
      .setOption('isStacked', false)
      .setOption('legend', {position: 'bottom'})
      .setOption('hAxis', {title: 'Section', slantedText: true, slantedTextAngle: 45})
      .setOption('vAxis', {title: 'Impressions'})
      .setOption('colors', ['#34a853', '#fbbc04'])
      .build();

    sheet.insertChart(sectionImprChart);
  }

  // Auto-resize columns
  sheet.autoResizeColumns(1, 5);

  Logger.log("Enhanced charts created successfully");
}

function generateExportReport() {
  // Creates a professional, PDF-ready summary report
  const ss = SpreadsheetApp.getActive();
  const dashboardSheet = ss.getSheetByName("Dashboard");
  const insightsSheet = ss.getSheetByName("Insights");
  const reportSheet = ss.getSheetByName("Report");

  if (!dashboardSheet || !insightsSheet) {
    SpreadsheetApp.getUi().alert('Please run runGscSeoReportManual() first to generate the main report.');
    return;
  }

  const sheet = getOrCreateSheet_(ss, "Export Summary");

  // Clear everything to avoid merge conflicts
  sheet.clear();
  sheet.clearConditionalFormatRules();

  // Get date ranges from dashboard
  const dashboardData = dashboardSheet.getDataRange().getValues();
  let dateRangeText = "";
  if (dashboardData.length > 1 && dashboardData[1][0]) {
    dateRangeText = String(dashboardData[1][0]);
  }

  // === HEADER ===
  sheet.getRange("A1").setValue("SEO Performance Report");
  sheet.getRange("A1").setFontSize(20).setFontWeight("bold");
  sheet.getRange("A1:F1").merge();

  sheet.getRange("A2").setValue(dateRangeText || "Period Comparison Report");
  sheet.getRange("A2").setFontSize(11).setFontColor("#666666");
  sheet.getRange("A2:F2").merge();

  sheet.getRange("A3").setValue("Generated: " + Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "MMMM dd, yyyy 'at' h:mm a"));
  sheet.getRange("A3").setFontSize(9).setFontColor("#999999");
  sheet.getRange("A3:F3").merge();

  let currentRow = 5;

  // === EXECUTIVE SUMMARY ===
  sheet.getRange(currentRow, 1).setValue("Executive Summary");
  sheet.getRange(currentRow, 1).setFontSize(14).setFontWeight("bold").setBackground("#4285f4").setFontColor("#ffffff");
  sheet.getRange(currentRow, 1, 1, 6).merge();
  currentRow++;

  // Get key metrics from dashboard
  const metricsStartRow = findRowContaining_(dashboardData, "Key Metrics");
  if (metricsStartRow !== -1) {
    // Copy metrics table (header + 4 data rows)
    const metricsData = dashboardData.slice(metricsStartRow + 1, metricsStartRow + 6);
    sheet.getRange(currentRow, 1, metricsData.length, Math.min(metricsData[0].length, 5)).setValues(
      metricsData.map(row => row.slice(0, 5))
    );

    // Format header row
    sheet.getRange(currentRow, 1, 1, 5).setFontWeight("bold").setBackground("#f3f3f3");

    // Format numbers
    sheet.getRange(currentRow + 1, 5, 4, 1).setNumberFormat("0.00%");
    sheet.getRange(currentRow + 1, 4, 4, 1).setNumberFormat("#,##0");

    // Apply color coding to % change
    applyColorCoding_(sheet, currentRow + 1, 5, 3, 1);
    applyColorCoding_(sheet, currentRow + 4, 5, 1, 1, true); // Position (inverse)

    currentRow += metricsData.length + 1;
  }

  // === KEY INSIGHTS ===
  sheet.getRange(currentRow, 1).setValue("Key Insights");
  sheet.getRange(currentRow, 1).setFontSize(14).setFontWeight("bold").setBackground("#34a853").setFontColor("#ffffff");
  sheet.getRange(currentRow, 1, 1, 6).merge();
  currentRow++;

  // Get top insights from Insights sheet
  const insightsData = insightsSheet.getDataRange().getValues();
  const insightSections = [
    "📈 Overall Performance",
    "🏆 Top Gainer",
    "⚠️ Needs Attention",
    "💡 Opportunities"
  ];

  for (const sectionName of insightSections) {
    const sectionRow = findRowContaining_(insightsData, sectionName);
    if (sectionRow !== -1) {
      // Copy section header
      sheet.getRange(currentRow, 1).setValue(insightsData[sectionRow][0]);
      sheet.getRange(currentRow, 1).setFontWeight("bold").setFontSize(11);
      sheet.getRange(currentRow, 1, 1, 6).merge();
      currentRow++;

      // Copy insights (next 2-4 rows)
      for (let i = 1; i <= 4; i++) {
        if (sectionRow + i < insightsData.length && insightsData[sectionRow + i][1]) {
          sheet.getRange(currentRow, 1).setValue(insightsData[sectionRow + i][1]);
          sheet.getRange(currentRow, 1, 1, 6).merge().setWrap(true);
          currentRow++;
        } else {
          break;
        }
      }
      currentRow++;
    }
  }

  // === TOP PERFORMERS ===
  sheet.getRange(currentRow, 1).setValue("Top Performers");
  sheet.getRange(currentRow, 1).setFontSize(14).setFontWeight("bold").setBackground("#fbbc04").setFontColor("#ffffff");
  sheet.getRange(currentRow, 1, 1, 6).merge();
  currentRow++;

  const gainersRow = findRowContaining_(dashboardData, "Top 3 Gainers");
  if (gainersRow !== -1) {
    sheet.getRange(currentRow, 1).setValue("🏆 Top 3 Gainers (by Clicks)");
    sheet.getRange(currentRow, 1).setFontWeight("bold").setFontSize(11);
    sheet.getRange(currentRow, 1, 1, 6).merge();
    currentRow++;

    // Copy header + data (4 rows total, now with 9 columns for impressions)
    const gainersData = dashboardData.slice(gainersRow + 1, gainersRow + 5);
    const numCols = Math.min(gainersData[0].length, 9); // Increased from 5 to 9
    sheet.getRange(currentRow, 1, gainersData.length, numCols).setValues(
      gainersData.map(row => row.slice(0, numCols))
    );

    // Format
    sheet.getRange(currentRow, 1, 1, numCols).setFontWeight("bold").setBackground("#d9ead3");
    sheet.getRange(currentRow + 1, 5, 3, 1).setNumberFormat("0.00%"); // Clicks %
    sheet.getRange(currentRow + 1, 9, 3, 1).setNumberFormat("0.00%"); // Impressions %

    currentRow += gainersData.length + 1;
  }

  // === ATTENTION NEEDED ===
  sheet.getRange(currentRow, 1).setValue("Needs Attention");
  sheet.getRange(currentRow, 1).setFontSize(14).setFontWeight("bold").setBackground("#ea4335").setFontColor("#ffffff");
  sheet.getRange(currentRow, 1, 1, 6).merge();
  currentRow++;

  const declinersRow = findRowContaining_(dashboardData, "Top 3 Decliners");
  if (declinersRow !== -1) {
    sheet.getRange(currentRow, 1).setValue("⚠️ Top 3 Decliners (by Clicks)");
    sheet.getRange(currentRow, 1).setFontWeight("bold").setFontSize(11);
    sheet.getRange(currentRow, 1, 1, 6).merge();
    currentRow++;

    // Copy header + data (4 rows total, now with 9 columns for impressions)
    const declinersData = dashboardData.slice(declinersRow + 1, declinersRow + 5);
    const numCols = Math.min(declinersData[0].length, 9); // Increased from 5 to 9
    sheet.getRange(currentRow, 1, declinersData.length, numCols).setValues(
      declinersData.map(row => row.slice(0, numCols))
    );

    // Format
    sheet.getRange(currentRow, 1, 1, numCols).setFontWeight("bold").setBackground("#f4cccc");
    sheet.getRange(currentRow + 1, 5, 3, 1).setNumberFormat("0.00%"); // Clicks %
    sheet.getRange(currentRow + 1, 9, 3, 1).setNumberFormat("0.00%"); // Impressions %

    currentRow += declinersData.length + 1;
  }

  // === SECTION PERFORMANCE ===
  sheet.getRange(currentRow, 1).setValue("Performance by Section");
  sheet.getRange(currentRow, 1).setFontSize(14).setFontWeight("bold").setBackground("#9c27b0").setFontColor("#ffffff");
  sheet.getRange(currentRow, 1, 1, 6).merge();
  currentRow++;

  const sectionRow = findRowContaining_(dashboardData, "Section Performance Summary");
  if (sectionRow !== -1) {
    // Copy header + data (up to 6 rows)
    const sectionData = dashboardData.slice(sectionRow + 1, sectionRow + 7);
    sheet.getRange(currentRow, 1, sectionData.length, Math.min(sectionData[0].length, 5)).setValues(
      sectionData.map(row => row.slice(0, 5))
    );

    // Format
    sheet.getRange(currentRow, 1, 1, 5).setFontWeight("bold").setBackground("#f3f3f3");
    sheet.getRange(currentRow + 1, 5, sectionData.length - 1, 1).setNumberFormat("0.00%");
    applyColorCoding_(sheet, currentRow + 1, 5, sectionData.length - 1, 1);

    currentRow += sectionData.length + 1;
  }

  // === FOOTER ===
  currentRow++;
  sheet.getRange(currentRow, 1).setValue("For detailed analysis, see the Report, Charts, and Insights tabs in the full spreadsheet.");
  sheet.getRange(currentRow, 1).setFontSize(9).setFontStyle("italic").setFontColor("#666666");
  sheet.getRange(currentRow, 1, 1, 6).merge().setWrap(true);

  // Set column widths for optimal PDF layout
  sheet.setColumnWidth(1, 280); // URL/Section names
  sheet.setColumnWidth(2, 100); // Current
  sheet.setColumnWidth(3, 100); // Previous
  sheet.setColumnWidth(4, 80);  // Change
  sheet.setColumnWidth(5, 80);  // % Change
  sheet.setColumnWidth(6, 50);  // Extra space

  // Set print area for PDF export
  sheet.setRowHeights(1, 3, 25); // Header rows

  SpreadsheetApp.getUi().alert(
    '✅ Export Summary Created!\n\n' +
    'The "Export Summary" tab is ready for PDF export.\n\n' +
    'To export:\n' +
    '1. Go to File → Download → PDF document\n' +
    '2. Select "Current sheet" (Export Summary)\n' +
    '3. Choose "Landscape" orientation\n' +
    '4. Set scale to "Fit to width"\n' +
    '5. Click Export\n\n' +
    'This creates a professional, single-page PDF report.'
  );

  Logger.log("Enhanced export report generated successfully");
}

function findRowContaining_(data, searchText) {
  // Helper function to find a row that contains specific text
  for (let i = 0; i < data.length; i++) {
    if (data[i][0] && data[i][0].toString().includes(searchText)) {
      return i;
    }
  }
  return -1;
}

function emptyAgg_() {
  return {
    cur: { clicks: 0, impr: 0, posImpr: 0 },
    prev: { clicks: 0, impr: 0, posImpr: 0 },
  };
}

function safeCtr_(clicks, impressions) {
  return impressions > 0 ? (clicks / impressions) : 0;
}

function safePctChange_(current, previous) {
  if (previous === 0) return current === 0 ? 0 : 1;
  return (current - previous) / previous;
}

function getOrCreateSheet_(ss, name) {
  return ss.getSheetByName(name) || ss.insertSheet(name);
}

function clamp_(n, min, max) {
  return Math.max(min, Math.min(max, n));
}
