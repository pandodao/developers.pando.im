import vueI18nOptions from "./src/i18n/options";


// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  router: {
    options: {
      hashMode: false
    }
  },
  srcDir: "src/",
  css: ["~/styles/main.scss"],
  components: {
    dirs: ["~/components/common", "~/components/talkee", "~/components/botastic", "~/layouts/components"],
  },
  imports: {
    dirs: ["stores", "composables"],
  },
  app: {
    baseURL: "/console",
    head: {
      title: "Pando Developer Console",
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no, viewport-fit=cover",
      meta: [{ name: "description", content: "Pando provides a set of decentralized protocols and Web3 tools to help developers build their own applications." }],
      link: [
        { rel: "icon", type: "image/png", href: "/console/favicon.png" },
        {
          rel: "stylesheet",
          href: "https://static.fox.one/font/inter/style.css",
        },
      ],
      script: [
        { src: "https://polyfill.io/v3/polyfill.min.js?features=Intl" },
        { src: "https://cdn.jsdelivr.net/npm/@foxone/mvm@0.1.30/dist/mvm.min.js", defer: true },
      ],
    },
  },
  modules: [
    "./src/modules/vuetify",
    "./src/modules/http",
    ["@pinia/nuxt", { autoImports: ["defineStore"] }],
    ["@pinia-plugin-persistedstate/nuxt", { storage: "localStorage" }],
    ["@nuxtjs/i18n", { vueI18n: vueI18nOptions }],
  ],
  runtimeConfig: {
    public: {
      token: process.env.NUXT_PUBLIC_MIXIN_TOKEN,
      clientID: process.env.NUXT_PUBLIC_MIXIN_CLIENT_ID,
      mixinApiBase: process.env.NUXT_PUBLIC_MIXIN_API_BASE_URL,

      talkeeClientID: process.env.NUXT_PUBLIC_TALKEE_CLIENT_ID,
      talkeeApiBase: process.env.NUXT_PUBLIC_TALKEE_API_BASE_URL,

      botasticClientID: process.env.NUXT_PUBLIC_BOTASTIC_CLIENT_ID,
      botasticApiBase: process.env.NUXT_PUBLIC_BOTASTIC_API_BASE_URL,
    },
  },
  vite: {
    ssr: {
      noExternal: ["vuetify"],
    },
    server: {
      watch: {
        ignored: ["!**/node_modules/@foxone/**"],
      },
    },
  },
});
