<template>
  <div class="narrow-page pa-4">
    <VSheet v-if="!logged" rounded class="pa-4">
      <h3 class="text-h5 mb-4">{{ t("botastic.connect.title") }}</h3>
      <div class="text-body-1 text-greyscale_3 mb-4">{{ t("botastic.connect.text") }}</div>
      <div>
        <FButton color="primary" rounded="sm" @click="showLoginDialog = true">{{ t("login") }}</FButton>
      </div>
    </VSheet>
    <div v-else>
      <FLoading v-if="botasticLoading" />
      <template v-else>
        <BotasticCreditPanel />
        <BotasticAppList />
        <BotasticBotList />
        <BotasticResList />
      </template>
    </div>
  </div>

  <FModal v-model="showLoginDialog" desktop="dialog" offset="16" :title="t('login')">
    <div class="px-4">
      <div class="pa-4 mb-4">
        <VRow dense>
          <VCol cols="12" class="text-center">
            <FButton color="primary" rounded="sm" block @click="openTwitterOAuthUrl">{{ t("login.twitter") }}</FButton>
          </VCol>
          <VCol cols="12" class="text-center">
            <FButton variant="tonal" rounded="sm" block @click="loginToBotastic">{{ t("connect_wallet") }}</FButton>
          </VCol>
        </VRow>
      </div>
    </div>
  </FModal>

</template>

<script lang="ts">
definePageMeta({
  title: "Botastic",
});
</script>

<script setup lang="ts">
import { storeToRefs } from "pinia";
const { t } = useI18n({ useScope: "local" });
const botasticDataStore = useBotasticDataStore();
const { loading: botasticLoading } = storeToRefs(botasticDataStore);
const { servicesLogged, loginToBotastic, getBotasticData, openTwitterOAuthUrl } = useAccount();

const showLoginDialog = ref(false);

const logged = computed(() => {
  return servicesLogged.value('botastic');
})

onMounted(async () => {
  if (logged.value) {
    await getBotasticData();
  }
});
</script>

<style lang="scss" scoped>

</style>