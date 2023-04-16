<template>
  <div class="narrow-page pa-4 text-center">
    {{ t("loading") }}
  </div>
</template>

<script setup lang="ts">
import { routerKey } from 'vue-router';

const { t } = useI18n({ useScope: "local" });
const { loginToBotasticWithTwitter } = useAccount();
const route = useRoute();
const router = useRouter();

onMounted(async () => {
  const oauth_token = route.query.oauth_token as string
  const oauth_verifier = route.query.oauth_verifier as string
  try {
    await loginToBotasticWithTwitter(oauth_token, oauth_verifier)
    router.replace('/botastic');
  } catch (e: any) {
    console.log(e)
    router.replace('/botastic');
  }
});
</script>

<style lang="scss" scoped>
</style>