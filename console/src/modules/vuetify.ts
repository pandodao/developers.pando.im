import { defineNuxtModule } from "@nuxt/kit";
import vuetify from "vite-plugin-vuetify";

export default defineNuxtModule({
  setup(options, nuxt) {
    nuxt.hooks.hook("vite:extendConfig", (config) => {
      config.plugins?.push(vuetify({ styles: { configFile: "styles/settings.scss" } }));
    });
  },
});

