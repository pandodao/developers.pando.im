<template>
  <div>
    <VSheet class="d-flex align-center">
      <div class="text-overline pl-0 text-greyscale_3 ">Sites</div>
      <VSpacer />
      <FButton size="small" variant="text" text rounded="0" @click="openNewDialog">
        <VIcon>$IconPlus</VIcon>
        <span class="ml-1">New</span>
      </FButton>
    </VSheet>
    <FDivider class="mb-4"/>

    <div v-if="sites.length">
      <div  v-for="item in sites" class="list-item pr-0 mb-4" :key="`site-${item.id}`">
        <TalkeeSiteItem :site="item" />
      </div>
    </div>
    <div v-else class="text-body-1 text-greyscale_3 text-center mt-10">
      {{ "No site." }}
    </div>

    <VSheet class="d-flex align-center">
      <div class="text-overline pl-0 text-greyscale_3 ">Resources</div>
      <VSpacer />
    </VSheet>
    <FDivider class="mb-4"/>
    <div>
      <a href="https://developers.pando.im/guide/talkee" title="Install Guide" target="_blank">
        <FButton variant="tonal" size="small" color="greyscale_2" class="rounded-sm mr-2 mb-2">Install Guide</FButton>
      </a>
      <a href="https://developers.pando.im/references/talkee/api" title="API References" target="_blank">
        <FButton variant="tonal" size="small" color="greyscale_2" class="rounded-sm mr-2 mb-2">API References</FButton>
      </a>
      <a href="https://talkee.pando.im/demo.html" title="Comment Demo" target="_blank">
        <FButton variant="tonal" size="small" color="greyscale_2" class="rounded-sm mr-2 mb-2">Comment Demo</FButton>
      </a>
      <a href="https://talkee.pando.im/demo-chat.html" title="Chat Demo" target="_blank">
        <FButton variant="tonal" size="small" color="greyscale_2" class="rounded-sm mr-2 mb-2">Chat Demo</FButton>
      </a>
    </div>

    <FModal v-model="showNewDialog" desktop="dialog" offset="16" :title="'Edit'">
      <div class="pb-4">
        <div class="pa-4 mb-4">
          <VRow dense>
            <VCol cols="12">
              <FInput v-model="nameInputValue" label="Name" placeholder="Your website name" />
            </VCol>
            <VCol cols="12">
              <FInput v-model="originInputValue" label="Origin" placeholder="e.g. https://abc.com" :error-messages="originInputErrors"/>
            </VCol>
            <VCol cols="12" class="text-center">
              <FButton color="primary" rounded="sm" :disabled="!validatedEdit" @click="createSite">{{ $t("common.create") }}</FButton>
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
    errors.push("Origin must start with 'https://' or 'http://'.");
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
