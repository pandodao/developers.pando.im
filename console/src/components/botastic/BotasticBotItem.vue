<template>
  <div>
    <VSheet class="">
      <div class="">
        <div class="d-flex align-center text-body-1 font-weight-medium">
          <div>{{ bot.name }}</div>
          <VSpacer />
          <VBtn variant="flat" icon class="copy-btn" rounded="0" size="x-small" @click="openEditDialog">
            <VIcon color="link">$IconEdit</VIcon>
          </VBtn>
        </div>
        <div class="d-flex align-center text-body-1 text-greyscale_3">
          <div class="font-fix-width">{{ t("botastic.bot_model", { model: bot.model }) }}</div>
        </div>
      </div>
    </VSheet>

    <FModal v-model="showEditDialog" desktop="dialog" offset="16" :title="t('edit')">
      <div class="pb-4">
        <div class="pa-4 mb-4">
          <VRow dense>
            <VCol cols="12">
              <FInput v-model="nameInputValue" :label="t('botastic.name')" :placeholder="t('botastic.name.placeholder')" :hide-details="true"/>
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
import { updateBot } from "@/services/botastic";

const { t } = useI18n({ useScope: "local" });
const botasticDataStore = useBotasticDataStore();
const toast = useToast();

const showEditDialog = ref(false);
const nameInputValue = ref("");
const promptInputValue = ref("");
const middlewaresInputValue = ref("");
const temperatureInputValue = ref("");
const maxTurnCountInputValue = ref("");
const contextTurnCountInputValue = ref("");

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
  nameInputValue.value = props.bot.name;
  promptInputValue.value = props.bot.prompt;
  middlewaresInputValue.value = JSON.stringify(props.bot.middlewares, null, 2);
  temperatureInputValue.value = props.bot.temperature;
  maxTurnCountInputValue.value = props.bot.max_turn_count;
  contextTurnCountInputValue.value = props.bot.context_turn_count;
  showEditDialog.value = true;
}


</script>

<style lang="scss" scoped>

.control {
  margin: 0 -28px;
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