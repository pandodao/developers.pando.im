import type { AuthMethod } from "@foxone/uikit/types";
import { defineStore } from "pinia";
import { Ref } from "vue";

export const useAuthStore = defineStore(
  "auth",
  () => {

    const token = ref("");
    const channel = ref<AuthMethod | "">("");

    const talkeeToken = ref("");
    const talkeeChannel = ref<AuthMethod | "">("");

    const serviceTokens = ref<Record<string, string>>({});
    const serviceChannels = ref<Record<string, string>>({});

    const loading = ref(false);

    const logged = computed(() => {
      return Boolean(token.value);
    });

    const talkeeLogged = computed(() => {
      return Boolean(talkeeToken.value);
    });

    const servicesLogged = computed(() => {
      return (servName:string) => {
        return Boolean(serviceTokens.value[servName]);
      }
    });

    function getToken() {
      return token.value;
    }

    function getTalkeeToken() {
      return talkeeToken.value;
    }

    function getServiceToken(servName: string) {
      return serviceTokens.value[servName] || "";
    }

    function setAuth(data: any) {
      token.value = data.token;
      channel.value = data.channel;
    }

    function setTalkeeAuth(data: any) {
      talkeeToken.value = data.token;
      talkeeChannel.value = data.channel;
    }

    function setServiceAuth(servName:string, data: any) {
      serviceTokens.value[servName] = data.token;
      serviceChannels.value[servName] = data.channel;
    }

    function clearAuth() {
      token.value = "";
      channel.value = "";
    }

    function clearTalkeeAuth() {
      talkeeToken.value = "";
      talkeeChannel.value = "";
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
      clearAuth();
      clearTalkeeAuth();
      clearServiceAuth();
    }

    return {
      loading,

      token,
      channel,
      serviceTokens,
      serviceChannels,

      talkeeToken,
      talkeeChannel,

      logged,
      servicesLogged,
      talkeeLogged,

      getToken,
      getServiceToken,
      getTalkeeToken,

      setAuth,
      setServiceAuth,
      setTalkeeAuth,
      clearAuth,
      clearServiceAuth,
      clearTalkeeAuth,
      logout,
    };
  },
  { persist: true }
);
