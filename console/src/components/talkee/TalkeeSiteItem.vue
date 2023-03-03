<template>
  <div>
    <VSheet class="">
      <div class="">
        <div class="text-body-1 font-weight-medium mb-2">
          {{ site.name }}
        </div>
        <div class="text-caption text-greyscale_3">
          Origins: {{ site.origins.join(", ") }}
        </div>
        <div class="text-caption text-greyscale_3">
          Site ID: {{ site.id }}
        </div>
      </div>
      <div class="control d-flex">
        <FButton variant="plain" color="link" class="edit-btn" rounded="0" size="small" @click="copySiteId">
          <VIcon color="link">$IconCopy</VIcon>
          <span class="ml-1">Copy</span>
        </FButton>
        <FButton variant="plain" color="link" class="install-btn ml-1" rounded="0" size="small" @click="openInstallDialog">
          <VIcon color="link">$IconBrowserCode</VIcon>
          <span class="ml-1">Install</span>
        </FButton>
        <VSpacer />
        <FButton variant="plain" color="link" class="copy-btn" rounded="0" size="small" @click="openEditDialog">
          <VIcon color="link">$IconEdit</VIcon>
          <span class="ml-1">Edit</span>
        </FButton>
      </div>
    </VSheet>


    <FModal v-model="showEditDialog" desktop="dialog" offset="16" :title="'Edit'">
      <div class="pb-4">
        <div class="pa-4 mb-4">
          <VRow dense>
            <VCol cols="12">
              <FInput v-model="nameInputValue" label="Name" />
            </VCol>
            <VCol cols="12">
              <FInput v-model="originInputValue" label="Origin" :error-messages="originInputErrors"/>
            </VCol>
            <VCol cols="12" class="text-center">
              <FButton color="primary" rounded="sm" :disabled="!validatedEdit" @click="saveEdit">{{ $t("common.save") }}</FButton>
            </VCol>
          </VRow>
        </div>
      </div>
    </FModal>

    <FModal v-model="showInstallDialog" desktop="dialog" offset="16" :title="'Install'">
      <div class="pb-4">
        <div class="text-overline text-center">Install Approaches</div>
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
                  <FButton color="primary" rounded="sm" @click="copyTijs">{{ $t("common.copy") }}</FButton>
                </div>
              </VExpansionPanelText>
            </VExpansionPanel>
            <VExpansionPanel title="Wordpress Plugin" elevation="0" rounded="0" :ripple="false">
              <VExpansionPanelText>
                Coming Soon.
              </VExpansionPanelText>
            </VExpansionPanel>
            <VExpansionPanel title="Customize" elevation="0" rounded="0" :ripple="false">
              <VExpansionPanelText class="text-body-1">
                <p class="mb-2">
                  For more install approaches, please refer to the <a href="https://developers.pando.im/guide/talkee#installation-vue3" target="_blank">documentation</a>.
                </p>
                <p>
                  Talkee also provides a comprehensive <a href="https://developers.pando.im/guide/talkee#use-talkee-apis-with-your-own-ui" target="_blank">APIs </a> for fully customization.
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
    errors.push("Origin must start with 'https://' or 'http://'.");
  }
  return errors;
});

const validatedEdit = computed(() => {
  return originInputErrors.value.length === 0 && nameInputValue.value.length > 0;
});

const tijsScript = computed(() => {
  // wierd workaround. compiler don't like html close tag in template
  return `$$script src="https://cdn.jsdelivr.net/npm/@foxone/talkee-install-js@0.1.1/dist/ti.min.js">$$/script>
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
  toast.success({ message: t("common.copied") });
}

function copySiteId() {
  const { copy } = useClipboard({ source: props.site.id });
  copy(props.site.id);
  toast.success({ message: t("common.copied") });
}
</script>

<style lang="scss" scoped>
.install-approaches {
  border: 1px solid rgb(var(--v-theme-greyscale_5));
}

.control {
  margin: 0 -28px;
}

.tijs-textarea {
  &:deep(textarea) {
    font-size: 0.8rem;
    font-weight: normal;
    font-family: monospace;
  }
}
</style>