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
        :class="activeClass(serv.route)"
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
import servIcons from "@/assets/images/services";
import { storeToRefs } from "pinia";

const route = useRoute();
const router = useRouter();
const appStore = useAppStore();
const { logged, displayAvatar, displayName } = useAccount();
const { drawer } = storeToRefs(appStore)

const services = computed(() => {
  return [
    { label: "Home", icon: servIcons.pandoIcon, route: "index" },
    { label: "Talkee", icon: servIcons.talkeeIcon, route: "talkee" },
    // { label: "Botastic", icon: servIcons.botasticIcon, route: "botastic" }
  ]
});

function activeClass(routeName: string) {
  let ret = '';
  if (route.name === routeName) {
    ret = 'active'
  }
  switch (routeName) {
    case 'talkee':
      ret += ' talkee'
      break;
    case 'botastic':
      ret += ' botastic'
      break;
  }
  return ret;
}

function select(routeName: string) {
  router.push({ name: routeName });
}

</script>

<style lang="scss" scoped>
.list-item {
  &.active {
    background-color: rgb(var(--v-theme-greyscale_5));
    &.talkee {
    background-color: rgba(var(--v-theme-success), 0.1);
    }
    &.botastic {
      background-color: rgba(var(--v-theme-warning), 0.1);
    }
  }
}
</style>
