<template>
  <div>
    <div v-if="auth" class="wrapper"><span class="auth">AUTHORIZATION REQUIRED</span></div>
    <div v-if="deprecated" class="wrapper"><span class="deprecated">DEPRECATED</span></div>
    <div v-if="obsolete" class="wrapper"><span class="obsolete">OBSOLETE</span></div>
    <div class="shiki material-palenight"><code class="url">{{ method }} {{ url }}</code>
    </div>
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
  deprecated: Boolean,
  obsolete: Boolean,
  params: {
    type: Array<any>(),
    default: () => [],
  },
});

</script>

<style lang="css" scoped>
.auth-wrapper {
  margin-bottom: 4px;
}
.url {
  background-color: var(--vp-c-blue-dimm-2);
}
.auth, .deprecated, .obsolete {
  border-radius: 4px;
  font-family: var(--vp-font-family-mono);
  font-size: var(--vp-code-font-size);
  padding: 3px 6px;
  transition: color 0.5s, background-color 0.5s;
}
.auth {
  color: var(--vp-c-yellow-darker);
  background-color: var(--vp-c-yellow-dimm-2);
}
.deprecated {
  color: var(--vp-c-red-darker);
  background-color: var(--vp-c-red-dimm-2);
}
.obsolete {
  color: var(--vp-c-white);
  background-color: var(--vp-c-red-light);
}
</style>