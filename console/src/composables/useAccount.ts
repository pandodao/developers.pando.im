import { usePassport as _usePassport, isMVM as _isMVM } from "@foxone/mixin-passport/lib/helper";
import type { AuthMethod } from "@foxone/uikit/types";
import { login as talkeeLogin } from "@/services/talkee";

export function useAccount() {
  const passport = _usePassport();
  const authStore = useAuthStore();
  const accountStore = useAccountStore();
  const assetStore = useAssetStore();
  const talkeeDataStore = useTalkeeDataStore();

  const toast = useToast();
  const env = useRuntimeConfig();

  const initing = ref(true);

  const logging = computed(() => authStore.loading || accountStore.loading);
  const logged = computed(() => authStore.logged);
  const talkeeLogged = computed(() => authStore.talkeeLogged);

  const authChannel = computed(() => authStore.channel);

  const isMVM = computed(() => logged.value && _isMVM(authStore.channel as AuthMethod));

  const displayName = computed(() => {
    const name = accountStore.profile?.full_name ?? "";

    return isMVM.value ? shortStr(name) : name;
  });

  const displayAvatar = computed(() => {
    const name = accountStore.profile?.full_name ?? "";
    const avatar = accountStore.profile?.avatar_url;

    return avatar;
  });

  async function login() {
    if (env.public.token) {
      authStore.setAuth({ token: env.public.token, channel: "mixin" });
      return;
    }
    try {
      const data = await passport.auth({
        origin: "Pando Developer Console",
        authMethods: ["metamask", "walletconnect", "mixin"],
        clientId: env.public.clientID,
        scope: "PROFILE:READ ASSETS:READ",
        pkce: true,
        mvmAuthType: "MixinToken",
      });

      authStore.setAuth({ token: data.token, channel: data.channel });

      await getAccountData();
    } catch (error) {
      toast.error(error);
    }
  }

  async function loginToTalkee() {
    if (authChannel.value === "mixin") {
      const resp = await talkeeLogin(authStore.getToken(), "", "");
      authStore.setTalkeeAuth({ token: resp.access_token, channel: authChannel.value });
    } else {
      try {
        const data = await passport.auth({
          origin: "Pando Developer Console",
          authMethods: ["metamask", "walletconnect", "mixin"],
          clientId: env.public.talkeeClientID,
          scope: "PROFILE:READ ASSETS:READ",
          pkce: true,
          mvmAuthType: "SignedMessage",
          hooks: {
            beforeSignMessage: async () => {
              return {
                statement: "You'll login to Talkee by the signature",
                expirationTime: new Date(
                  new Date().getTime() + 1000 * 60 * 3
                ).toISOString(),
              };
            },
            afterSignMessage: async ({ message, signature }) => {
              const resp = await talkeeLogin("", message, signature);
              return resp.access_token;
            },
          }
        });

        if (data.channel === "mixin" || data.channel === "fennec") {
          const resp = await talkeeLogin(data.token, "", "");
          authStore.setTalkeeAuth({ token: resp.access_token, channel: data.channel });
        } else {
          authStore.setTalkeeAuth({ token: data.token, channel: data.channel });
        }
      } catch (error) {
        toast.error(error);
      }
    }
    await getTalkeeData();
  }

  function logout() {
    authStore.logout();
  }

  function logoutTalkee() {
    authStore.clearTalkeeAuth();
  }

  async function sync() {
    initing.value = true;

    try {
      const tokenLocale = authStore.token;
      const channelLocale = authStore.channel;

      if (!channelLocale) {
        authStore.clearAuth();

        return;
      }

      const data = await passport.sync({
        channel: channelLocale,
        token: tokenLocale,
      });

      authStore.setAuth({ token: data.token, channel: data.channel });
    } catch (error) {
      logout();
    }

    initing.value = false;
  }

  async function getAccountData() {
    if (!logged.value) return;

    accountStore.loading = true;

    try {
      await Promise.all([
        accountStore.loadMe(),
        assetStore.loadAssets(),
      ]);
    } catch (error) {
      toast.error(error);
    }

    accountStore.loading = false;
  }

  async function getTalkeeData() {
    try {
      await Promise.all([
        talkeeDataStore.loadSites(),
      ]);
    } catch (error) {
      toast.error(error);
    }
  }

  async function init() {
    await sync();
    if (logged.value) {
      await getAccountData();
    }
  }

  return {
    // state
    isMVM,
    talkeeLogged,
    logged,
    logging,
    displayName,
    displayAvatar,
    authChannel,

    // actions
    init,
    login,
    loginToTalkee,
    logout,
    logoutTalkee,
    getAccountData,
    getTalkeeData,
  };
}
