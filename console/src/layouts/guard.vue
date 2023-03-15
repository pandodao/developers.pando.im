<template>
  <VLayout class="layout-guard">
    <VMain>
      <VRow no-gutters>
        <VCol v-if="!smAndDown" cols="12" md="6">
          <div class="cover-wrapper">
            <div class="cover"></div>
          </div>
        </VCol>
        <VCol cols="12" md="6">
          <div class="form-wrapper">
            <div class="form">
              <div class="logo-wrapper">
                <div class="logo-mask"></div>
                <img :src="logo" :height="40" />
              </div>
              <div class="">
                <div class="code-block mb-8">
                  <h1 class="font-weight-bold mb-1">{{ t("guard.title") }}</h1>
                  <div class="desc text-greyscale_3">{{ t("guard.text") }}</div>
                </div>
                <FButton color="primary" rounded="sm" @click="conn" block>{{ t("connect_wallet") }}</FButton>
                <div class="links d-flex pt-4 text-caption">
                  <a href="https://pando.im/" target="_blank">Pando.im</a>
                  <a href="https://developers.pando.im/" target="_blank">{{ t("documents") }}</a>
                </div>
              </div>
            </div>
          </div>
        </VCol>
        <VCol>
        </VCol>
      </VRow>
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
import { useDisplay } from "vuetify";
const { smAndDown } = useDisplay();
const { login } = useAccount();
const { t } = useI18n({ useScope: "local" });

function conn() {
  login()
}
</script>
<style lang="scss" scoped>
.layout-guard {
  height: 100vh;
}
.v-container {
  height: 100vh;
  .v-row {
  }
}
.cover-wrapper {
  height: 100vh;
  padding: 20px;
  .cover {
    background: transparent url(~/assets/images/guard-cover.webp) no-repeat center center;
    background-size: cover;
    height: 100%;
    border-radius: 2rem;
  }
}
.form-wrapper {
  height: 100vh;
  padding: 20px;
  display: flex;
  justify-content: center;
  .form {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 360px;
  }
}

.code-block {
  background: rgb(var(--v-theme-greyscale_6));
  border-radius: 3px;
  padding: 16px;
  font-family: 'Courier New', Courier, monospace;
  h1 {
    font-size: 1rem;
    margin: 0;
    font-weight: normal;
  }
  div {
    font-size: 1rem;
    margin: 0;
  }
  .desc {
    &::after {
      content: "";
      animation: fade 2s infinite;
      height: 1rem;
      width: 0.5rem;
      display: inline-block;
      background: rgb(var(--v-theme-greyscale_3));
      margin-bottom: -2px;
      margin-left: 0.2rem;
    }
  }
  h1, .desc {
    &::before {
      content: "> ";
      color: rgb(var(--v-theme-link));
    }
  }
}

.links {
  a {
    margin: 0 16px 0 0;
    color: rgb(var(--v-theme-greyscale_3)) !important;
  }
}
.logo-wrapper {
  position: relative;
  padding: 20px 0;
}

.logo-mask {
  position: absolute;
  height: 54%;
  width: 100%;
  top: 0px;
  background: linear-gradient(to top, transparent, #f8f8f801);
  mask-image: linear-gradient(to bottom, hsl(0, 0, 99%) 25%, transparent);
  backdrop-filter: blur(1px);
  will-change: transform;
  z-index: 2;
  transform: rotate(3deg) translateX(-10px);
}

@keyframes fade {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
