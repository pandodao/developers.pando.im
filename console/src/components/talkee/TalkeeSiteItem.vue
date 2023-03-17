<template>
  <div>
    <div class="">
      <div class="">
        <div class="font-weight-medium">
          {{ site.name }}
        </div>
        <div class="text-caption text-greyscale_3">
          {{ t("talkee.origins", { origins: site.origins.join(", ") }) }}
        </div>
        <div class="text-caption text-greyscale_3">
          {{ t("talkee.site_id", { site_id: site.id }) }}
        </div>
      </div>
      <div class="control d-flex">
        <FButton variant="plain" color="link" class="edit-btn" rounded="0" size="small" @click="copySiteId">
          <VIcon color="link">$IconCopy</VIcon>
          <span class="ml-1">{{ t("copy") }}</span>
        </FButton>
        <FButton variant="plain" color="link" class="install-btn ml-1" rounded="0" size="small" @click="openInstallDialog">
          <VIcon color="link">$IconBrowserCode</VIcon>
          <span class="ml-1">{{ t("install") }}</span>
        </FButton>
        <VSpacer />
        <FButton variant="plain" color="link" class="copy-btn" rounded="0" size="small" @click="openEditDialog">
          <VIcon color="link">$IconEdit</VIcon>
          <span class="ml-1">{{ t("edit") }}</span>
        </FButton>
      </div>
    </div>

    <FModal v-model="showEditDialog" desktop="dialog" offset="16" :title="t('edit')">
      <div class="pb-4">
        <div class="pa-4 mb-4">
          <VRow dense>
            <VCol cols="12">
              <FInput v-model="nameInputValue" :label="t('talkee.site_name')" :placeholder="t('talkee.site_name.placeholder')" />
            </VCol>
            <VCol cols="12">
              <FInput v-model="originInputValue" :label="t('talkee.origin')" :placeholder="t('talkee.origin.placeholder')" :error-messages="originInputErrors"/>
            </VCol>
            <VCol cols="12" class="text-center">
              <FButton color="primary" rounded="sm" :disabled="!validatedEdit" @click="saveEdit">{{ $t("save") }}</FButton>
            </VCol>
          </VRow>
        </div>
      </div>
    </FModal>

    <FModal v-model="showInstallDialog" desktop="dialog" offset="16" :title="t('talkee.install.title')">
      <div class="pb-4">
        <VSheet class="install-approaches">
          <VExpansionPanels variant="accordion" v-model="expansionMode">
            <VExpansionPanel title="Universal" elevation="0" rounded="0" :ripple="false">
              <VExpansionPanelText>
                <div>
                  <FTextarea class="tijs-textarea" v-model="tijsScript" readonly />
                </div>
                <div class="d-flex text-center">
                  <a href="https://developers.pando.im/guide/talkee.html#installation-universal" target="_blank">
                    <FButton color="primary" variant="outlined" rounded="sm">{{ $t("talkee.install_guide") }}</FButton>
                  </a>
                  <VSpacer />
                  <FButton color="primary" rounded="sm" @click="copyTijs">{{ $t("copy") }}</FButton>
                </div>
              </VExpansionPanelText>
            </VExpansionPanel>
            <VExpansionPanel title="Wordpress Plugin" elevation="0" rounded="0" :ripple="false">
              <VExpansionPanelText>
                {{ t("coming_soon") }}
              </VExpansionPanelText>
            </VExpansionPanel>
            <VExpansionPanel title="Customize" elevation="0" rounded="0" :ripple="false">
              <VExpansionPanelText class="text-body-1">
                <p class="mb-2" v-html="t('talkee.install.customize.hint_1')">
                </p>
                <p v-html="t('talkee.install.customize.hint_2')">
                </p>
              </VExpansionPanelText>
            </VExpansionPanel>
          </VExpansionPanels>
        </VSheet>
      </div>
    </FModal>

  </div>
</template>

<script lang="ts">
export default {
  name: "TalkeeSiteItem"
};
</script>

<script setup lang="ts">
import { editSite } from "@/services/talkee";
import { useClipboard } from "@vueuse/core";

const { t } = useI18n({ useScope: "local" });
const talkeeDataStore = useTalkeeDataStore();
const toast = useToast();

const showEditDialog = ref(false);
const showInstallDialog = ref(false);
const nameInputValue = ref("");
const originInputValue = ref("");

const expansionMode = ref(0);

const props = defineProps({
  site: {
    type: Object,
    default: null,
  },
});

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

const tijsScript = computed(() => {
  // wierd workaround. compiler don't like html close tag in template
  return `$$script src="https://cdn.jsdelivr.net/npm/@foxone/talkee-install-js@0.1.2/dist/ti.min.js">$$/script>
$$script>
  window.tijs({
    siteId: ${props.site.id},
    chainId: 1,
    authMethods: ["metamask", "walletconnect", "onekey", "mixin", "fennec"],
  });
$$/script>`.replace(/\$\$/g, "<");
});

function saveEdit() {
  if (!props.site) return;
  if (originInputValue.value.endsWith("/")) {
    originInputValue.value = originInputValue.value.slice(0, -1);
  }
  editSite(props.site.id, nameInputValue.value, originInputValue.value).then(() => {
    talkeeDataStore.updateSite(props.site.id, nameInputValue.value, [ originInputValue.value ]);
    showEditDialog.value = false;
  });
}

function openInstallDialog() {
  showInstallDialog.value = true;
}

function openEditDialog() {
  originInputValue.value = props.site.origins[0];
  nameInputValue.value = props.site.name;
  showEditDialog.value = true;
}

function copyTijs() {
  const { copy } = useClipboard({ source: tijsScript.value });
  copy(tijsScript.value);
  toast.success({ message: t("copied") });
}

function copySiteId() {
  const { copy } = useClipboard({ source: props.site.id });
  copy(props.site.id);
  toast.success({ message: t("copied") });
}
</script>

<style lang="scss" scoped>
.install-approaches {
  border: 1px solid rgb(var(--v-theme-greyscale_5));
}

.control {
  margin: 0 -20px;
}

.tijs-textarea {
  &:deep(textarea) {
    font-size: 0.9rem;
    font-weight: normal;
    font-family: monospace;
  }
}
.v-input {
  &:deep(input) {
    font-size: 0.9rem;
    font-weight: normal;
    font-family: monospace;
  }
}
</style>