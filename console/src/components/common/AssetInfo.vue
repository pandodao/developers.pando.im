<template>
  <div class="asset-info py-3 px-4 rounded" :class="fullsize ? 'fullsize': ''">
    <div v-if="asset" class="d-flex align-center">
      <div>
        <VImg :src="asset.icon_url" :height="iconSize" :width="iconSize" class="rounded-sm" />
      </div>
      <div class="d-flex flex-column ml-3">
        <div class="text-body-1 font-weight-bold">{{
          fmtAmount(amount)
        }} {{ asset.symbol }}</div>
        <div class="text-caption text-greyscale_3">{{ fiat }}</div>
      </div>
      <div class="transactions">

      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "AssetInfo",
};
</script>

<script setup lang="ts">

const props = defineProps({
  asset: {
    type: Object,
    default: null,
  },
  amount: {
    type: String,
    default: "0",
  },
  fullsize: {
    type: Boolean,
    default: false,
  },
});

const fiat = computed(() => {
  return useCurrency<string>(Number(props.amount) * Number(props.asset?.price_usd ?? 0)).value;
});

const iconSize = computed(() => {
  return props.fullsize ? 48 : 32;
});

onMounted(() => {
})

</script>

<style lang="scss" scoped>
.asset-info {
  background: rgba(var(--v-theme-greyscale_6));
  &.fullsize {
    background: white;
  }
}
</style>
