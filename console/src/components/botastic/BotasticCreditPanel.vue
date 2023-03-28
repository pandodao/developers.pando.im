<template>
  <VSheet class="mb-4 rounded-sm" color="greyscale_7" elevation="1">
    <div class="d-flex align-end px-4 pt-1 pb-4">
      <div>
        <div class="text-overline">{{ t("credits") }}</div>
        <div class="text-h5">{{ credits }}</div>
      </div>
      <VSpacer />
      <FButton color="greyscale_2" class="rounded-sm" @click="showTopupDialog = true">{{ t("topup") }}</FButton>
    </div>

    <FModal v-model="showTopupDialog" desktop="dialog" offset="16" :title="t('topup')">
      <div class="pb-4">
        <div class="text-h6 text-center">{{ t("topup.dialog_title") }}</div>
        <VRow dense class="pa-4 mb-2">
          <VCol cols="12" class="text-center">
            <VBtnToggle v-model="topupUsd" variant="outlined" divided>
              <VBtn>$1</VBtn>
              <VBtn>$5</VBtn>
              <VBtn>$10</VBtn>
            </VBtnToggle>
          </VCol>
        </VRow>
        <div class="px-4">
          <VRow class="pa-4">
            <VCol cols="12" class="text-center">
              <FButton color="primary" rounded="sm" block @click="payMixpay">{{ $t("pay.mixpay") }}</FButton>
            </VCol>
            <VCol cols="12" class="text-center">
              <FButton color="primary" variant="outlined" rounded="sm" block :disabled="true">{{ $t("pay.credit_card") }}</FButton>
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

const  { credits } = storeToRefs(botasticDataStore);

const showTopupDialog = ref(false);

const topupUsd = ref(0);

function payMixpay() {
  const amounts =['1', '5', '10']
  payment.payWithMixpay(amounts[topupUsd.value]);
}

</script>

<style lang="scss" scoped>

</style>
