<template>
  <VSheet class="mb-4 rounded-sm" color="greyscale_7" elevation="1">
    <div class="d-flex align-center">
      <div class="text-overline pl-4 text-greyscale_3 ">{{ t("talkee.resources") }}</div>
      <VSpacer />
    </div>
    <FDivider/>
    <div class="pa-4 pb-2">
      <a href="https://developers.pando.im/guide/talkee.html" title="Install Guide" target="_blank">
        <FButton variant="outlined" size="small" color="greyscale_2" class="rounded-sm mr-2 mb-2">{{ t("talkee.resources.install_guide") }}</FButton>
      </a>
      <a href="https://developers.pando.im/references/talkee/api.html" title="API References" target="_blank">
        <FButton variant="outlined" size="small" color="greyscale_2" class="rounded-sm mr-2 mb-2">{{ t("talkee.resources.api_references") }}</FButton>
      </a>
      <a href="https://developers.pando.im/demo/comment-demo.html" title="Comment Demo" target="_blank">
        <FButton variant="outlined" size="small" color="greyscale_2" class="rounded-sm mr-2 mb-2">{{ t("talkee.resources.comment_demo") }}</FButton>
      </a>
      <a href="https://developers.pando.im/demo/chat-demo.html" title="Chat Demo" target="_blank">
        <FButton variant="outlined" size="small" color="greyscale_2" class="rounded-sm mr-2 mb-2">{{ t("talkee.resources.chat_demo") }}</FButton>
      </a>
    </div>
  </VSheet>
</template>

<script lang="ts">
export default {
  name: "TalkeeResList",
};
</script>

<script setup lang="ts">
const { t } = useI18n({ useScope: "local" });

</script>

<style lang="scss" scoped>

</style>
