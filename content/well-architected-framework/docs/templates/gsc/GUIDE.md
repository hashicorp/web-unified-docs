# GSC SEO Report Script — Usage Guide

This guide explains how to run `script-manual-upload.js` in Google Sheets to generate a WAF pillar SEO report from Google Search Console data.

## What it does

The script compares two 3-month periods of GSC data and produces a multi-tab report with:

- **Executive Summary** — key metrics overview
- **Pillar Analysis** — performance grouped by WAF pillar
- **Page Details** — per-URL breakdown with status indicators
- **Charts** — visual click/impression comparisons
- **Action Items** — specific recommendations by category
- **Deprecated** — URLs present in the previous period but not the current one
- **About** — quick reference inside the sheet

Tracked pillars: Define and Automate Processes, Secure Systems, Optimize Systems, Design Resilient Systems, Implementation Resources (IR).

URLs under deprecated pillar slugs (`operational-excellence`, `security`, `reliability`) are excluded from analysis automatically.

---

## Add the script

1. Open your Google Sheet and go to **Extensions → Apps Script**.
1. Delete any existing code in the editor.
1. Copy the entire contents of `script-manual-upload.js` and paste it in.
1. Click **Save** (floppy disk icon or Ctrl+S).

---

## Export data from GSC

1. In [Google Search Console](https://search.google.com/search-console), go to **Performance → Search results**.
1. Set the date range to your **recent 3-month period**.
1. Click the **Pages** tab in the table below the graph.
1. Click **Export → Download CSV**. GSC downloads a ZIP file — open it and use the **Pages** CSV (the one with a row per URL).
1. Paste the CSV into a sheet tab named exactly `GSC Recent 3mo` with headers in row 1.
1. Repeat steps 2–5 for the **previous 3-month period**, pasting into a tab named `GSC Previous 3mo`.

The Pages CSV contains the following columns: Page, Clicks, Impressions, CTR, Position.

---

## Run the report

1. In the Apps Script editor, select `runGscSeoReportManual` from the function dropdown.
1. Click **Run**.
1. Approve any permission prompts on first run.
1. Report tabs appear automatically when complete.

---

## Utility functions

| Function | Purpose |
|---|---|
| `runGscSeoReportManual` | Generates the full report |
| `testVersion` | Confirms which script version is installed |
| `validateDataCalculations` | Spot-checks URL calculations and pillar aggregations; output appears in **View → Logs** |

---

## Troubleshooting

**"Missing sheet" error** — Tab names are case-sensitive. The script requires tabs named exactly `GSC Recent 3mo` and `GSC Previous 3mo`.

**"No active URLs found" error** — Check that the `GSC Recent 3mo` tab has content and that row 1 contains headers.

**Report tabs not updating** — The script deletes and recreates all report tabs on each run. If tabs appear stale, re-run `runGscSeoReportManual`.

**Unexpected pillar assignments** — URLs are assigned to pillars based on their path segment after `/well-architected-framework/`. A URL that does not match a known pillar slug is assigned to "Other".

**Validation questions** — Run `validateDataCalculations` and check **View → Logs** for a breakdown of sample URL calculations and pillar totals.
