import en from "./locales/en.json";
import zhHant from "./locales/zh-hant.json";
import zhCn from "./locales/zh-cn.json";
import ja from "./locales/ja.json";

export default {
  locales: ["en", "ja", "zh-tw", "zh"],
  defaultLocale: 'en',
  vueI18n: {
    fallbackLocale: 'en',
  },
  strategy: "no-prefix",
  messages: {
    en,
    "zh-tw": zhHant,
    "zh": zhCn,
    ja,
  },
  detectBrowserLanguage: {
    useCookie: true,
    cookieKey: 'i18n_redirected',
    redirectOn: 'root',
    alwaysRedirect: true,
  },
};
