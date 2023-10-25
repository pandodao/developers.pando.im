<template>
  <div class="narrow-page pa-4">
    <VSheet class="pa-4 mb-4 rounded-sm" color="greyscale_7" elevation="1">
      <h3 class="text-h5 font-weight-bold mb-2">{{ t("welcome.title") }}</h3>
      <div class="text-body-1 text-greyscale_3 mb-4">
        {{ t("welcome.text") }}
      </div>
      <div>
        <a href="https://developers.pando.im/" target="_blank">
          <FButton color="primary" rounded="sm" >{{ t("documents") }}</FButton>
        </a>
      </div>
    </VSheet>

    <VSheet class="pa-4 mb-4 rounded-sm" color="greyscale_7" elevation="1">
      <div class="d-flex mb-3 justify-begin">
        <img class="mr-1" :src="servIcons.fswapIcon" :width="24" :height="24" />
        <img class="mr-1" :src="servIcons.leafIcon" :width="24" :height="24" />
        <img class="mr-1" :src="servIcons.ringsIcon" :width="24" :height="24" />
      </div>
      <h3 class="text-h6 mb-2">{{ t("welcome.title.defi") }}</h3>
      <div class="text-body-1 text-greyscale_3 mb-4">
        {{ t("welcome.text.defi") }}
      </div>
      <div>
        <a href="https://developers.pando.im/guide/getting-started.html" target="_blank" class="mr-2">
          <FButton variant="outlined" color="primary" rounded="sm" >{{ t("documents.defi.tutorial") }}</FButton>
        </a>
        <a href="https://developers.mixin.one" target="_blank" class="mr-2">
          <FButton variant="outlined" color="primary" rounded="sm" >{{ t("documents.mixin") }}</FButton>
        </a>
      </div>

    </VSheet>

    <VSheet class="pa-4 mb-4 rounded-sm" color="greyscale_7" elevation="1">
      <div class="d-flex mb-3 justify-begin">
        <img class="mr-1" :src="servIcons.botasticIcon" :width="24" :height="24" />
      </div>
      <h3 class="text-h6 mb-2">{{ t("welcome.title.botastic") }}</h3>
      <div class="text-body-1 text-greyscale_3 mb-4">
        {{ t("welcome.text.botastic") }}
      </div>
      <div>
        <a href="./botastic" class="mr-2">
          <FButton variant="outlined" color="primary" rounded="sm" >{{ t("getting_started") }}</FButton>
        </a>
        <a href="https://developers.pando.im/references/botastic/api.html" target="_blank" class="mr-2">
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
import servIcons from "@/assets/images/services";

const { t } = useI18n({ useScope: "local" });
onMounted(async () => {
});
</script>

<style lang="scss" scoped>

</style>