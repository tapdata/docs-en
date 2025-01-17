// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'AtlasView Documentation',
  tagline: 'AtlasView Cloud, a cdc based live data platform for mongodb atlas',
  url: 'https://docs.atlas-view.co',
  baseUrl: '/',
  onBrokenLinks: 'ignore',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'atlas-view', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.


  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/', // Serve the docs at the site's root
          sidebarPath: require.resolve('./sidebars.js'),
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        // Google Analytics
         gtag: {
          trackingID: 'G-PVNR6DP305', // Measurement ID, which can be find in Data streams page on Google Analytics platform.
         },
        blog: false, // Disable the blog plugin
        sitemap: {
          changefreq: 'daily',
          priority: 0.5,
          ignorePatterns: ['/reuse/**','/markdown-page'],
          filename: 'sitemap.xml',
        },
      }),
    ],
  ],

markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],

// An Image Zoom plugin for Docusaurus 2
  plugins: [
    'plugin-image-zoom',
    'docusaurus-plugin-hotjar'
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
    // By enable hideable option, you can make the entire sidebar hideable, allowing users to better focus on the content.
      docs: {
        sidebar: {
        hideable: true,
        },
      },
    // Website announcement
    announcementBar: {
            id: 'announcementBar-1',
            content: `🎉️ Build your real-time document based data platform in MongoDB. Free trial with <a target="_blank" rel="noopener noreferrer" href="https://app.atlas-view.co/">Atlas View Cloud</a> ! `,
            backgroundColor: '#b636ba',
            textColor: '#ffffff',
            },
    // SEO Configuration, this would become <meta name="keywords" content="cooking, blog"> in the generated HTML
      metadata: [{name: 'keywords', content: 'data platform, data replication, data development, atlas-view, mongodb, mongodb atlas, etl tool, saas service, mview'}],
      navbar: {
        logo: {
          alt: 'Atlas-View',
          src: 'img/logo.png',
          href: 'https://app.atlas-view.co',
        },
        items: [
          {
            type: 'doc',
            docId: 'what-is-atlas-view',
            position: 'left',
            label: 'Atlas-View Documentation',
          },
          {
            href: 'https://app.atlas-view.co',
            position: 'right',
            label: 'Log in Atlas-View Cloud',
          }
        ],
      },
      // algolia search plugin
     algolia: {
      appId: 'QMWL076P1O',
      apiKey: '76c365bb35304a755c612e0d58b1df5e',
      indexName: 'atlas-view',
      contextualSearch: true,
      },
      footer: {
        style: 'dark',
        copyright: `Copyright © ${new Date().getFullYear()} Atlas-View, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        theme: require('prism-react-renderer/themes/dracula'),
      },
      hotjar: {
        applicationId: '3447165',
      }
    }),
  scripts: [
    '/js/iframe.js'
  ]
};

module.exports = config;
