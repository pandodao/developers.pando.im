import "vuetify/styles";

import { createVuetify } from "vuetify";
import { VDialog, VMenu } from "vuetify/components";
import { mdi } from "vuetify/iconsets/mdi";
import UIKit from "@foxone/uikit";
import { usePresets } from "@foxone/uikit/presets";
import { icons } from "@/utils/icons";

export default defineNuxtPlugin((nuxtApp) => {
  const options = usePresets({
    theme: {
      themes: {
        light: {
          colors: {
            bg_drawer: "#F6F6F6",
            background: "#FFF",
            swap_primary: "#F36EAE",
          },
        },
        dark: { colors: { bg_drawer: "#1F1F1F" } },
      },
    },
    icons: {
      defaultSet: "mdi",
      sets: { mdi },
      aliases: icons,
    },
    components: { VDialog, VMenu },
  });
  const vuetify = createVuetify(options);

  nuxtApp.vueApp.use(vuetify);
  nuxtApp.vueApp.use(UIKit);
});
