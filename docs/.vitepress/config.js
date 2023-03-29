export default {
  title: 'Pando Developers',
  description: 'Just playing around with Pando',
  themeConfig: {
    editLink: {
      pattern: 'https://github.com/pandodao/developers.pando.im/edit/master/docs/:path'
    },
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      {
        text: 'References',
        link: '/references/overview'
      },
      {
        text: 'Console',
        link: 'https://developers.pando.im/console/'
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
          text: 'Web3 Integration',
          items: [
            { text: 'Talkee', link: '/guide/talkee' },
          ]
        },
        {
          text: 'AI Services',
          items: [
            { text: 'Botastic', link: '/guide/botastic' },
          ]
        },
        {
          text: 'Extra Topics',
          items: [
            { text: 'Changelog', link: '/guide/changelog' },
            { text: 'Wallets', link: '/guide/wallets' },
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
          collapsed: true,
          items: [
            { text: 'Restful API', link: '/references/4swap/api' },
            { text: 'Action', link: '/references/4swap/action' },
            { text: 'Design', link: '/references/4swap/design' },
          ]
        },
        {
          text: 'Leaf',
          collapsed: true,
          items: [
            { text: 'Restful API', link: '/references/leaf/api' },
            { text: 'Action', link: '/references/leaf/action' },
            { text: 'Design', link: '/references/leaf/design' },
          ]
        },
        {
          text: 'Talkee',
          collapsed: true,
          items: [
            { text: 'Restful API', link: '/references/talkee/api' },
            { text: 'Websocket', link: '/references/talkee/websocket' },
          ]
        },
        {
          text: 'Botastic',
          collapsed: true,
          items: [
            { text: 'Restful API', link: '/references/botastic/api' },
            { text: 'Middleware', link: '/references/botastic/middleware' },
          ]
        }
      ]
    },
    footer: {
      copyright: 'Copyright © 2018-present <a href="https://pando.im">Pando Proto</a>'
    }
  }
}