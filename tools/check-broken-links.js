#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Broken Link Checker for Docusaurus
 * Detects broken internal links in Docusaurus documentation and exports results to Excel
 */

class BrokenLinkChecker {
  constructor(docsDir = './docs') {
    this.docsDir = docsDir;
    this.allFiles = new Set();
    this.brokenLinks = [];
    this.validExtensions = ['.md', '.mdx'];
  }

  /**
   * Recursively get all files in directory
   */
  getFilesRecursively(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        this.getFilesRecursively(filePath, fileList);
      } else if (this.validExtensions.includes(path.extname(file))) {
        fileList.push(filePath);
      }
    });
    
    return fileList;
  }

  /**
   * Get all documentation files
   */
  getAllFiles() {
    const files = this.getFilesRecursively(this.docsDir);
    
    files.forEach(file => {
      // Convert to relative path
      const relativePath = path.relative(this.docsDir, file);
      this.allFiles.add(relativePath);
      
      // Add path without extension (Docusaurus supports this)
      const withoutExt = relativePath.replace(/\.(md|mdx)$/, '');
      this.allFiles.add(withoutExt);
      
      // Add directory path for README.md files
      if (path.basename(file) === 'README.md') {
        const dirPath = path.dirname(relativePath);
        if (dirPath !== '.') {
          this.allFiles.add(dirPath);
        }
      }
    });
  }

  /**
   * Check if file exists
   */
  fileExists(linkPath, currentFile) {
    const currentDir = path.dirname(currentFile);
    
    // Handle relative paths
    let targetPath;
    if (linkPath.startsWith('./') || linkPath.startsWith('../')) {
      targetPath = path.normalize(path.join(currentDir, linkPath));
    } else if (linkPath.startsWith('/')) {
      // Absolute path (relative to docs root)
      targetPath = linkPath.substring(1);
    } else {
      // Relative path (not starting with ./)
      targetPath = path.normalize(path.join(currentDir, linkPath));
    }

    // Normalize path separators
    targetPath = targetPath.replace(/\\/g, '/');

    // Check various possible paths
    const possiblePaths = [
      targetPath,
      targetPath + '.md',
      targetPath + '.mdx',
      path.join(targetPath, 'README.md'),
      path.join(targetPath, 'README.mdx')
    ];

    return possiblePaths.some(p => {
      const normalizedPath = p.replace(/\\/g, '/');
      return this.allFiles.has(normalizedPath) || 
             fs.existsSync(path.join(this.docsDir, normalizedPath));
    });
  }

  /**
   * Extract links from file content
   */
  extractLinks(content) {
    const links = [];
    
    // Markdown link format: [text](link)
    const markdownLinkRegex = /\[([^\]]*)\]\(([^)]+)\)/g;
    let match;
    
    while ((match = markdownLinkRegex.exec(content)) !== null) {
      const linkText = match[1];
      const linkUrl = match[2];
      
      // Only process relative path links, exclude external links and anchors
      if (!linkUrl.startsWith('http') && 
          !linkUrl.startsWith('mailto:') && 
          !linkUrl.startsWith('#') &&
          !linkUrl.includes('://')) {
        
        // Remove anchor part
        const cleanUrl = linkUrl.split('#')[0];
        if (cleanUrl) {
          links.push({
            text: linkText,
            url: cleanUrl,
            fullUrl: linkUrl,
            line: this.getLineNumber(content, match.index)
          });
        }
      }
    }

    // HTML link format: <a href="link">
    const htmlLinkRegex = /<a[^>]+href=["']([^"']+)["'][^>]*>/g;
    
    while ((match = htmlLinkRegex.exec(content)) !== null) {
      const linkUrl = match[1];
      
      if (!linkUrl.startsWith('http') && 
          !linkUrl.startsWith('mailto:') && 
          !linkUrl.startsWith('#') &&
          !linkUrl.includes('://')) {
        
        const cleanUrl = linkUrl.split('#')[0];
        if (cleanUrl) {
          links.push({
            text: 'HTML Link',
            url: cleanUrl,
            fullUrl: linkUrl,
            line: this.getLineNumber(content, match.index)
          });
        }
      }
    }

    return links;
  }

  /**
   * Get line number of link in content
   */
  getLineNumber(content, index) {
    const beforeMatch = content.substring(0, index);
    return beforeMatch.split('\n').length;
  }

  /**
   * Check single file
   */
  checkFile(filePath) {
    const fullPath = path.join(this.docsDir, filePath);
    
    if (!fs.existsSync(fullPath)) {
      return;
    }

    const content = fs.readFileSync(fullPath, 'utf-8');
    const links = this.extractLinks(content);

    links.forEach(link => {
      if (!this.fileExists(link.url, filePath)) {
        this.brokenLinks.push({
          file: filePath,
          line: link.line,
          linkText: link.text,
          linkUrl: link.fullUrl,
          targetPath: link.url,
          type: this.getLinkType(link.url)
        });
      }
    });
  }

  /**
   * Get link type
   */
  getLinkType(url) {
    if (url.startsWith('../')) return 'Parent Directory';
    if (url.startsWith('./')) return 'Current Directory';
    if (url.startsWith('/')) return 'Root Directory';
    return 'Relative Path';
  }

  /**
   * Run the check
   */
  async run() {
    console.log('🔍 Starting broken link detection...\n');
    
    // Get all files
    this.getAllFiles();
    console.log(`📁 Found ${this.allFiles.size} documentation files`);

    // Check each file
    const files = this.getFilesRecursively(this.docsDir);
    
    for (const file of files) {
      const relativePath = path.relative(this.docsDir, file);
      this.checkFile(relativePath);
    }

    // Output results
    this.outputResults();
  }

  /**
   * Output check results
   */
  outputResults() {
    console.log('\n📊 Broken Link Detection Results\n');
    
    if (this.brokenLinks.length === 0) {
      console.log('✅ Excellent! No broken links found.');
      return;
    }

    console.log(`❌ Found ${this.brokenLinks.length} broken links:\n`);

    // Group by file
    const groupedByFile = this.brokenLinks.reduce((acc, link) => {
      if (!acc[link.file]) {
        acc[link.file] = [];
      }
      acc[link.file].push(link);
      return acc;
    }, {});

    // Output table
    console.log('┌─────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐');
    console.log('│                                           Broken Links Report                                                  │');
    console.log('├─────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤');
    console.log('│ File Path                   │ Line │ Link Type        │ Link Text             │ Target Path                 │');
    console.log('├─────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤');

    Object.keys(groupedByFile).sort().forEach(file => {
      groupedByFile[file].forEach((link, index) => {
        const fileName = index === 0 ? this.truncateString(file, 25) : '';
        const line = link.line.toString().padEnd(4);
        const type = link.type.padEnd(16);
        const text = this.truncateString(link.linkText, 20);
        const target = this.truncateString(link.targetPath, 25);
        
        console.log(`│ ${fileName.padEnd(25)} │ ${line} │ ${type} │ ${text.padEnd(20)} │ ${target.padEnd(25)} │`);
      });
      
      if (Object.keys(groupedByFile).indexOf(file) < Object.keys(groupedByFile).length - 1) {
        console.log('├─────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤');
      }
    });

    console.log('└─────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘');

    // Output statistics
    console.log('\n📈 Statistics:');
    console.log(`   Total broken links: ${this.brokenLinks.length}`);
    console.log(`   Affected files: ${Object.keys(groupedByFile).length}`);
    
    const typeStats = this.brokenLinks.reduce((acc, link) => {
      acc[link.type] = (acc[link.type] || 0) + 1;
      return acc;
    }, {});
    
    console.log('   By type:');
    Object.entries(typeStats).forEach(([type, count]) => {
      console.log(`     ${type}: ${count}`);
    });

    // Generate fix suggestions
    console.log('\n💡 Fix Suggestions:');
    console.log('   1. Check if target files exist');
    console.log('   2. Verify file paths are correct');
    console.log('   3. Check file name case sensitivity');
    console.log('   4. Verify relative path hierarchy');
    
    // Save to Excel file
    this.saveToExcel();
  }

  /**
   * Truncate string
   */
  truncateString(str, maxLength) {
    if (str.length <= maxLength) {
      return str;
    }
    return str.substring(0, maxLength - 3) + '...';
  }

  /**
   * Save results to Excel file
   */
  saveToExcel() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `broken-links-report-${timestamp}.xlsx`;
    
    // Create Excel content in CSV format (can be opened by Excel)
    const csvContent = this.generateCSVContent();
    
    // Save as CSV (Excel compatible)
    const csvFilename = `broken-links-report-${timestamp}.csv`;
    fs.writeFileSync(csvFilename, csvContent);
    
    // Also save detailed JSON report
    const report = {
      timestamp: new Date().toISOString(),
      totalBrokenLinks: this.brokenLinks.length,
      affectedFiles: [...new Set(this.brokenLinks.map(link => link.file))].length,
      brokenLinks: this.brokenLinks
    };

    const jsonFilename = `broken-links-report-${timestamp}.json`;
    fs.writeFileSync(jsonFilename, JSON.stringify(report, null, 2));
    
    console.log(`\n💾 Reports saved:`);
    console.log(`   Excel/CSV: ${csvFilename}`);
    console.log(`   JSON: ${jsonFilename}`);
  }

  /**
   * Generate CSV content for Excel
   */
  generateCSVContent() {
    const headers = ['File Path', 'Line Number', 'Link Type', 'Link Text', 'Target Path', 'Full URL'];
    const rows = [headers.join(',')];
    
    this.brokenLinks.forEach(link => {
      const row = [
        `"${link.file}"`,
        link.line,
        `"${link.type}"`,
        `"${link.linkText.replace(/"/g, '""')}"`, // Escape quotes
        `"${link.targetPath}"`,
        `"${link.linkUrl}"`
      ];
      rows.push(row.join(','));
    });
    
    return rows.join('\n');
  }
}

// Run check
if (require.main === module) {
  const checker = new BrokenLinkChecker();
  checker.run().catch(console.error);
}

module.exports = BrokenLinkChecker;