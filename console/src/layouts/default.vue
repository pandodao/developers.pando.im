<template>
  <VLayout class="layout-desktop">
    <Sidebar />
    <Nav />
    <VMain class="layout-main">
      <VContainer class="page-content pa-0">
        <slot />
      </VContainer>
    </VMain>
  </VLayout>
</template>

<script lang="ts">
export default {
  name: "DesktopLayout",
};
</script>

<style lang="scss" scoped>
.layout-desktop {
  height: 100vh;
  .layout-main {
    overflow: auto;
  }
}
</style>
