<template>
  <div>
    <VSheet class="d-flex align-center">
      <div class="text-overline pl-0 text-greyscale_3 ">{{ t("botastic.bots") }}</div>
      <VSpacer />
      <FButton v-if="!reachLimit" size="small" variant="text" text rounded="0" @click="openNewDialog">
        <VIcon>$IconPlus</VIcon>
        <span class="ml-1">{{ t("botastic.new_bot") }}</span>
      </FButton>
    </VSheet>
    <FDivider class="mb-4"/>

    <div v-if="bots.length">
      <div  v-for="item in bots" class="list-item pr-0 mb-4" :key="`bot-${item.id}`">
        <BotasticBotItem :bot="item" />
      </div>
    </div>
    <div v-else class="text-body-1 text-greyscale_3 text-center mt-10">
      {{ t("botastic.no_bot") }}
    </div>

    <VSheet class="d-flex align-center">
      <div class="text-overline pl-0 text-greyscale_3 ">{{ t("botastic.resources") }}</div>
      <VSpacer />
    </VSheet>
    <FDivider class="mb-4"/>
    <div>
      <a href="https://developers.pando.im/references/botastic/api.html" title="API References" target="_blank">
        <FButton variant="tonal" size="small" color="greyscale_2" class="rounded-sm mr-2 mb-2">{{ t("botastic.resources.api_references") }}</FButton>
      </a>
    </div>

    <FModal v-model="showNewDialog" desktop="dialog" offset="16" :title="'Edit'">
      <div class="pb-4">
        <div class="pa-4 mb-4">
          <VRow dense>
            <VCol cols="12">
              <FInput v-model="nameInputValue" :label="t('botastic.name')" :placeholder="t('botastic.name.placeholder')" :hide-details="true"/>
            </VCol>
            <VCol cols="12">
              <FTextarea class="" v-model="promptInputValue" :label="t('botastic.prompt')" :hide-details="true"/>
            </VCol>
            <VCol cols="12" class="text-center">
              <FButton color="primary" rounded="sm" :disabled="!validatedEdit" @click="createBot">{{ $t("create") }}</FButton>
            </VCol>
          </VRow>
        </div>
      </div>
    </FModal>

  </div>
</template>

<script lang="ts">
export default {
  name: "BotasticBotList",
};
</script>

<script setup lang="ts">
import { addBot } from "@/services/botastic";
const { t } = useI18n({ useScope: "local" });

const botasticDataStore = useBotasticDataStore();
const showNewDialog = ref(false);
const nameInputValue = ref("");
const promptInputValue = ref("");

const bots = computed(() => {
  return botasticDataStore.bots;
});

const emit = defineEmits({
  click: (item: any) => true,
})

const validatedEdit = computed(() => {
  return nameInputValue.value.length > 0;
});

const reachLimit = computed(() => {
  return bots.value.length >= 3;
});

function createBot() {
  addBot(nameInputValue.value).then((resp) => {
    botasticDataStore.addBot(resp);
    showNewDialog.value = false;
  });}

function openNewDialog() {
  nameInputValue.value = "";
  promptInputValue.value = "";
  showNewDialog.value = true;
}

</script>

<style lang="scss" scoped>
.block {
  flex: 1;
}
.list-item {
  min-height: 64px;
}
</style>
