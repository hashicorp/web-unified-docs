# Google Search Console Manual Upload Script

Export GSC data to CSV, paste into Google Sheets, and generate comprehensive SEO reports with insights and action items.

## Quick Start

### 1. Export GSC Data

1. Go to [Google Search Console](https://search.google.com/search-console) → Performance → Pages
2. Set date range (e.g., last 90 days) → Export CSV
3. Repeat for previous period (e.g., previous 90 days)

### 2. Setup Google Sheet

Create a Google Sheet with these tabs:

**URLs** - Your tracked URLs
- Column A: Full URL (e.g., `https://developer.hashicorp.com/well-architected-framework/...`)
- Column B (optional): Short name for charts (e.g., "Rotate Secrets")

**GSC Current** - Paste current period export

**GSC Previous** - Paste previous period export

### 3. Run Script

1. Extensions → Apps Script
2. Paste the script from `script-manual-upload.js`
3. Save and run `runGscSeoReportManual`

## What You Get

### 📊 Dashboard
- Visual summary cards with trend arrows
- Top gainers and decliners
- Overall health score

### 📄 Report
- Every URL with health score (0-100)
- Status indicators: 🟢 Strong, 🟡 Mixed, 🔴 Declining, ⚪ New
- Trend arrows for each metric
- Filterable columns

### 🔍 Insights
- Auto-generated findings
- **Action items** with priorities (🔴 HIGH, 🟡 MEDIUM)
  - CTR optimization opportunities
  - Position improvement targets
  - Declining URLs to investigate
  - Content consolidation suggestions

### 📊 Charts
- Top URLs comparison
- CTR vs Position scatter plot
- Performance changes
- Section rollups

## Key Features

**💯 Health Score** - 0-100 score based on clicks (40%), CTR (25%), position (20%), impressions (15%)

**🎯 Action Items** - Prioritized to-do list with specific recommendations and impact estimates

**📊 Trend Indicators** - Visual arrows showing direction: 📈↗️→↘️📉

**🎨 Color Coding** - Green (good), Yellow (stable), Red (needs attention)

## Quick Workflow

1. Export GSC data for both periods → Paste into sheets
2. Run script
3. Check Dashboard (30 seconds overview)
4. Read Insights → Action Items (your to-do list)
5. Filter Report by Health Score or Status to investigate
6. Work through action items

## Export to PDF

Run `generateExportReport()` then File → Download → PDF for a one-page summary report.

## Tips

**Filter URLs needing attention:**
- Health Score <50
- Status = 🔴

**Find opportunities:**
- Position 4-10 (close to page 1)
- High impressions + Low CTR

**Track progress:**
- Re-run weekly/monthly
- Compare health scores over time

## Color Coding

**For Clicks, Impressions, CTR:**
- Green: >5% increase
- Yellow: Stable (±5%)
- Red: >5% decrease

**For Position (lower is better):**
- Green: Improved (went down >1 spot)
- Yellow: Stable (±1 spot)
- Red: Declined (went up >1 spot)

## Troubleshooting

**"Missing sheet" error** - Ensure sheets named exactly: "URLs", "GSC Current", "GSC Previous"

**Wrong URLs in report** - Check that URLs in "URLs" sheet match GSC export exactly

**Date ranges show placeholders** - Add dates to sheet names: `GSC Current (2024-01-01 to 2024-03-31)`
