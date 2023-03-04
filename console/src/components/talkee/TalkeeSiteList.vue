<template>
  <div>
    <VSheet class="d-flex align-center">
      <div class="text-overline pl-0 text-greyscale_3 ">{{ t("talkee.sites") }}</div>
      <VSpacer />
      <FButton size="small" variant="text" text rounded="0" @click="openNewDialog">
        <VIcon>$IconPlus</VIcon>
        <span class="ml-1">{{ t("talkee.new") }}</span>
      </FButton>
    </VSheet>
    <FDivider class="mb-4"/>

    <div v-if="sites.length">
      <div  v-for="item in sites" class="list-item pr-0 mb-4" :key="`site-${item.id}`">
        <TalkeeSiteItem :site="item" />
      </div>
    </div>
    <div v-else class="text-body-1 text-greyscale_3 text-center mt-10">
      {{ t("talkee.no_site") }}
    </div>

    <VSheet class="d-flex align-center">
      <div class="text-overline pl-0 text-greyscale_3 ">{{ t("talkee.resources") }}</div>
      <VSpacer />
    </VSheet>
    <FDivider class="mb-4"/>
    <div>
      <a href="https://developers.pando.im/guide/talkee.html" title="Install Guide" target="_blank">
        <FButton variant="tonal" size="small" color="greyscale_2" class="rounded-sm mr-2 mb-2">{{ t("talkee.resources.install_guide") }}</FButton>
      </a>
      <a href="https://developers.pando.im/references/talkee/api.html" title="API References" target="_blank">
        <FButton variant="tonal" size="small" color="greyscale_2" class="rounded-sm mr-2 mb-2">{{ t("talkee.resources.api_references") }}</FButton>
      </a>
      <a href="https://talkee.pando.im/demo.html" title="Comment Demo" target="_blank">
        <FButton variant="tonal" size="small" color="greyscale_2" class="rounded-sm mr-2 mb-2">{{ t("talkee.resources.comment_demo") }}</FButton>
      </a>
      <a href="https://talkee.pando.im/demo-chat.html" title="Chat Demo" target="_blank">
        <FButton variant="tonal" size="small" color="greyscale_2" class="rounded-sm mr-2 mb-2">{{ t("talkee.resources.chat_demo") }}</FButton>
      </a>
    </div>

    <FModal v-model="showNewDialog" desktop="dialog" offset="16" :title="'Edit'">
      <div class="pb-4">
        <div class="pa-4 mb-4">
          <VRow dense>
            <VCol cols="12">
              <FInput v-model="nameInputValue"  :label="t('talkee.site_name')" :placeholder="t('talkee.site_name.placeholder')"  />
            </VCol>
            <VCol cols="12">
              <FInput v-model="originInputValue" :label="t('talkee.origin')" :placeholder="t('talkee.origin.placeholder')"  :error-messages="originInputErrors"/>
            </VCol>
            <VCol cols="12" class="text-center">
              <FButton color="primary" rounded="sm" :disabled="!validatedEdit" @click="createSite">{{ $t("create") }}</FButton>
            </VCol>
          </VRow>
        </div>
      </div>
    </FModal>

  </div>
</template>

<script lang="ts">
export default {
  name: "TalkeeSiteList",
};
</script>

<script setup lang="ts">
import { addSite  } from "@/services/talkee";
const { t } = useI18n({ useScope: "local" });

const talkeeDataStore = useTalkeeDataStore();
const showNewDialog = ref(false);
const nameInputValue = ref("");
const originInputValue = ref("");

const sites = computed(() => {
  return talkeeDataStore.sites;
});

const emit = defineEmits({
  click: (item: any) => true,
})

const originInputErrors = computed(() => {
  if (!originInputValue.value) return [];
  const errors = [];
  if (!originInputValue.value.startsWith("https://") && !originInputValue.value.startsWith("http://")) {
    errors.push(t("talkee.origins.error_msg"));
  }
  return errors;
});

const validatedEdit = computed(() => {
  return originInputErrors.value.length === 0 && nameInputValue.value.length > 0;
});

function createSite() {
  addSite(nameInputValue.value, originInputValue.value).then((resp) => {
    talkeeDataStore.addSite(resp);
    showNewDialog.value = false;
  });
}

function openNewDialog() {
  originInputValue.value = "";
  nameInputValue.value = "";
  showNewDialog.value = true;
}

onMounted(() => {
  // console.log("AssetList mounted", props.items?.length);
});
</script>

<style lang="scss" scoped>
.block {
  flex: 1;
}
.list-item {
  min-height: 64px;
}
</style>
