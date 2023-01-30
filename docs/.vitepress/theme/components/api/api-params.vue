<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Required</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="param, ix in params" :key="`param-ix`">
          <td>{{ param.name }}</td>
          <td>{{ param.type }}</td>
          <td>{{ param.required }}</td>
          <td>{{ param.description }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
export default {
  name: "APIParams",
};
</script>

<script setup lang="ts">

const props = defineProps({
  params: {
    type: Array<any>(),
    default: () => [],
  },
});

</script>

<style lang="css" scoped>
.url {
  background: white;
}
</style>