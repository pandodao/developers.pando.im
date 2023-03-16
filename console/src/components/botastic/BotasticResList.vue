<template>
  <VSheet class="mb-4 rounded-sm" color="greyscale_7" elevation="1">
    <div class="d-flex align-center">
      <div class="text-overline pl-4 text-greyscale_3 ">{{ t("botastic.resources") }}</div>
      <VSpacer />
    </div>
    <FDivider class="" color="red"/>
    <div class="pa-4 pb-2">
      <a href="https://developers.pando.im/references/botastic/api.html" title="API References" target="_blank">
        <FButton variant="outlined" size="small" color="greyscale_2" class="rounded-sm mr-2 mb-2">{{ t("botastic.resources.api_references") }}</FButton>
      </a>
    </div>
  </VSheet>
</template>

<script lang="ts">
export default {
  name: "BotasticResList",
};
</script>

<script setup lang="ts">
const { t } = useI18n({ useScope: "local" });

</script>

<style lang="scss" scoped>

</style>
