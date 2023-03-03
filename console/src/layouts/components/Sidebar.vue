<template>
  <VNavigationDrawer v-model="drawer">
    <div v-if="logged" class="pa-4 d-flex align-center">
      <AccountAvatarAction />
    </div>
    <FDivider />
    <VList>
      <FListItem
        class="list-item"
        v-for="serv, ix in services"
        :key="`serv-${ix}`"
        @click="select(serv.route)"
      >
        <template #prepend>
          <VImg
            :src="serv.icon"
            :width="32"
            :height="32"
          />
        </template>
        <div class="block pl-3">
          <div class="text-body-1">
            {{ serv.label }}
          </div>
        </div>
      </FListItem>
    </VList>
  </VNavigationDrawer>
</template>

<script lang="ts">
export default {
  name: "Sidebar",
};
</script>

<script lang="ts" setup>
import talkeeIcon from "@/assets/images/services/talkee.svg";
import pandoIcon from "@/assets/images/services/logo.svg";
import { storeToRefs } from "pinia";

const route = useRoute();
const router = useRouter();
const appStore = useAppStore();
const { logged, displayAvatar, displayName } = useAccount();
const { drawer } = storeToRefs(appStore)

const services = computed(() => {
  return [
    { label: "Home", icon: pandoIcon, route: "index" },
    { label: "Talkee", icon: talkeeIcon, route: "talkee" }
  ]
});

function select(routeName: string) {
  router.push({ name: routeName });
}

</script>

<style lang="scss" scoped>

</style>
