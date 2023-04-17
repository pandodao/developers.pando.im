<template>
  <div class="item">
    <div class="d-flex align-center" @click="showActionsDialog = true">
      <div class="">
        <div class="d-flex align-center text-body-1 font-weight-medium">
          <div class="font-weight-medium">{{ app.name }}</div>
          <!-- <VBtn variant="plain" icon class="copy-btn" rounded="0" size="x-small" @click="openEditDialog">
            <VIcon color="link">$IconEdit</VIcon>
          </VBtn> -->
        </div>
        <div class="d-flex align-center text-body-1 text-greyscale_3">
          <div class="font-fix-width">{{ t("botastic.app_id", { app_id: shorter(app.app_id) }) }}</div>
          <!-- <VBtn variant="plain" icon class="copy-btn" rounded="0" size="x-small" @click="copyAppID">
            <VIcon color="link">$IconCopy</VIcon>
          </VBtn> -->
        </div>
        <div class="d-flex align-center text-body-1 text-greyscale_3">
          <div class="font-fix-width">{{ t("botastic.app_secret", { app_secret: shorter(app.app_secret) }) }}</div>
          <!-- <VBtn variant="plain" icon class="copy-btn" rounded="0" size="x-small" @click="copyAppSecret">
            <VIcon color="link">$IconCopy</VIcon>
          </VBtn> -->
        </div>
      </div>
      <VSpacer />
      <VIcon color="greyscale_3" size="16">$IconChevronRight</VIcon>
    </div>

    <FModal v-model="showEditDialog" desktop="dialog" offset="16" :title="t('edit')">
      <div class="pb-4">
        <div class="pa-4 mb-4">
          <VRow dense>
            <VCol cols="12">
              <FInput v-model="nameInputValue" :label="t('botastic.name')" :placeholder="t('botastic.name.placeholder')" />
            </VCol>
            <VCol cols="12" class="text-center">
              <FButton color="botastic" rounded="sm" :disabled="!validatedEdit" @click="saveEdit">{{ $t("save") }}</FButton>
            </VCol>
          </VRow>
        </div>
      </div>
    </FModal>

    <FModal v-model="showDeleteDialog" desktop="dialog" offset="16" :title="t('confirm')">
      <div class="px-4 pb-4 text-center">
        <div class="text-body-1 mb-4">{{ t("botastic.delete_app.confirm_text") }}</div>
        <VRow>
          <VCol cols="6">
            <FButton variant="tonal" block @click="showDeleteDialog = true">{{ t("cancel") }}</FButton>
          </VCol>
          <VCol cols="6">
            <FButton color="error" block @click="doDeleteApp">{{ t("delete") }}</FButton>
          </VCol>
        </VRow>
      </div>
    </FModal>

    <FModal v-model="showActionsDialog" desktop="dialog" offset="16" :title="t('actions')">
      <div class="pa-4 pb-6">
        <VRow dense>
          <VCol cols="12" class="font-weight-bold">
            {{ app.name }}
          </VCol>
          <VCol cols="12" class="d-flex align-center">
            <div>
              <div class="text-body-2 mr-2">{{ t("botastic.app_id", { app_id: app.app_id }) }}</div>
            </div>
            <VSpacer />
            <FButton color="botastic" variant="tonal" size="small" rounded="sm" @click="copyAppID">{{ $t("copy") }}</FButton>
          </VCol>
          <VCol cols="12" class="d-flex align-center">
            <div>
              <div class="app_secret text-body-2 mr-2">{{ t("botastic.app_secret", { app_secret: app.app_secret }) }}</div>
            </div>
            <VSpacer />
            <FButton color="botastic" variant="tonal" size="small" rounded="sm" @click="copyAppSecret">{{ $t("copy") }}</FButton>
          </VCol>
          <VCol cols="12" class="d-flex align-center mb-4">
            <div>
              <div class="text-body-2 mr-2">{{ t("botastic.edit_app.text") }}</div>
            </div>
            <VSpacer />
            <FButton color="botastic" variant="tonal" size="small" rounded="sm" @click="openEditDialog">{{ $t("edit") }}</FButton>
          </VCol>
          <VCol cols="12" class="d-flex align-center">
            <div class="text-body-2 mr-2">{{ t("botastic.delete_app.text") }}</div>
            <VSpacer />
            <FButton color="error" variant="outlined" size="small" rounded="sm" @click="openDeleteDialog">{{ $t("delete") }}</FButton>
          </VCol>
        </VRow>
      </div>
    </FModal>
  </div>
</template>

<script lang="ts">
export default {
  name: "BotasticAppItem"
};
</script>

<script setup lang="ts">
import { updateApp, deleteApp } from "@/services/botastic";
import { useClipboard } from "@vueuse/core";

const { t } = useI18n({ useScope: "local" });
const { getBotasticData } = useAccount();
const botasticDataStore = useBotasticDataStore();
const toast = useToast();

const showEditDialog = ref(false);
const showActionsDialog = ref(false);
const showDeleteDialog = ref(false);
const nameInputValue = ref("");

const props = defineProps({
  app: {
    type: Object,
    default: null,
  },
});

const validatedEdit = computed(() => {
  return nameInputValue.value.length > 0;
});


function saveEdit() {
  if (!props.app) return;
  updateApp(props.app.app_id, nameInputValue.value).then(() => {
    botasticDataStore.updateApp(props.app.id, nameInputValue.value);
    showEditDialog.value = false;
  });
}

function openEditDialog() {
  nameInputValue.value = props.app.name;
  showActionsDialog.value = false;
  showEditDialog.value = true;
}

function copyAppID() {
  const { copy } = useClipboard({ source: props.app.app_id });
  copy(props.app.app_id);
  toast.success({ message: t("copied") });
}

function copyAppSecret() {
  const { copy } = useClipboard({ source: props.app.app_secret });
  copy(props.app.app_secret);
  toast.success({ message: t("copied") });
}

function shorter(str: string) {
  return str.substring(0, 10) + "..." + str.substring(str.length - 10, str.length);
}

function openDeleteDialog() {
  showDeleteDialog.value = true;
  showActionsDialog.value = false
}

async function doDeleteApp() {
  await deleteApp(props.app.app_id);
  await getBotasticData();
  showDeleteDialog.value = false;
}
</script>

<style lang="scss" scoped>
.item {
  cursor: pointer;
}

.control {
  margin: 0 -28px;
}

.app_secret {
  word-break: break-all;
}
</style>