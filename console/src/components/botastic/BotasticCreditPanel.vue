<template>
  <VSheet class="mb-4 rounded-sm" color="greyscale_7" elevation="1">
    <div class="d-flex align-end px-4 pt-1 pb-4">
      <div>
        <div class="text-overline">{{ t("credits") }}</div>
        <div class="text-h5">{{ credits }}</div>
      </div>
      <VSpacer />
      <FButton color="botastic" class="rounded-sm" @click="showTopupDialog = true">{{ t("topup") }}</FButton>
    </div>

    <FModal v-model="showTopupDialog" desktop="dialog" offset="16" :title="t('topup')">
      <div class="pb-4">
        <div class="text-h6 text-center">{{ t("topup.dialog_title") }}</div>
        <VRow dense class="pa-4 mb-2">
          <VCol cols="12" class="text-center">
            <VBtnToggle v-model="topupUsd" variant="outlined" mandatory divided>
              <VBtn v-for="item in amountOptions" :key="item.label">{{ item.label }}</VBtn>
            </VBtnToggle>
          </VCol>
        </VRow>
        <div class="px-0">
          <VRow class="pa-4">
            <!-- <VCol cols="12" class="d-flex">
              <div class="mr-2">
                <div class="text-caption text-greyscale_3 font-weight-bold">{{ $t("pay.credit_card") }}</div>
                <div class="text-body-2">{{ $t("pay.credit_card.desc") }}</div>
              </div>
              <VSpacer />
              <FButton color="botastic" rounded="sm" :disabled="!leomonPayAvailable" @click="payLemon">{{ $t("pay") }}</FButton>
            </VCol> -->
            <VCol cols="12" class="d-flex">
              <div class="mr-2">
                <div class="text-caption text-greyscale_3 font-weight-bold">{{ $t("pay.mixpay") }}</div>
                <div class="text-body-2">{{ $t("pay.mixpay.desc") }}</div>
              </div>
              <VSpacer />
              <FButton color="botastic" variant="tonal" rounded="sm" @click="payMixpay">{{ $t("pay") }}</FButton>
            </VCol>
          </VRow>
        </div>
      </div>
    </FModal>

  </VSheet>
</template>

<script lang="ts">
export default {
  name: "BotasticCreditPanel",
};
</script>

<script setup lang="ts">
import { storeToRefs } from "pinia";
const { t } = useI18n({ useScope: "local" });

const botasticDataStore = useBotasticDataStore();

const payment = usePayment();

const  { credits, variants } = storeToRefs(botasticDataStore);

const showTopupDialog = ref(false);

const topupUsd = ref(0);

const amountOptions = computed(() => {
  return variants.value.map((v) => {
    return {
      label: v.name,
      amount: v.amount,
      lemon_id: v.lemon_id,
    }
  }).sort((a, b) => b.amount - a.amount);
});

const leomonPayAvailable = computed(() => {
  return amountOptions.value[topupUsd.value].lemon_id !== 0;
});

function payMixpay() {
  payment.payWithMixpay(amountOptions.value[topupUsd.value].amount);
}

// function payLemon() {
//   const variantId = amountOptions.value[topupUsd.value].lemon_id
//   payment.payWithLemon(variantId);
// }

</script>

<style lang="scss" scoped>

</style>
