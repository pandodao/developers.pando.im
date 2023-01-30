<template>
  <div>
    <p class="url shiki material-palenight"><code>{{ method }} {{ url }}</code> <span v-if="auth" class="auth">AUTHORIZATION REQUIRED</span></p>
  </div>
</template>

<script lang="ts">
export default {
  name: "APIEndpoint",
};
</script>

<script setup lang="ts">

const props = defineProps({
  url: String,
  method: String,
  auth: Boolean,
  params: {
    type: Array<any>(),
    default: () => [],
  },
});

</script>

<style lang="css" scoped>
.auth {
  margin-left: 8px;
  border-radius: 4px;

  font-family: var(--vp-font-family-mono);
  font-size: var(--vp-code-font-size);
  padding: 3px 6px;
  color: var(--vp-c-yellow-darker);
  background-color: var(--vp-c-yellow-dimm-2);
  transition: color 0.5s, background-color 0.5s;
}
</style>