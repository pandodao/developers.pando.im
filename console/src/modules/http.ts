import { fileURLToPath } from "url";
import { defineNuxtModule, addPlugin, createResolver } from "@nuxt/kit";

export default defineNuxtModule({
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url);
    const runtimeDir = fileURLToPath(new URL("./runtime", import.meta.url));
    nuxt.options.build.transpile.push(runtimeDir);

    nuxt.hook("modules:done", () => {
      addPlugin(resolve(runtimeDir, "plugin"), { append: true });
    });
  },
});
