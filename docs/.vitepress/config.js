export default {
  title: 'Pando Developers',
  description: 'Just playing around with Pando',
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
            { text: 'Call APIs', link: '/guide/call-apis' },
            { text: 'Invoke Actions', link: '/guide/invoke-actions' },
            { text: 'Understand MTG', link: '/guide/understand-mtg' },
            { text: 'Redirect to Wallets', link: '/guide/redirect-to-wallets' },
          ]
        },
        {
          text: 'Extra Topics',
          items: [
            { text: 'Wallets', link: '/guide/wallets' },
            { text: 'Talkee', link: '/guide/talkee' },
            { text: 'Changelog', link: '/guide/changelog' },
          ]
        },
        {
          text: 'Resources',
          items: [
            { text: 'SDKs', link: '/guide/sdks' },
            { text: 'Community', link: '/guide/community' },
            { text: 'Useful Links', link: '/guide/useful-links' },
          ]
        },
      ],
      '/references/': [
        { text: 'General',
          items: [
            { text: 'Overview', link: '/references/overview' },
            { text: 'Authorization', link: '/references/auth' },
            { text: 'Authorization (Client)', link: '/references/auth-client' },
            { text: 'Action Specification', link: '/references/action' },
          ]
        },
        {
          text: '4swap',
          items: [
            { text: 'Restful API', link: '/references/4swap/api' },
            { text: 'Action', link: '/references/4swap/action' },
            { text: 'Design', link: '/references/4swap/design' },
          ]
        },
        {
          text: 'Leaf',
          items: [
            { text: 'Restful API', link: '/references/leaf/api' },
            { text: 'Action', link: '/references/leaf/action' },
            { text: 'Design', link: '/references/leaf/design' },
          ]
        },
        {
          text: 'Talkee',
          items: [
            { text: 'Restful API', link: '/references/talkee/api' },
            { text: 'Websocket', link: '/references/talkee/websocket' },
          ]
        }
      ]
    }
  }
}