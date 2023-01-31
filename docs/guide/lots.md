# Pando Lots 

Pando Lots provides APIs to access communities and conversations based on Mixin Messenger's messages service.

A community is a group of users who share the same interests. A community is identified by a Mixin Digital ID. A community can be public or private. A public community can be joined by anyone. A private community can be joined by invitation or payment.

## How to engage with a community

There are two ways to engage with a community:

1. Use Mixin Messenger
   Sign up a Mixin Messenger account. Download Messenger from https://mixin.network/messenger and sign up.
   Search the community ID in Mixin Messenger. For example, Pando's community ID is `7000104110`, and you can search it by entering `7000104110` in Mixin Messenger.

2. Web Access

   If the community is public and the owner has enabled the web access, people can access the community via web browsers. This example shows how it works.

## Integration

::: code-group

```jsx [Vue]
<pando-lots
  type="card"
  group-id="7000103XX1"
  theme-color="#88E108"
  @error="handleError"
  api-base="https://supergroup.mixin.fan/v1"
  ws-base="wss://supergroup-ws.mixin.fan"
/>

<pando-lots
  type="button"
  group-id="7000103XX2"
  theme-color="#EE4596"
  @error="handleError"
  api-base="https://supergroup.mixin.fan/v1"
  ws-base="wss://supergroup-ws.mixin.fan"
/>

<pando-lots
  group-id="7000103XX3"
  theme-color="#88E108"
  api-base="https://supergroup.mixin.fan/v1"
  ws-base="wss://supergroup-ws.mixin.fan"
>
  <template #activator="{ on }">
    <button v-on="on">
      Custom Entry
    </button>
  </template>
</pando-lots>

import PandoLots from '@foxone/pando-lots-vue';
import "@foxone/pando-lots-vue/lib/index.css";

Vue.use(PandoLots);
```

:::