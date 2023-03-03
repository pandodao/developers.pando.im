import en from "./locales/en.json";
import zh from "./locales/zh-hant.json";
import ja from "./locales/ja.json";

export default {
  locales: ["en", "ja", "zh"],
  defaultLocale: 'en',
  vueI18n: {
    fallbackLocale: 'en',
  },
  strategy: "no-prefix",
  messages: {
    en,
    zh,
    ja,
  },
  detectBrowserLanguage: {
    useCookie: true,
    cookieKey: 'i18n_redirected',
    redirectOn: 'root',
    alwaysRedirect: true,
  },
};
