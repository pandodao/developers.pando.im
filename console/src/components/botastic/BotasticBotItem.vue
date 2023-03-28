<template>
  <div>
    <div class="item d-flex align-center" @click="showActionsDialog = true">
      <div class="">
        <div class="d-flex align-center text-body-1 mb-1">
          <div class="font-weight-medium">{{ bot.name }}</div>
        </div>
        <div class="d-flex align-center text-body-1 text-greyscale_3">
          <div class="font-fix-width">
            {{ t("botastic.bot_id", { bot_id: bot.id }) }},
            {{ t("botastic.bot_model", { bot_model: bot.model }) }}
          </div>
        </div>
      </div>
      <VSpacer />
      <VIcon color="greyscale_3" size="16">$IconChevronRight</VIcon>
    </div>

    <FModal v-model="showTestDialog" desktop="dialog" offset="16" :title="t('test')">
      <div class="pa-4 pb-6">
        <VRow dense>
          <VCol cols="9" class="d-flex align-center">
            <FInput v-model="testInputValue" :placeholder="t('botastic.test.input.placeholder')"  hide-details :disabled="loadingTest"/>
          </VCol>
          <VCol cols="3" class="d-flex align-center">
            <FButton color="primary" block @click="sendTestRequest" :disabled="loadingTest">{{ t("send") }}</FButton>
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="12" class="d-flex align-center">
            <FTextarea v-model="testOutputValue" readonly :placeholder="t('botastic.test.output.placeholder')" hide-details />
          </VCol>
        </VRow>
      </div>
    </FModal>

    <FModal v-model="showActionsDialog" desktop="dialog" offset="16" :title="t('actions')">
      <div class="pa-4 pb-6">
        <VRow dense>
          <VCol cols="12" class="font-weight-bold">
            {{ bot.name }}
          </VCol>
          <VCol cols="12" class="d-flex align-center">
            <div>
              <div class="text-body-2 mr-2">{{ t("botastic.bot_id", { bot_id: bot.id }) }}</div>
            </div>
            <VSpacer />
            <FButton color="primary" variant="outlined" size="small" rounded="sm" @click="copyBotID">{{ $t("copy") }}</FButton>
          </VCol>
          <VCol cols="12" class="d-flex align-center">
            <div class="text-body-2 mr-2">{{ t("botastic.test.text") }}</div>
            <VSpacer />
            <FButton color="primary" variant="outlined" size="small" rounded="sm" @click="openTestDialog">{{ $t("test") }}</FButton>
          </VCol>
          <VCol cols="12" class="d-flex align-center mb-4">
            <div class="text-body-2 mr-2">{{ t("botastic.edit_bot.text") }}</div>
            <VSpacer />
            <FButton color="primary" variant="outlined" size="small" rounded="sm" @click="openEditDialog">{{ $t("edit") }}</FButton>
          </VCol>
          <VCol cols="12" class="d-flex align-center">
            <div class="text-body-2 mr-2">{{ t("botastic.delete_bot.text") }}</div>
            <VSpacer />
            <FButton color="error" variant="outlined" size="small" rounded="sm" @click="openDeleteDialog">{{ $t("delete") }}</FButton>
          </VCol>
        </VRow>
      </div>
    </FModal>

    <FModal v-model="showDeleteDialog" desktop="dialog" offset="16" :title="t('confirm')">
      <div class="px-4 pb-4 text-center">
        <div class="text-body-1 mb-4">{{ t("botastic.delete_bot.confirm_text") }}</div>
        <VRow>
          <VCol cols="6">
            <FButton variant="tonal" block @click="showDeleteDialog = true">{{ t("cancel") }}</FButton>
          </VCol>
          <VCol cols="6">
            <FButton color="error" block @click="doDeleteBot">{{ t("delete") }}</FButton>
          </VCol>
        </VRow>
      </div>
    </FModal>

    <FModal v-model="showEditDialog" desktop="dialog" offset="16" :title="t('edit')">
      <div class="pb-4">
        <div class="pa-4 mb-4">
          <VRow dense>
            <VCol cols="12">
              <FInput v-model="nameInputValue" :label="t('botastic.bot_name')" :placeholder="t('botastic.bot_name.placeholder')" :hide-details="true"/>
            </VCol>
            <VCol cols="12">
              <FTextarea class="" v-model="promptInputValue" :label="t('botastic.prompt')" :hide-details="true"/>
            </VCol>
            <VCol cols="12">
              <FInput v-model="temperatureInputValue" :label="t('botastic.temperature')" :placeholder="t('botastic.temperature.placeholder')"
                :error-messages="temperatureInputErrors" :hide-details="true"
              />
            </VCol>
            <VCol cols="12">
              <FInput v-model="maxTurnCountInputValue" :label="t('botastic.max_turn_count')" :placeholder="t('botastic.max_turn_count.placeholder')"
                :error-messages="maxTurnCountInputErrors" :hide-details="true"
              />
            </VCol>
            <VCol cols="12">
              <FInput v-model="contextTurnCountInputValue" :label="t('botastic.context_turn_count')" :placeholder="t('botastic.context_turn_count.placeholder')"
                :error-messages="contextTurnCountInputErrors" :hide-details="true"
              />
            </VCol>
            <VCol cols="12">
              <FTextarea class="" v-model="middlewaresInputValue" :label="t('botastic.middlewares')" />
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
  name: "BotasticBotItem"
};
</script>

<script setup lang="ts">
import { updateBot, testBotInput, deleteBot } from "@/services/botastic";
import { useClipboard } from "@vueuse/core";
import { storeToRefs } from "pinia";

const { t } = useI18n({ useScope: "local" });
const { getBotasticData } = useAccount();

const botasticDataStore = useBotasticDataStore();
const toast = useToast();

const showEditDialog = ref(false);
const showTestDialog = ref(false);
const showActionsDialog = ref(false);
const showDeleteDialog = ref(false);

const nameInputValue = ref("");
const promptInputValue = ref("");
const middlewaresInputValue = ref("");
const temperatureInputValue = ref("");
const maxTurnCountInputValue = ref("");
const contextTurnCountInputValue = ref("");

const testInputValue = ref("");
const testOutputValue = ref("");

const loadingTest = ref(false);

const  { apps } = storeToRefs(botasticDataStore);

const props = defineProps({
  bot: {
    type: Object,
    default: null,
  },
});

const validatedEdit = computed(() => {
  return nameInputValue.value.length > 0;
});

const temperatureInputErrors = computed(() => {
  if (!temperatureInputValue.value) return 1.0;
  const errors = [];
  const val = parseFloat(temperatureInputValue.value)
  if (val < 0.0 || val > 2.0) {
    errors.push(t("botastic.temperature.error_msg"));
  }
  return errors;
});

const maxTurnCountInputErrors = computed(() => {
  if (!maxTurnCountInputValue.value) return 1;
  const errors = [];
  const val = parseInt(maxTurnCountInputValue.value)
  if (val < 0 || val > 10) {
    errors.push(t("botastic.max_turn_count.error_msg"));
  }
  return errors;
});

const contextTurnCountInputErrors = computed(() => {
  if (!contextTurnCountInputValue.value) return 1;
  const errors = [];
  const val = parseInt(contextTurnCountInputValue.value)
  if (val < 0 || val > 10) {
    errors.push(t("botastic.context_turn_count.error_msg"));
  }
  return errors;
});

function saveEdit() {
  if (!props.bot) return;
  const temperature = parseFloat(temperatureInputValue.value);
  const maxTurnCount = parseInt(maxTurnCountInputValue.value);
  const contextTurnCount = parseInt(contextTurnCountInputValue.value);
  let middlewareConfig = { items: [] };
  try {
    middlewareConfig = JSON.parse(middlewaresInputValue.value);
  } catch (e) {
    toast.error(t("botastic.middlewares.error_msg"));
    return;
  }

  updateBot(props.bot.id,
    nameInputValue.value, "gpt-3.5-turbo", promptInputValue.value,
    temperature, maxTurnCount, contextTurnCount, middlewareConfig
  ).then(() => {
    botasticDataStore.updateBot(props.bot.id, nameInputValue.value);
    showEditDialog.value = false;
  });
}

function openEditDialog() {
  showActionsDialog.value = false

  nameInputValue.value = props.bot.name;
  promptInputValue.value = props.bot.prompt;
  middlewaresInputValue.value = JSON.stringify(props.bot.middlewares, null, 2);
  temperatureInputValue.value = props.bot.temperature;
  maxTurnCountInputValue.value = props.bot.max_turn_count;
  contextTurnCountInputValue.value = props.bot.context_turn_count;

  showEditDialog.value = true;
}

function openTestDialog() {
  showActionsDialog.value = false

  testInputValue.value = "";
  testOutputValue.value = "";

  showTestDialog.value = true;
}

function openDeleteDialog() {
  showDeleteDialog.value = true;
  showActionsDialog.value = false
}

async function doDeleteBot() {
  await deleteBot(props.bot.id);
  await getBotasticData();
  showDeleteDialog.value = false;
}

function sendTestRequest() {
  const request = testInputValue.value.trim();
  if (request === "") return;

  if (apps.value.length === 0) return;

  loadingTest.value = true;

  const firstApp = apps.value[0] as Botastic.App;
  testBotInput(firstApp.app_id, firstApp.app_secret, props.bot.id, request).then((response) => {
    testOutputValue.value = response.response;
    loadingTest.value = false;
  });
}

function copyBotID() {
  const { copy } = useClipboard({ source: props.bot.id });
  copy(props.bot.id);
  toast.success({ message: t("copied") });
}

</script>

<style lang="scss" scoped>

.item {
  cursor: pointer;
}
.v-textarea {
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