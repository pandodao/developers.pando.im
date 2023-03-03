<template>
  <FAppBar :height="navbarHeight">
    <VContainer class="d-flex align-center text-center px-4">
      <FButton v-if="smAndDown" variant="icon" class="menu-btn" size="small" @click="toggleSide">
        <VIcon>$IconMenu</VIcon>
      </FButton>
      <VSpacer />
      <span class="text-subtitle-1">{{ title }}</span>
      <VSpacer />
    </VContainer>
  </FAppBar>
</template>

<script lang="ts">
export default {
  name: "Nav",
};
</script>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useDisplay } from "vuetify";

const route = useRoute();
const router = useRouter();
const appStore = useAppStore();
const { smAndDown } = useDisplay();
const { drawer } = storeToRefs(appStore);

const hasBreadcrumb = computed(() => {
  return route.meta?.breadcrumb !== false;
});

const title = computed(() => {
  return route.meta?.title || 'Dev Console';
});

const navbarHeight = computed(() => {
  return smAndDown.value ? 48 : 64;
});

function toggleSide() {
  drawer.value = !drawer.value;
}

</script>

<style lang="scss" scoped>
.menu-btn {
  position: absolute;
  margin-left: -16px;
  padding: 0px;
  min-width: 48px;
  width: 32px;
  border-radius: 0;
}
</style>
