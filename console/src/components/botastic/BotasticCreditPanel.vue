<template>
  <VSheet class="mb-4 rounded-sm" color="greyscale_7" elevation="1">
    <div class="d-flex align-end px-4 pt-1 pb-2">
      <div>
        <div class="text-overline">{{ t("credits") }}</div>
        <div class="text-h5">{{ credits }}</div>
      </div>
      <VSpacer />
      <FButton color="greyscale_2" class="rounded-sm" disabled>{{ t("topup") }}</FButton>
    </div>
    <div class="text-right text-caption text-greyscale_3 px-4 pb-2">
      {{ t("botastic.credits.hint_disabled") }}
    </div>
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

const  { credits } = storeToRefs(botasticDataStore);

</script>

<style lang="scss" scoped>

</style>
