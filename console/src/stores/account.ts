import { getMe } from "@/services/mixin";

export const useAccountStore = defineStore(
  "account",
  () => {
    // states
    const profile = ref<any>();
    const assets = ref<Mixin.Asset[]>([]);
    const loading = ref(false);

    // getters
    const balance = computed(() =>
      assets.value.reduce((total, next) => {
        return total + +next.price_usd * +next.balance;
      }, 0)
    );

    // actions
    async function loadMe() {
      profile.value = await getMe();
    }

    function clearAccountData() {
      assets.value = [];
      profile.value = undefined;
    }

    return {
      // states
      profile,
      assets,
      loading,

      // getters

      // actions
      loadMe,
      clearAccountData,
    };
  },
  { persist: { paths: ["profile", "assets"] } }
);
