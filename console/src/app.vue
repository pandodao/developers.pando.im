<template>
  <v-app id="pando-dev-app" class="pando-dev-app" theme="light">
    <NuxtLayout :name="layout">
      <NuxtPage />
    </NuxtLayout>
  </v-app>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useDisplay } from "vuetify";
const i18n = useI18n();
const { smAndDown } = useDisplay();
const { init } = useAccount();
const appStore = useAppStore();
const { drawer } = storeToRefs(appStore);

const layout = computed(() => {
  return "default";
});

onMounted(async () => {
  await loadAppData();
  init();
  const code = window.navigator.language.toLocaleLowerCase()
  i18n.setLocale(code);
  if (smAndDown.value) {
    drawer.value = false;
  } else {
    console.log(smAndDown.value)
    drawer.value = true;
  }
});
</script>
