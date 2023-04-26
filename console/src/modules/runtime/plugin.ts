import { defineNuxtPlugin } from "#app";
import { http as mixinHttp } from "@/services/mixin/http";
import { http as talkeeHttp } from "@/services/talkee/http";
import { http as botasticHttp } from "@/services/botastic/http";
import { createAuthIntercept, creatErrorIntercept } from "@/services/interceptors";

import type { AxiosResponse } from "axios";

import type { Pinia, PiniaPluginContext } from "pinia";

function configAuthToken(client: any, token: string) {
  client.instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

function configTalkeeSiteData() {
  talkeeHttp.instance.defaults.headers.common["X-TALKEE-SITE-ID"] = 7;
  talkeeHttp.instance.defaults.headers.common["X-TALKEE-SITE-SLUG"] = "console";
}

export default defineNuxtPlugin((nuxtApp) => {
  const env = useRuntimeConfig();

  mixinHttp.config({ baseURL: env.public.mixinApiBase });
  talkeeHttp.config({ baseURL: env.public.talkeeApiBase });
  botasticHttp.config({ baseURL: env.public.botasticApiBase });

  (nuxtApp.$pinia as Pinia).use(({ store }: PiniaPluginContext) => {
    if (store.$id === "auth") {
      const authIntercept = createAuthIntercept(store.logout, (resp: AxiosResponse) => {
        return resp.data.data;
      });
      const errorIntercept = creatErrorIntercept(store.logout);
      mixinHttp.instance.interceptors.response.use(authIntercept, errorIntercept);
      talkeeHttp.instance.interceptors.response.use(authIntercept, errorIntercept);
      botasticHttp.instance.interceptors.response.use(authIntercept, errorIntercept);

      store.$subscribe(
        () => {
          configAuthToken(mixinHttp, store.$state.token);
          configAuthToken(talkeeHttp, store.$state.serviceTokens["talkee"]);
          configAuthToken(botasticHttp, store.$state.serviceTokens["botastic"]);
          configTalkeeSiteData();
        },
        { flush: "sync" }
      );
    }
  });
});
