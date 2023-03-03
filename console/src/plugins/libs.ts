import Passport from "@foxone/mixin-passport";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Passport);
});

