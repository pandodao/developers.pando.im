<template>
  <FAssetAmountInput
    v-bind="presets"
    :asset="asset"
    :assets="assets"
    :amount="amount"
    class="base-asset-amount-input"
    @update:asset="(v) => $emit('update:asset', v)"
    @update:amount="(v) => $emit('update:amount', v)"
  >
    <template #tools>
      <FAssetInputTools
        :connected="logged"
        :balance="balance"
        :fiat-amount="fiatAmount"
        @fill="() => $emit('update:amount', balance)"
        @connect="() => loggin()"
      />
    </template>
  </FAssetAmountInput>
</template>

<script lang="ts">
export default {
  name: "AssetAmountInput",
};
</script>

<script lang="ts" setup>
import type { PropType } from "vue";

const props = defineProps({
  assets: {
    type: Array as PropType<Pando.SelectAsset<any>[]>,
    default: () => [],
  },
  asset: {
    type: Object as PropType<Pando.SelectAsset<any> | null>,
    default: null,
  },
  amount: {
    type: String,
    default: "",
  },
  balance: {
    type: String,
    default: "0.00",
  }
});

defineEmits({
  "update:asset": (value: Pando.SelectAsset<any> | null) => true,
  "update:amount": (value: string) => true,
});

const presets = { fullfilled: true };

const { logged, loggin } = useAccount();

const assetId = computed(() => props.asset?.id ?? "");

const fiatAmount = computed(() => {
  return useCurrency<string>(Number(props.amount) * Number(props.asset?.price_usd ?? 0)).value;
});

</script>

<style lang="scss" scoped>
.base-asset-amount-input {
  overflow: auto;
}
</style>
