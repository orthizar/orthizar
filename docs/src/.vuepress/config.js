const { description } = require('../../package')

module.exports = {
  title: 'Silvan Kohler',
  description: description,

  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  themeConfig: {
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    nav: [
      {
        text: 'Home',
        link: '/',
      },
      {
        text: 'Projects',
        link: '/projects/',
      },
      {
        text: 'GitHub',
        link: 'https://github.com/SilvanKohler/'
      }
    ],
    sidebar: {
      '/projects/': [
        {
          title: 'Projects',
          collapsable: false,
          children: [
            ['', 'Overview'],
            'project1',
            'project2',
          ]
        }
      ],
    }
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
    '@vuepress/active-header-links',
  ]
}
