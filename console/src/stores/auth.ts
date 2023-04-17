import type { AuthMethod } from "@foxone/uikit/types";
import { defineStore } from "pinia";
import { Ref } from "vue";

export const useAuthStore = defineStore(
  "auth",
  () => {

    const serviceTokens = ref<Record<string, string>>({});
    const serviceChannels = ref<Record<string, string>>({});

    const loading = ref(false);

    const servicesLogged = computed(() => {
      return (servName:string) => {
        return Boolean(serviceTokens.value[servName]);
      }
    });

    function getServiceToken(servName: string) {
      return serviceTokens.value[servName] || "";
    }

    function setServiceAuth(servName:string, data: any) {
      serviceTokens.value[servName] = data.token;
      serviceChannels.value[servName] = data.channel;
    }

    function clearServiceAuth(servName:string = "") {
      if (servName) {
        serviceTokens.value[servName] = "";
        serviceChannels.value[servName] = "";
      } else {
        serviceTokens.value = {};
        serviceChannels.value = {};
      }
    }

    function logout() {
      clearServiceAuth();
    }

    return {
      loading,

      serviceTokens,
      serviceChannels,

      servicesLogged,

      getServiceToken,

      setServiceAuth,
      clearServiceAuth,
      logout,
    };
  },
  { persist: true }
);
