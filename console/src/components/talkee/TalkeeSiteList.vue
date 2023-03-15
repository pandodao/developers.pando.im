<template>
  <VSheet class="mb-4 rounded-sm" color="greyscale_7" elevation="1">
    <div class="d-flex align-center">
      <div class="text-overline pl-4 text-greyscale_3 ">{{ t("talkee.sites") }}</div>
      <VSpacer />
      <div class="pa-1">
        <FButton v-if="!reachLimit" size="small" variant="plain" class="rounded-sm" @click="openNewDialog">
          <VIcon>$IconPlus</VIcon>
        </FButton>
      </div>
    </div>
    <FDivider />
    <div v-if="sites.length" class="pa-4 pb-1">
      <div v-for="item in sites" class="list-item pr-0 mb-2" :key="`site-${item.id}`">
        <TalkeeSiteItem :site="item" />
      </div>
    </div>
    <div v-else class="text-body-1 text-greyscale_3 text-center mt-10">
      {{ t("talkee.no_site") }}
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

  </VSheet>
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

const reachLimit = computed(() => {
  return sites.value.length >= 3;
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
