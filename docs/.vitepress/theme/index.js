// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import APIEndpoint from "./components/api/api-endpoint.vue"
import APIParams from "./components/api/api-params.vue"
import './custom.css'

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    // extend default theme custom behaviour.
    DefaultTheme.enhanceApp(ctx)
    ctx.app.component('APIEndpoint', APIEndpoint)
    ctx.app.component('APIParams', APIParams)
    // register your custom global components
    // ctx.app.component('MyGlobalComponent' /* ... */)
  },
}