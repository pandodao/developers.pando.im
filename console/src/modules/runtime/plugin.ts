import { defineNuxtPlugin } from "#app";
import { http as mixinHttp } from "@/services/mixin/http";
import { http as talkeeHttp } from "@/services/talkee/http";
import { createAuthIntercept, creatErrorIntercept } from "@/services/interceptors";

import type { AxiosResponse } from "axios";

import type { Pinia, PiniaPluginContext } from "pinia";

function configAuthToken(token: string) {
  mixinHttp.instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

function configTalkeeAuthToken(token: string) {
  talkeeHttp.instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  talkeeHttp.instance.defaults.headers.common["X-TALKEE-SITE-ID"] = 7;
  talkeeHttp.instance.defaults.headers.common["X-TALKEE-SITE-SLUG"] = "console";
}

export default defineNuxtPlugin((nuxtApp) => {
  const env = useRuntimeConfig();

  mixinHttp.config({ baseURL: env.public.mixinApiBase });
  talkeeHttp.config({ baseURL: env.public.talkeeApiBase });

  (nuxtApp.$pinia as Pinia).use(({ store }: PiniaPluginContext) => {
    if (store.$id === "auth") {
      const authIntercept = createAuthIntercept(store.logout, (resp: AxiosResponse) => {
        return resp.data.data;
      });
      const errorIntercept = creatErrorIntercept(store.logout);
      console.log(store);
      mixinHttp.instance.interceptors.response.use(authIntercept, errorIntercept);
      talkeeHttp.instance.interceptors.response.use(authIntercept, errorIntercept);

      store.$subscribe(
        () => {
          console.log("token changed", store.$state.token)
          console.log("talkee token changed", store.$state.talkeeToken)
          configAuthToken(store.$state.token);
          configTalkeeAuthToken(store.$state.talkeeToken);
        },
        { flush: "sync" }
      );
    }
  });
});
