export default {
  title: 'Pando Developers',
  description: 'Just playing around.',
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      {
        text: 'References',
        link: '/references/overview'
      }
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          items: [
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'Understand MTG', link: '/guide/understand-mtg' },
            { text: 'Call APIs', link: '/guide/call-apis' },
            { text: 'Invoke Actions', link: '/guide/invoke-actions' },
            { text: 'Redirect to Wallets', link: '/guide/redirect-to-wallets' },
          ]
        },
        {
          text: 'Others',
          items: [
            { text: 'Wallets', link: '/guide/wallets' },
          ]
        },
        {
          text: 'Resources',
          items: [
            { text: 'Examples', link: '/guide/examples' },
            { text: 'SDKs', link: '/guide/sdks' },
            { text: 'Useful Links', link: '/guide/useful-links' },
          ]
        },
      ],
      '/references/': [
        { text: 'General',
          items: [
            { text: 'Overview', link: '/references/overview' },
            { text: 'Authorization', link: '/references/auth' },
          ]
        },
        {
          text: '4swap',
          items: [
            { text: 'Restful API', link: '/references/4swap/api' },
            { text: 'Action', link: '/references/4swap/action' },
          ]
        },
        {
          text: 'Leaf',
          items: [
            { text: 'Restful API', link: '/references/leaf/api' },
            { text: 'Action', link: '/references/leaf/action' },
          ]
        },
        {
          text: 'Rings',
          items: [
            { text: 'Restful API', link: '/references/rings/api' },
            { text: 'Action', link: '/references/rings/action' },
          ]
        },
        {
          text: 'Resources',
          items: [
            { text: 'Examples', link: '/references/4swap/examples' },
          ]
        },
      ]
    }
  }
}