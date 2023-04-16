<template>
  <FModal v-model="show" desktop="dialog" offset="4" :title="''">
    <template #activator="{ props: { onClick } }">
      <div class="account-avatar-container pl-4 pr-2" @click="onClick">
        <div class="">
          <div class="account-name text-body-2 font-weight-bold">{{ "Manage Sessions" }}</div>
        </div>
        <VSpacer />
        <VIcon color="greyscale_3" size="16">$IconChevronRight</VIcon>
      </div>
    </template>

    <div class="pb-4 pt-10">
      <div class="services">
        <div class="text-overline text-greyscale_3">Sessions</div>
        <FListItem
          class="list-item"
          v-for="serv, ix in services"
          :key="`serv-${ix}`"
          >
          <template #prepend>
            <VImg :src="serv.icon" :width="32" :height="32"/>
          </template>
          <div class="block pl-3">
            <div class="text-body-1">
              {{ serv.label }}
            </div>
          </div>
          <template #append>
            <FButton v-if="serv.logged" size="small" class="disconnect" rounded="sm" @click="serv.disconnect">{{ $t("disconnect") }}</FButton>
            <FButton v-else size="small" color="primary" rounded="sm" @click="serv.connect">{{ $t("connect") }}</FButton>
          </template>
        </FListItem>
        <FDivider :thickness="0.5" color="greyscale_6" class="my-4"/>
        <div class="text-center">
          <FButton class="disconnect" rounded="sm" size="small" @click="disconnect">{{ $t("disconnect_all") }}</FButton>
        </div>
      </div>
    </div>
  </FModal>
</template>

<script lang="ts">
export default {
  name: "AccountAvatarAction",
};
</script>

<script lang="ts" setup>
import servIcons from "@/assets/images/services";

const { t } = useI18n();

const { loginToTalkee, loginToBotastic, logout, logoutServ, servicesLogged } = useAccount();

const show = ref(false);

const services = computed(() => {
  return [
    {
      label: "Talkee", icon: servIcons.talkeeIcon, logged: servicesLogged.value("talkee"),
      disconnect: () => { logoutServ("talkee"); show.value = false; },
      connect: () => { loginToTalkee(); show.value = false; }
    },
    {
      label: "Botastic", icon: servIcons.botasticIcon, logged: servicesLogged.value("botastic"),
      disconnect: () => { logoutServ("botastic"); show.value = false; },
      connect: () => { loginToBotastic(); show.value = false; }
    }
  ]
});

function disconnect() {
  logout();
  show.value = false;
  window.location.reload();
}


</script>

<style lang="scss" scoped>
.account-avatar-container {
  cursor: pointer;
  display: flex;
  align-items: center;
  .account-name {
    line-height: 18px;
  }
  .account-channel {
    line-height: 12px;
  }
}
.account-avatar {
  background: rgb(var(--v-theme-greyscale_4));
}

.account-name {
  font-weight: 600;
  font-size: 16px;
  font-family: monospace;
}
.disconnect {
  color: rgb(var(--v-theme-error));
  background-color: rgb(var(--v-theme-error_bg));
}

.services {
  padding: 8px 0;
  margin: 0 16px;
}
</style>
