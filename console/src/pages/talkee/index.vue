<template>
  <div class="narrow-page pa-4">
    <VSheet v-if="!logged" rounded class="pa-4">
      <h3 class="text-h5 mb-4">{{ t("talkee.connect.title") }}</h3>
      <div class="text-body-1 text-greyscale_3 mb-4">{{ t("talkee.connect.text") }}</div>
      <div>
        <FButton color="primary" rounded="sm" @click="loginToTalkee">{{ t("connect_wallet") }}</FButton>
      </div>
    </VSheet>
    <div v-else>
      <FLoading v-if="talkeeLoading" />
      <TalkeeSiteList v-else />
      <TalkeeResList />
    </div>
  </div>
</template>

<script lang="ts">
definePageMeta({
  title: "Talkee",
});
</script>

<script setup lang="ts">
import { storeToRefs } from "pinia";
const { t } = useI18n({ useScope: "local" });
const talkeeDataStore = useTalkeeDataStore();
const { loading: talkeeLoading } = storeToRefs(talkeeDataStore);
const { servicesLogged, loginToTalkee, getTalkeeData } = useAccount();

const logged = computed(() => {
  return servicesLogged.value('talkee');
})

onMounted(async () => {
  if (logged.value) {
    await getTalkeeData();
  }
});
</script>

<style lang="scss" scoped>

</style>