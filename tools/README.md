# Broken Links Checker for Docusaurus

A comprehensive tool for detecting broken internal links in Docusaurus documentation sites. This tool provides both detailed and quick checking modes with Excel export functionality.

## Features

- 🔍 **Smart Detection**: Identifies broken relative path links, parent directory links, and internal references
- 📊 **Excel Export**: Generates CSV files compatible with Excel for easy analysis
- 🚀 **Dual Modes**: Quick check for rapid overview, detailed check for comprehensive analysis
- 📈 **Statistics**: Provides breakdown by link type and affected files
- 💡 **Fix Suggestions**: Offers actionable recommendations for resolving broken links
- 🎯 **Docusaurus Optimized**: Understands Docusaurus file structure and routing conventions

## Installation

No additional dependencies required - uses Node.js built-in modules only.

## Usage

### Quick Check (Recommended for regular use)

```bash
npm run check-links:quick
```

**Features:**
- Fast scanning of all Markdown files
- Concise table output
- Basic statistics
- CSV export for Excel

**Output Example:**
```
🚀 Quick broken link check...

📁 Scanning 45 files...

📊 Quick Check Results

┌─────────────────────────────────────────────────────────────────────────────┐
│                              Broken Links Summary                           │
├─────────────────────────────────────────────────────────────────────────────┤
│ File                          │ Type        │ Broken Link                   │
├─────────────────────────────────────────────────────────────────────────────┤
│ getting-started/installation  │ Parent Dir  │ ../overview/introduction      │
│ api/authentication.md         │ Relative    │ ./examples/basic-auth         │
└─────────────────────────────────────────────────────────────────────────────┘

📈 Summary:
   Total broken links: 39
   Affected files: 25
   Parent Dir: 21
   Relative: 18

💡 Run "npm run check-links" for detailed report with Excel export
💾 Quick report saved: quick-broken-links-2025-01-26T10-30-45-123Z.csv
```

### Detailed Check (For comprehensive analysis)

```bash
npm run check-links
```

**Features:**
- Line-by-line analysis
- Detailed link information
- Comprehensive Excel reports
- Fix suggestions
- JSON export for automation

**Output Example:**
```
🔍 Starting broken link detection...

📁 Found 156 documentation files

📊 Broken Link Detection Results

❌ Found 38 broken links:

┌─────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                           Broken Links Report                                                  │
├─────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ File Path                   │ Line │ Link Type        │ Link Text             │ Target Path                 │
├─────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ getting-started/install...  │ 15   │ Parent Directory │ Overview              │ ../overview/intro           │
│                             │ 23   │ Relative Path    │ Configuration Guide   │ ./config/setup              │
└─────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘

📈 Statistics:
   Total broken links: 38
   Affected files: 23
   By type:
     Parent Directory: 22
     Relative Path: 16

💡 Fix Suggestions:
   1. Check if target files exist
   2. Verify file paths are correct
   3. Check file name case sensitivity
   4. Verify relative path hierarchy

💾 Reports saved:
   Excel/CSV: broken-links-report-2025-01-26T10-30-45-123Z.csv
   JSON: broken-links-report-2025-01-26T10-30-45-123Z.json
```

### Direct Script Execution

You can also run the scripts directly:

```bash
# Quick check
node tools/quick-check-links.js

# Detailed check
node tools/check-broken-links.js
```

## Output Files

### CSV/Excel Reports
- **Quick Check**: `quick-broken-links-[timestamp].csv`
- **Detailed Check**: `broken-links-report-[timestamp].csv`

CSV files can be opened directly in Excel and contain:
- File paths
- Line numbers (detailed mode only)
- Link types
- Link text
- Target paths

### JSON Reports (Detailed mode only)
- **Filename**: `broken-links-report-[timestamp].json`
- **Content**: Machine-readable format for automation and CI/CD integration

## Link Types

The tool categorizes broken links into these types:

- **Parent Directory**: Links starting with `../` (e.g., `../other-section/file.md`)
- **Current Directory**: Links starting with `./` (e.g., `./local-file.md`)
- **Root Directory**: Links starting with `/` (e.g., `/docs/api/reference.md`)
- **Relative Path**: Other relative links (e.g., `subfolder/file.md`)

## Common Broken Link Causes

1. **File Moved/Renamed**: Target file was moved or renamed
2. **Case Sensitivity**: Incorrect capitalization in file names
3. **Missing Extension**: Link missing `.md` or `.mdx` extension
4. **Wrong Path**: Incorrect relative path calculation
5. **Deleted Files**: Referenced file was deleted

## Fix Recommendations

### For Parent Directory Links (`../`)
```markdown
# ❌ Broken
[Guide](../missing-section/guide.md)

# ✅ Fixed
[Guide](../existing-section/guide.md)
```

### For Relative Path Links
```markdown
# ❌ Broken
[API Reference](api/missing-endpoint.md)

# ✅ Fixed
[API Reference](api/existing-endpoint.md)
```

### For Case Sensitivity Issues
```markdown
# ❌ Broken (wrong case)
[Setup](./Setup.md)

# ✅ Fixed (correct case)
[Setup](./setup.md)
```

## Configuration

### Custom Documentation Directory

Modify the scripts to use a different documentation directory:

```javascript
// In tools/check-broken-links.js or tools/quick-check-links.js
const checker = new BrokenLinkChecker('./custom-docs-dir');
```

### File Extensions

The tool checks these file extensions by default:
- `.md` (Markdown)
- `.mdx` (MDX)

To add more extensions, modify the `validExtensions` array in the scripts.

## Integration with CI/CD

### GitHub Actions Example

```yaml
name: Check Broken Links

on:
  pull_request:
    paths:
      - 'docs/**'
      - '*.md'

jobs:
  check-links:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm run check-links:quick
      - name: Upload broken links report
        if: failure()
        uses: actions/upload-artifact@v3
        with:
          name: broken-links-report
          path: quick-broken-links-*.csv
```

### Pre-commit Hook

Add to `.git/hooks/pre-commit`:

```bash
#!/bin/sh
npm run check-links:quick
if [ $? -ne 0 ]; then
  echo "❌ Broken links detected. Please fix before committing."
  exit 1
fi
```

## Troubleshooting

### Common Issues

1. **"Cannot read properties of null"**
   - Ensure you're running the script from the project root directory
   - Check that the `docs` directory exists

2. **"No files found"**
   - Verify the documentation directory path
   - Ensure there are `.md` or `.mdx` files in the directory

3. **"Permission denied"**
   - Make sure the scripts have execute permissions:
     ```bash
     chmod +x tools/check-broken-links.js
     chmod +x tools/quick-check-links.js
     ```

### Performance Tips

- Use quick check for regular development
- Run detailed check before releases
- Consider excluding large directories if not needed
- Use CI/CD integration for automated checking

## Script Comparison

| Feature | Quick Check | Detailed Check |
|---------|-------------|----------------|
| Speed | ⚡ Fast | 🐌 Thorough |
| Line Numbers | ❌ No | ✅ Yes |
| Link Text | ❌ No | ✅ Yes |
| JSON Export | ❌ No | ✅ Yes |
| Fix Suggestions | ❌ Basic | ✅ Detailed |
| Excel Export | ✅ Yes | ✅ Yes |
| Use Case | Development | Release/CI |

## Contributing

To improve the broken links checker:

1. Fork the repository
2. Make your changes to the scripts in the `tools/` directory
3. Test with your documentation
4. Submit a pull request

## License

This tool is part of your Docusaurus project and follows the same license.