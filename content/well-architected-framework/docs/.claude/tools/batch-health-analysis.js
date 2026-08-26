#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function analyzeDirectory(dirPath, scriptPath) {
  const mdxFiles = [];

  function findMdxFiles(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        findMdxFiles(fullPath);
      } else if (entry.name.endsWith('.mdx')) {
        mdxFiles.push(fullPath);
      }
    }
  }

  findMdxFiles(dirPath);

  const results = [];

  for (const file of mdxFiles) {
    try {
      const output = execSync(`node ${scriptPath} ${file} --format json`, { encoding: 'utf-8' });
      const health = JSON.parse(output);
      results.push(health);
    } catch (error) {
      console.error(`Error analyzing ${file}:`, error.message);
    }
  }

  return results;
}

function generateSummaryReport(results) {
  const statusEmoji = {
    excellent: '🟢',
    good: '🟢',
    needs_attention: '🟡',
    critical: '🔴'
  };

  let report = '\n';
  report += `${colors.bright}═════════════════════════════════════════════════════════════${colors.reset}\n`;
  report += `${colors.bright}      WAF DOCUMENTATION HEALTH DASHBOARD${colors.reset}\n`;
  report += `${colors.bright}═════════════════════════════════════════════════════════════${colors.reset}\n\n`;

  // Overall statistics
  const totalDocs = results.length;
  const avgScore = (results.reduce((sum, r) => sum + parseFloat(r.overall_score), 0) / totalDocs).toFixed(2);

  const byStatus = results.reduce((acc, r) => {
    acc[r.status] = (acc[r.status] || 0) + 1;
    return acc;
  }, {});

  report += `${colors.bright}📊 OVERALL STATISTICS${colors.reset}\n`;
  report += `─────────────────────────────────────────────────────────────\n`;
  report += `Total Documents: ${totalDocs}\n`;
  report += `Average Score: ${avgScore}/10\n\n`;

  report += `Distribution:\n`;
  report += `  🟢 Excellent (9-10):      ${byStatus.excellent || 0} docs (${((byStatus.excellent || 0) / totalDocs * 100).toFixed(1)}%)\n`;
  report += `  🟢 Good (7-8.9):          ${byStatus.good || 0} docs (${((byStatus.good || 0) / totalDocs * 100).toFixed(1)}%)\n`;
  report += `  🟡 Needs Attention (5-7): ${byStatus.needs_attention || 0} docs (${((byStatus.needs_attention || 0) / totalDocs * 100).toFixed(1)}%)\n`;
  report += `  🔴 Critical (<5):         ${byStatus.critical || 0} docs (${((byStatus.critical || 0) / totalDocs * 100).toFixed(1)}%)\n\n`;

  // Category averages
  const avgStructure = (results.reduce((sum, r) => sum + r.structure.score, 0) / totalDocs).toFixed(2);
  const avgContent = (results.reduce((sum, r) => sum + r.content.score, 0) / totalDocs).toFixed(2);
  const avgStyle = (results.reduce((sum, r) => sum + r.style.score, 0) / totalDocs).toFixed(2);
  const avgLinks = (results.reduce((sum, r) => sum + r.links.score, 0) / totalDocs).toFixed(2);

  report += `${colors.bright}📊 CATEGORY AVERAGES${colors.reset}\n`;
  report += `─────────────────────────────────────────────────────────────\n`;
  report += `🏗️  Structure: ${avgStructure}/10\n`;
  report += `📝 Content:   ${avgContent}/10\n`;
  report += `✍️  Style:     ${avgStyle}/10\n`;
  report += `🔗 Links:     ${avgLinks}/10\n\n`;

  // Common issues
  report += `${colors.bright}🔍 COMMON ISSUES${colors.reset}\n`;
  report += `─────────────────────────────────────────────────────────────\n`;

  const issueStats = {
    vague_pronouns: 0,
    promotional_language: 0,
    conjunction_overuse: 0,
    problematic_words: 0,
    missing_sections: 0,
    heading_issues: 0,
    insufficient_resources: 0,
    low_word_count: 0
  };

  for (const result of results) {
    // Style issues
    for (const issue of result.style.issues) {
      if (issueStats[issue.type] !== undefined) {
        issueStats[issue.type]++;
      }
    }

    // Structure issues
    if (result.structure.checks.required_sections.status === 'fail') {
      issueStats.missing_sections++;
    }
    if (result.structure.checks.heading_hierarchy.issues.length > 0) {
      issueStats.heading_issues++;
    }

    // Content issues
    if (result.content.metrics.resource_links.status === 'needs_attention') {
      issueStats.insufficient_resources++;
    }
    if (result.content.metrics.word_count.status === 'needs_attention') {
      issueStats.low_word_count++;
    }
  }

  const sortedIssues = Object.entries(issueStats)
    .filter(([_, count]) => count > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  for (const [issue, count] of sortedIssues) {
    const percentage = ((count / totalDocs) * 100).toFixed(1);
    const issueName = issue.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    report += `  ${count.toString().padStart(3)} docs (${percentage.toString().padStart(5)}%) - ${issueName}\n`;
  }
  report += '\n';

  // Top performers
  report += `${colors.bright}🏆 TOP PERFORMERS (Score >= 9.0)${colors.reset}\n`;
  report += `─────────────────────────────────────────────────────────────\n`;

  const topPerformers = results
    .filter(r => parseFloat(r.overall_score) >= 9.0)
    .sort((a, b) => parseFloat(b.overall_score) - parseFloat(a.overall_score))
    .slice(0, 10);

  if (topPerformers.length > 0) {
    for (const doc of topPerformers) {
      const filename = path.relative('.', doc.document);
      report += `  ${statusEmoji[doc.status]} ${doc.overall_score.padStart(5)}/10 - ${filename}\n`;
    }
  } else {
    report += `  ${colors.yellow}No documents with score >= 9.0${colors.reset}\n`;
  }
  report += '\n';

  // Needs attention
  report += `${colors.bright}⚠️  NEEDS ATTENTION (Score < 7.0)${colors.reset}\n`;
  report += `─────────────────────────────────────────────────────────────\n`;

  const needsAttention = results
    .filter(r => parseFloat(r.overall_score) < 7.0)
    .sort((a, b) => parseFloat(a.overall_score) - parseFloat(b.overall_score))
    .slice(0, 15);

  if (needsAttention.length > 0) {
    for (const doc of needsAttention) {
      const filename = path.relative('.', doc.document);
      report += `  ${statusEmoji[doc.status]} ${doc.overall_score.padStart(5)}/10 - ${filename}\n`;

      // Show top 2 priority fixes
      if (doc.priority_fixes.length > 0) {
        doc.priority_fixes.slice(0, 2).forEach(fix => {
          report += `      └─ ${fix.issue.replace(/_/g, ' ')}\n`;
        });
      }
    }
  } else {
    report += `  ${colors.green}All documents have score >= 7.0${colors.reset}\n`;
  }
  report += '\n';

  // Content metrics
  report += `${colors.bright}📝 CONTENT METRICS${colors.reset}\n`;
  report += `─────────────────────────────────────────────────────────────\n`;

  const avgWordCount = Math.round(results.reduce((sum, r) => sum + r.content.metrics.word_count.count, 0) / totalDocs);
  const avgCodeExamples = (results.reduce((sum, r) => sum + r.content.metrics.code_examples.count, 0) / totalDocs).toFixed(1);
  const avgResourceLinks = (results.reduce((sum, r) => sum + r.content.metrics.resource_links.count, 0) / totalDocs).toFixed(1);

  report += `Average Word Count:       ${avgWordCount} words\n`;
  report += `Average Code Examples:    ${avgCodeExamples} per doc\n`;
  report += `Average Resource Links:   ${avgResourceLinks} per doc\n\n`;

  const balancedPersonas = results.filter(r => r.content.metrics.persona_balance.status === 'balanced').length;
  report += `Balanced Persona Coverage: ${balancedPersonas}/${totalDocs} docs (${((balancedPersonas / totalDocs) * 100).toFixed(1)}%)\n\n`;

  // Link metrics
  report += `${colors.bright}🔗 LINK METRICS${colors.reset}\n`;
  report += `─────────────────────────────────────────────────────────────\n`;

  const avgInternalLinks = (results.reduce((sum, r) => sum + r.links.metrics.internal_links, 0) / totalDocs).toFixed(1);
  const avgExternalLinks = (results.reduce((sum, r) => sum + r.links.metrics.external_links, 0) / totalDocs).toFixed(1);
  const docsWithNoInternalLinks = results.filter(r => r.links.metrics.internal_links === 0).length;

  report += `Average Internal Links:   ${avgInternalLinks} per doc\n`;
  report += `Average External Links:   ${avgExternalLinks} per doc\n`;
  report += `Docs with No Internal Links: ${docsWithNoInternalLinks} (${((docsWithNoInternalLinks / totalDocs) * 100).toFixed(1)}%)\n\n`;

  // Recommendations
  report += `${colors.bright}💡 RECOMMENDATIONS${colors.reset}\n`;
  report += `─────────────────────────────────────────────────────────────\n`;

  if (parseFloat(avgScore) >= 8.0) {
    report += `${colors.green}✓ Overall documentation health is good${colors.reset}\n`;
  } else if (parseFloat(avgScore) >= 6.5) {
    report += `${colors.yellow}⚠️  Documentation health is acceptable but needs improvement${colors.reset}\n`;
  } else {
    report += `${colors.red}⚠️  Documentation health needs significant attention${colors.reset}\n`;
  }

  report += '\nPriority Actions:\n';

  if (issueStats.vague_pronouns > totalDocs * 0.3) {
    report += `  1. ${colors.red}[HIGH]${colors.reset} Address vague pronouns in ${issueStats.vague_pronouns} documents\n`;
  }

  if (issueStats.missing_sections > 0) {
    report += `  2. ${colors.red}[HIGH]${colors.reset} Add missing required sections to ${issueStats.missing_sections} documents\n`;
  }

  if (issueStats.insufficient_resources > totalDocs * 0.3) {
    report += `  3. ${colors.yellow}[MEDIUM]${colors.reset} Enhance resource sections in ${issueStats.insufficient_resources} documents\n`;
  }

  if (docsWithNoInternalLinks > totalDocs * 0.2) {
    report += `  4. ${colors.yellow}[MEDIUM]${colors.reset} Add cross-references to ${docsWithNoInternalLinks} isolated documents\n`;
  }

  if (issueStats.low_word_count > totalDocs * 0.2) {
    report += `  5. ${colors.yellow}[MEDIUM]${colors.reset} Expand ${issueStats.low_word_count} documents below target word count\n`;
  }

  report += '\n';
  report += `${colors.bright}═════════════════════════════════════════════════════════════${colors.reset}\n\n`;

  return report;
}

function generateDetailedReport(results) {
  let report = '';

  // Sort by score ascending to show worst first
  const sortedResults = [...results].sort((a, b) => parseFloat(a.overall_score) - parseFloat(b.overall_score));

  const statusEmoji = {
    excellent: '🟢',
    good: '🟢',
    needs_attention: '🟡',
    critical: '🔴'
  };

  for (const result of sortedResults) {
    const filename = path.basename(result.document);
    const relPath = path.relative('.', result.document);

    report += `\n${colors.bright}${statusEmoji[result.status]} ${filename} - ${result.overall_score}/10${colors.reset}\n`;
    report += `   ${relPath}\n`;
    report += `   Structure: ${result.structure.score.toFixed(1)} | Content: ${result.content.score.toFixed(1)} | Style: ${result.style.score.toFixed(1)} | Links: ${result.links.score.toFixed(1)}\n`;

    if (result.priority_fixes.length > 0) {
      report += `   Priority Fixes:\n`;
      result.priority_fixes.slice(0, 3).forEach(fix => {
        const icon = fix.priority === 'high' ? '🔴' : '🟡';
        report += `     ${icon} ${fix.issue.replace(/_/g, ' ')}`;
        if (fix.count) report += ` (${fix.count})`;
        report += '\n';
      });
    }
  }

  return report;
}

// Main execution
const args = process.argv.slice(2);

if (args.length === 0) {
  console.error('Usage: node batch-health-analysis.js <docs-directory> [--detailed]');
  process.exit(1);
}

const docsDir = args[0];
const showDetailed = args.includes('--detailed');
const scriptPath = path.join(__dirname, 'health-dashboard.js');

if (!fs.existsSync(docsDir)) {
  console.error(`Directory not found: ${docsDir}`);
  process.exit(1);
}

if (!fs.existsSync(scriptPath)) {
  console.error(`Health dashboard script not found: ${scriptPath}`);
  process.exit(1);
}

console.log(`${colors.cyan}Analyzing documents in ${docsDir}...${colors.reset}\n`);

const results = analyzeDirectory(docsDir, scriptPath);

if (results.length === 0) {
  console.error('No MDX files found');
  process.exit(1);
}

console.log(generateSummaryReport(results));

if (showDetailed) {
  console.log(`\n${colors.bright}DETAILED DOCUMENT BREAKDOWN${colors.reset}`);
  console.log('═════════════════════════════════════════════════════════════\n');
  console.log(generateDetailedReport(results));
}

// Save JSON output
const outputPath = path.join('/private/tmp/claude-503/-Users-cjobermaier-workspace-web-unified-docs-content-well-architected-framework-docs/3bf359b0-94d9-4b30-9d7a-749a541cd92c/scratchpad', 'health-report.json');
fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
console.log(`${colors.green}✓ Full report saved to: ${outputPath}${colors.reset}\n`);
