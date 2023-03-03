<template>
  <div class="narrow-page pa-4">
    <VSheet border rounded class="pa-4">
      <h3 class="text-h5 mb-4">Welcome to Pando Developer Console.</h3>
      <div class="text-body-1 text-greyscale_3 mb-4">
        Pando provides a set of decentralized protocols and Web3 tools to help developers build their own applications.
      </div>
      <div>
        <a href="https://developers.pando.im/" target="_blank">
          <FButton variant="outlined" color="primary" rounded="sm" >Read Documents</FButton>
        </a>
      </div>
    </VSheet>
  </div>
</template>

<script lang="ts">
definePageMeta({
  title: "Developer Console",
});
</script>

<script setup lang="ts">
const env = useRuntimeConfig();
const router = useRouter();
const userStore = useUserStore();


const loading = ref(false);

onMounted(async () => {
});
</script>

<style lang="scss" scoped>

</style>