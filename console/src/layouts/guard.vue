<template>
  <VLayout class="layout-guard">
    <VMain>
      <VContainer class="text-center">
        <div class="narrow-page pt-10 px-10">
          <VImg :src="logo" :height="60" class="mb-10" />
          <VSheet class="pa-4 pt-8" color="greyscale_7 rounded">
            <h1 class="font-weight-bold mb-10 text-h6">Pando Developer Console</h1>
            <FButton color="primary" rounded="sm" @click="conn">Connect Wallet</FButton>
            <div class="links d-flex pt-10 text-caption justify-center">
              <a href="https://pando.im/" target="_blank">Pando.im</a>
              <a href="https://developers.pando.im/" target="_blank">Documents</a>
            </div>
          </VSheet>
        </div>
      </VContainer>
    </VMain>
  </VLayout>
</template>

<script lang="ts">
export default {
  name: "GuardLayout",
};
</script>

<script setup lang="ts">
import logo from '@/assets/images/logo-with-text.svg';

const { login } = useAccount();

function conn() {
  login()
}
</script>
<style lang="scss" scoped>
.layout-guard {
  height: 100vh;
  background: rgb(var(--v-theme-greyscale_6));
}
.links {
  a {
    margin: 0 10px;
    color: rgb(var(--v-theme-greyscale_3)) !important;
  }
}
</style>
