import { usePassport as _usePassport, isMVM as _isMVM } from "@foxone/mixin-passport/lib/helper";
import type { AuthMethod } from "@foxone/uikit/types";
import { login as talkeeLogin } from "@/services/talkee";
import { loginMixin as botasticLogin, loginTwitter as botasticLoginTwitter } from "@/services/botastic";

export function useAccount() {
  const passport = _usePassport();
  const authStore = useAuthStore();
  const accountStore = useAccountStore();
  const assetStore = useAssetStore();
  const talkeeDataStore = useTalkeeDataStore();
  const botasticDataStore = useBotasticDataStore();

  const toast = useToast();
  const env = useRuntimeConfig();

  const initing = ref(true);

  const logging = computed(() => authStore.loading || accountStore.loading);
  const servicesLogged = computed(() => authStore.servicesLogged);

  async function loginToTalkee() {
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
        authStore.setServiceAuth("talkee", { token: resp.access_token, channel: data.channel });
      } else {
        authStore.setServiceAuth("talkee", { token: data.token, channel: data.channel });
      }
    } catch (error) {
      toast.error(error);
    }
    await getTalkeeData();
  }

  async function loginToBotastic() {
    try {
      const data = await passport.auth({
        origin: "Pando Developer Console",
        authMethods: ["metamask", "walletconnect", "mixin"],
        clientId: env.public.botasticClientID,
        scope: "PROFILE:READ ASSETS:READ",
        pkce: true,
        mvmAuthType: "SignedMessage",
        hooks: {
          beforeSignMessage: async () => {
            return {
              statement: "You'll login to Botastic by the signature",
              expirationTime: new Date(
                new Date().getTime() + 1000 * 60 * 3
              ).toISOString(),
            };
          },
          afterSignMessage: async ({ message, signature }) => {
            const resp = await botasticLogin("", message, signature);
            return resp.access_token;
          },
        }
      });

      if (data.channel === "mixin" || data.channel === "fennec") {
        const resp = await botasticLogin(data.token, "", "");
        authStore.setServiceAuth("botastic", { token: resp.access_token, channel: data.channel });
      } else {
        authStore.setServiceAuth("botastic", { token: data.token, channel: data.channel });
      }
    } catch (error) {
      toast.error(error);
    }
    await getBotasticData();
  }

  async function loginToBotasticWithTwitter(oauthToken: string, oauthVerifier: string) {
    const data = await botasticLoginTwitter(oauthToken, oauthVerifier);
    authStore.setServiceAuth("botastic", { token: data.access_token, channel: "twitter" });
    await getBotasticData();
  }

  function logout() {
    authStore.logout();
  }

  function logoutServ(servName: string) {
    authStore.clearServiceAuth(servName);
  }

  async function sync() {
    initing.value = true;
    const servs = ["talkee", "botastic"]
    try {
      for (let ix = 0; ix < servs.length; ix++) {
        const serv = servs[ix];
        const tokenLocale = authStore.serviceTokens[serv];
        const channelLocale = authStore.serviceChannels[serv];

        if (!channelLocale) {
          authStore.clearServiceAuth(serv);
          return;
        }

        const data = await passport.sync({
          channel: channelLocale as any,
          token: tokenLocale,
        });

        authStore.setServiceAuth(serv, { token: data.token, channel: data.channel });
      }
    } catch (error) {
      logout();
    }

    initing.value = false;
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

  async function getBotasticData() {
    try {
      await Promise.all([
        botasticDataStore.loadMe(),
        botasticDataStore.loadApps(),
        botasticDataStore.loadBots(),
        botasticDataStore.loadVariants(),
      ]);
    } catch (error) {
      toast.error(error);
    }
  }

  async function init() {
    await sync();
  }

  return {
    // state
    servicesLogged,
    logging,

    // actions
    init,
    loginToTalkee,
    loginToBotastic,
    loginToBotasticWithTwitter,

    logout,
    logoutServ,
    getTalkeeData,
    getBotasticData,
  };
}
