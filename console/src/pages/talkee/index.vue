<template>
  <div class="narrow-page pa-4">
    <VSheet v-if="!talkeeLogged" border rounded class="pa-4">
      <h3 class="text-h5 mb-4">Please connect to talkee to continue</h3>
      <div class="text-body-1 text-greyscale_3 mb-4">Talkee uses an individual authentication flow. You need to connect to Talkee with your wallet to continue.</div>
      <div>
        <FButton color="primary" rounded="sm" @click="loginToTalkee">Connect Wallet</FButton>
      </div>
    </VSheet>
    <div v-else>
      <FLoading v-if="talkeeLoading" />
      <TalkeeSiteList v-else />
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
const talkeeDataStore = useTalkeeDataStore();
const { loading: talkeeLoading } = storeToRefs(talkeeDataStore);
const { talkeeLogged, loginToTalkee, getTalkeeData } = useAccount();

onMounted(async () => {
  if (talkeeLogged.value) {
    await getTalkeeData();
  }
});
</script>

<style lang="scss" scoped>

</style>