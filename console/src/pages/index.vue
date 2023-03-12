<template>
  <div class="narrow-page pa-4">
    <VSheet rounded class="pa-4">
      <h3 class="text-h5 mb-4">{{ t("welcome.title") }}</h3>
      <div class="text-body-1 text-greyscale_3 mb-4">
        {{ t("welcome.text") }}
      </div>
      <div>
        <a href="https://developers.pando.im/" target="_blank">
          <FButton variant="outlined" color="primary" rounded="sm" >{{ t("documents") }}</FButton>
        </a>
      </div>
    </VSheet>
  </div>
</template>

<script lang="ts">
definePageMeta({
  title: "Developer Console",
});
</script>

<script setup lang="ts">
const { t } = useI18n({ useScope: "local" });
onMounted(async () => {
});
</script>

<style lang="scss" scoped>

</style>