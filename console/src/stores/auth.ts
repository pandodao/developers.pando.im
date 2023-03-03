import type { AuthMethod } from "@foxone/uikit/types";
import { defineStore } from "pinia";

export const useAuthStore = defineStore(
  "auth",
  () => {

    const token = ref("");
    const channel = ref<AuthMethod | "">("");

    const talkeeToken = ref("");
    const talkeeChannel = ref<AuthMethod | "">("");

    const loading = ref(false);

    const logged = computed(() => {
      return Boolean(token.value);
    });

    const talkeeLogged = computed(() => {
      return Boolean(talkeeToken.value);
    });

    function getToken() {
      return token.value;
    }

    function getTalkeeToken() {
      return talkeeToken.value;
    }

    function setAuth(data: any) {
      token.value = data.token;
      channel.value = data.channel;
    }

    function setTalkeeAuth(data: any) {
      talkeeToken.value = data.token;
      talkeeChannel.value = data.channel;
    }

    function clearAuth() {
      token.value = "";
      channel.value = "";
    }

    function clearTalkeeAuth() {
      talkeeToken.value = "";
      talkeeChannel.value = "";
    }

    function logout() {
      clearAuth();
      clearTalkeeAuth();
    }

    return {
      loading,

      token,
      channel,

      talkeeToken,
      talkeeChannel,

      logged,
      talkeeLogged,

      getToken,
      getTalkeeToken,

      setAuth,
      setTalkeeAuth,
      clearAuth,
      clearTalkeeAuth,
      logout,
    };
  },
  { persist: true }
);
