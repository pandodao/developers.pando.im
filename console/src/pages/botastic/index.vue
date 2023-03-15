<template>
  <div class="narrow-page pa-4">
    <VSheet v-if="!logged" rounded class="pa-4">
      <h3 class="text-h5 mb-4">{{ t("botastic.connect.title") }}</h3>
      <div class="text-body-1 text-greyscale_3 mb-4">{{ t("botastic.connect.text") }}</div>
      <div>
        <FButton color="primary" rounded="sm" @click="loginToBotastic">{{ t("connect_wallet") }}</FButton>
      </div>
    </VSheet>
    <div v-else>
      <FLoading v-if="botasticLoading" />
      <template v-else>
        <BotasticAppList />
        <BotasticBotList />
        <BotasticResList />
      </template>
    </div>
  </div>
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
const { servicesLogged, loginToBotastic, getBotasticData } = useAccount();

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