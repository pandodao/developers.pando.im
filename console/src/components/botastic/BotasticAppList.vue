<template>
  <VSheet class="mb-4 rounded-sm" color="greyscale_7" elevation="1">
    <div class="d-flex align-center">
      <div class="text-overline pl-4 text-greyscale_3 ">{{ t("botastic.apps") }}</div>
      <VSpacer />
      <div class="pa-1">
        <FButton v-if="!reachLimit" size="small" variant="plain" class="rounded-sm" @click="openNewDialog">
          <VIcon>$IconPlus</VIcon>
        </FButton>
      </div>
    </div>

    <FDivider />

    <div v-if="apps.length" class="pa-4 pb-1">
      <div v-for="item in apps" class="list-item pr-0 mb-4" :key="`app-${item.id}`">
        <BotasticAppItem :app="item" />
      </div>
    </div>
    <div v-else class="text-body-1 text-greyscale_3 text-center py-4">
      {{ t("botastic.no_app") }}
    </div>

    <FModal v-model="showNewDialog" desktop="dialog" offset="16" :title="'Edit'">
      <div class="pb-4">
        <div class="pa-4 mb-4">
          <VRow dense>
            <VCol cols="12">
              <FInput v-model="nameInputValue"  :label="t('botastic.name')" :placeholder="t('botastic.name.placeholder')"  />
            </VCol>
            <VCol cols="12" class="text-center">
              <FButton color="primary" rounded="sm" :disabled="!validatedEdit" @click="createApp">{{ $t("create") }}</FButton>
            </VCol>
          </VRow>
        </div>
      </div>
    </FModal>

  </VSheet>
</template>

<script lang="ts">
export default {
  name: "BotasticAppList",
};
</script>

<script setup lang="ts">
import { addApp  } from "@/services/botastic";
const { t } = useI18n({ useScope: "local" });

const botasticDataStore = useBotasticDataStore();
const showNewDialog = ref(false);
const nameInputValue = ref("");

const apps = computed(() => {
  return botasticDataStore.apps;
});

const emit = defineEmits({
  click: (item: any) => true,
})

const validatedEdit = computed(() => {
  return nameInputValue.value.length > 0;
});

const reachLimit = computed(() => {
  return apps.value.length >= 3;
});

function createApp() {
  addApp(nameInputValue.value).then((resp) => {
    botasticDataStore.addApp(resp);
    showNewDialog.value = false;
  });
}

function openNewDialog() {
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
}
</style>
