#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Quick Broken Link Checker for Docusaurus
 * Fast detection of broken internal links with concise output
 */

class QuickLinkChecker {
  constructor(docsDir = './docs') {
    this.docsDir = docsDir;
    this.allFiles = new Set();
    this.brokenLinks = [];
    this.validExtensions = ['.md', '.mdx'];
  }

  /**
   * Recursively get all Markdown files
   */
  getMarkdownFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        this.getMarkdownFiles(filePath, fileList);
      } else if (this.validExtensions.includes(path.extname(file))) {
        fileList.push(filePath);
        
        // Add to available files set
        const relativePath = path.relative(this.docsDir, filePath);
        this.allFiles.add(relativePath);
        this.allFiles.add(relativePath.replace(/\.(md|mdx)$/, ''));
        
        // Add directory for README files
        if (path.basename(file) === 'README.md') {
          const dirPath = path.dirname(relativePath);
          if (dirPath !== '.') {
            this.allFiles.add(dirPath);
          }
        }
      }
    });
    
    return fileList;
  }

  /**
   * Check if file exists
   */
  fileExists(linkPath, currentFile) {
    const currentDir = path.dirname(currentFile);
    
    let targetPath;
    if (linkPath.startsWith('./') || linkPath.startsWith('../')) {
      targetPath = path.normalize(path.join(currentDir, linkPath));
    } else if (linkPath.startsWith('/')) {
      targetPath = linkPath.substring(1);
    } else {
      targetPath = path.normalize(path.join(currentDir, linkPath));
    }

    targetPath = targetPath.replace(/\\/g, '/');

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
   * Extract links from content
   */
  extractLinks(content) {
    const links = [];
    const linkRegex = /\[([^\]]*)\]\(([^)]+)\)/g;
    let match;
    
    while ((match = linkRegex.exec(content)) !== null) {
      const linkUrl = match[2];
      
      if (!linkUrl.startsWith('http') && 
          !linkUrl.startsWith('mailto:') && 
          !linkUrl.startsWith('#') &&
          !linkUrl.includes('://')) {
        
        const cleanUrl = linkUrl.split('#')[0];
        if (cleanUrl) {
          links.push(cleanUrl);
        }
      }
    }

    return links;
  }

  /**
   * Get link type
   */
  getLinkType(url) {
    if (url.startsWith('../')) return 'Parent Dir';
    if (url.startsWith('./')) return 'Current Dir';
    if (url.startsWith('/')) return 'Root Dir';
    return 'Relative';
  }

  /**
   * Run quick check
   */
  run() {
    console.log('🚀 Quick broken link check...\n');
    
    const files = this.getMarkdownFiles(this.docsDir);
    console.log(`📁 Scanning ${files.length} files...`);

    files.forEach(file => {
      const relativePath = path.relative(this.docsDir, file);
      const content = fs.readFileSync(file, 'utf-8');
      const links = this.extractLinks(content);

      links.forEach(link => {
        if (!this.fileExists(link, relativePath)) {
          this.brokenLinks.push({
            file: relativePath,
            link: link,
            type: this.getLinkType(link)
          });
        }
      });
    });

    this.outputResults();
  }

  /**
   * Output results
   */
  outputResults() {
    console.log('\n📊 Quick Check Results\n');
    
    if (this.brokenLinks.length === 0) {
      console.log('✅ No broken links found!');
      return;
    }

    // Group by file
    const groupedByFile = this.brokenLinks.reduce((acc, item) => {
      if (!acc[item.file]) {
        acc[item.file] = [];
      }
      acc[item.file].push(item);
      return acc;
    }, {});

    // Simple table output
    console.log('┌─────────────────────────────────────────────────────────────────────────────┐');
    console.log('│                              Broken Links Summary                           │');
    console.log('├─────────────────────────────────────────────────────────────────────────────┤');
    console.log('│ File                          │ Type        │ Broken Link                   │');
    console.log('├─────────────────────────────────────────────────────────────────────────────┤');

    Object.keys(groupedByFile).sort().forEach(file => {
      groupedByFile[file].forEach((item, index) => {
        const fileName = index === 0 ? this.truncate(file, 28) : '';
        const type = item.type.padEnd(11);
        const link = this.truncate(item.link, 29);
        
        console.log(`│ ${fileName.padEnd(28)} │ ${type} │ ${link.padEnd(29)} │`);
      });
    });

    console.log('└─────────────────────────────────────────────────────────────────────────────┘');

    // Statistics
    const typeStats = this.brokenLinks.reduce((acc, item) => {
      acc[item.type] = (acc[item.type] || 0) + 1;
      return acc;
    }, {});

    console.log('\n📈 Summary:');
    console.log(`   Total broken links: ${this.brokenLinks.length}`);
    console.log(`   Affected files: ${Object.keys(groupedByFile).length}`);
    Object.entries(typeStats).forEach(([type, count]) => {
      console.log(`   ${type}: ${count}`);
    });

    console.log('\n💡 Run "npm run check-links" for detailed report with Excel export');
    
    // Save to Excel
    this.saveToExcel();
  }

  /**
   * Truncate string
   */
  truncate(str, maxLength) {
    if (str.length <= maxLength) {
      return str;
    }
    return str.substring(0, maxLength - 3) + '...';
  }

  /**
   * Save to Excel format
   */
  saveToExcel() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const csvFilename = `quick-broken-links-${timestamp}.csv`;
    
    const headers = ['File Path', 'Link Type', 'Broken Link'];
    const rows = [headers.join(',')];
    
    this.brokenLinks.forEach(item => {
      const row = [
        `"${item.file}"`,
        `"${item.type}"`,
        `"${item.link}"`
      ];
      rows.push(row.join(','));
    });
    
    const csvContent = rows.join('\n');
    fs.writeFileSync(csvFilename, csvContent);
    
    console.log(`\n💾 Quick report saved: ${csvFilename}`);
  }
}

// Run check
if (require.main === module) {
  const checker = new QuickLinkChecker();
  checker.run();
}

module.exports = QuickLinkChecker;