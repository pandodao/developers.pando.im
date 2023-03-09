<template>
  <FModal v-model="show" desktop="dialog" offset="4" :title="''">
    <template #activator="{ props: { onClick } }">
      <div v-if="logged" class="account-avatar-container" @click="onClick">
        <VAvatar class="account-avatar" :size="32">
          <VImg v-if="displayAvatar" :src="displayAvatar" class="rounded-pill"/>
          <VIcon v-else color="greyscale_7" size="20">$IconProfile</VIcon>
        </VAvatar>
        <div class="ml-3">
          <div class="account-name text-body-2 font-weight-bold">{{ displayName }}</div>
          <div class="account-channel text-caption text-greyscale_3">{{ authChannel }}</div>
        </div>
      </div>
    </template>
    <div class="pb-4 pt-10">
      <div class="info d-flex flex-column align-center justify-center text-center ml-0 pa-4">
        <VAvatar class="account-avatar mb-2" :size="48">
          <VImg v-if="displayAvatar" :src="displayAvatar" class="rounded-pill"/>
          <VIcon v-else color="greyscale_7" size="48">$IconProfile</VIcon>
        </VAvatar>
        <div>
          <div class="account-name text-body-1 font-weight-bold">{{ displayName }}</div>
          <div class="account-channel text-caption text-greyscale_3">{{ authChannel }}</div>
        </div>
      </div>
      <div class="services">
        <div class="text-overline text-greyscale_3">Service Sessions</div>
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

const { logged, talkeeLogged, login, loginToTalkee, loginToBotastic, logout, logoutTalkee, logoutServ, servicesLogged,
  displayAvatar, displayName, authChannel } = useAccount();

const show = ref(false);

const services = computed(() => {
  return [
    {
      label: "Talkee", icon: servIcons.talkeeIcon, logged: talkeeLogged.value,
      disconnect: () => { logoutTalkee(); show.value = false; },
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

function connect() {
  login();
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
