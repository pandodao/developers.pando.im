import { getAssets, getAsset } from "@/services/mixin";
import { usePassport as _usePassport, isMVM as _isMVM } from "@foxone/mixin-passport/lib/helper";

export const useAssetStore = defineStore("asset", () => {
  // states
  const assets = ref<Record<string, Mixin.Asset>>({});
  const loading = ref(false);

  const passport = _usePassport();

  // getters
  const assetById = computed(() => {
    return (assetId: string) => {
      if (Object.prototype.hasOwnProperty.call(assets.value, assetId)) {
        return Object.assign({}, assets.value[assetId]);
      }
      return null;
    };
  });

  const sortedAssets = computed(() => {
    const arr = Object.values(assets.value);
    arr.sort((a, b) => {
      const av = Number(a.balance) * Number(a.price_usd);
      const bv = Number(b.balance) * Number(b.price_usd);
      if (av > bv) {
        return -1;
      } else if (av < bv) {
        return 1;
      }
      return 0;
    });
    return arr;
  });

  // actions
  function addAsset(asset: Mixin.Asset) {
    const um = Object.assign({}, assets.value);
    um[asset.asset_id] = asset;
    um[asset.asset_id].id = asset.asset_id;
    um[asset.asset_id].logo = asset.icon_url;
    um[asset.asset_id].last_updated_ts = Date.now();
    assets.value = um;
  }

  function addAssets(newAssets: Mixin.Asset[]) {
    const um = Object.assign({}, assets.value);
    for (let ix = 0; ix < newAssets.length; ix++) {
      const ele = newAssets[ix];
      um[ele.asset_id] = ele;
      um[ele.asset_id].id = ele.asset_id;
      um[ele.asset_id].logo = ele.icon_url;
      um[ele.asset_id].last_updated_ts = Date.now();
    }
    assets.value = um;
  }

  async function loadAssets() {
    loading.value = true;
    const resp = await passport.getAssets();
    // const resp = await getAssets();
    addAssets(resp);
    console.log(resp);
    loading.value = false;
    return resp;
  }

  async function loadAsset(assetId: string) {
    const asset = await passport.getAsset(assetId);
    // const asset = await getAsset(assetId);
    addAsset(asset);
    return asset;
  }


  return {
    // states
    assets,
    loading,

    // getters
    assetById,
    sortedAssets,

    // actions
    loadAssets,
    loadAsset,
  };
}, { persist: { paths: ["assets"] } }
);
