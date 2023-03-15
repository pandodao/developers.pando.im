<template>
  <div>
    <div class="mb-4 rounded-sm">
      <div class="">
        <div class="d-flex align-center text-body-1 font-weight-medium">
          <div class="font-weight-bold">{{ app.name }}</div>
          <VSpacer />
          <VBtn variant="plain" icon class="copy-btn" rounded="0" size="x-small" @click="openEditDialog">
            <VIcon color="link">$IconEdit</VIcon>
          </VBtn>
        </div>
        <div class="d-flex align-center text-body-1 text-greyscale_3">
          <div class="font-fix-width">{{ t("botastic.app_id", { app_id: app.app_id }) }}</div>
          <VSpacer />
          <VBtn variant="plain" icon class="copy-btn" rounded="0" size="x-small" @click="copyAppID">
            <VIcon color="link">$IconCopy</VIcon>
          </VBtn>
        </div>
        <div class="d-flex align-center text-body-1 text-greyscale_3">
          <div class="font-fix-width">{{ t("botastic.app_secret", { app_secret: shorter(app.app_secret) }) }}</div>
          <VSpacer />
          <VBtn variant="plain" icon class="copy-btn" rounded="0" size="x-small" @click="copyAppSecret">
            <VIcon color="link">$IconCopy</VIcon>
          </VBtn>
        </div>
      </div>
    </div>

    <FModal v-model="showEditDialog" desktop="dialog" offset="16" :title="t('edit')">
      <div class="pb-4">
        <div class="pa-4 mb-4">
          <VRow dense>
            <VCol cols="12">
              <FInput v-model="nameInputValue" :label="t('botastic.name')" :placeholder="t('botastic.name.placeholder')" />
            </VCol>
            <VCol cols="12" class="text-center">
              <FButton color="primary" rounded="sm" :disabled="!validatedEdit" @click="saveEdit">{{ $t("save") }}</FButton>
            </VCol>
          </VRow>
        </div>
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
import { updateApp } from "@/services/botastic";
import { useClipboard } from "@vueuse/core";

const { t } = useI18n({ useScope: "local" });
const botasticDataStore = useBotasticDataStore();
const toast = useToast();

const showEditDialog = ref(false);
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
  updateApp(props.app.id, nameInputValue.value).then(() => {
    botasticDataStore.updateApp(props.app.id, nameInputValue.value);
    showEditDialog.value = false;
  });
}

function openEditDialog() {
  nameInputValue.value = props.app.name;
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
</script>

<style lang="scss" scoped>

.control {
  margin: 0 -28px;
}



</style>