<template>
  <div class="narrow-page pa-4 text-center">
    {{ t("loading") }}
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n({ useScope: "local" });
const { loginToBotasticWithTwitter } = useAccount();
const route = useRoute();

onMounted(async () => {
  const oauth_token = route.query.oauth_token as string
  const oauth_verifier = route.query.oauth_verifier as string
  try {
    await loginToBotasticWithTwitter(oauth_token, oauth_verifier)
  } catch (e: any) {
    console.log(e)
  }
});
</script>

<style lang="scss" scoped>
</style>