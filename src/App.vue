<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import UserProfile from "./components/UserProfile.vue";
import { useStore } from "vuex";
import type { GlobalDataProps } from "./store";
import { computed } from "@vue/runtime-core";

const store = useStore<GlobalDataProps>();
const userInfo = computed(() => store.state.user);
</script>

<template>
  <!-- <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </header> -->

  <div class="homepage-container">
    <a-layout :style="{ background: '#fff' }">
      <a-layout-header class="header">
        <div class="page-title">吉利乐高</div>
        <div class="right-col">
          <user-profile :user="userInfo"></user-profile>
        </div>
      </a-layout-header>
      <a-layout-content class="home-layout">
        <RouterView />
      </a-layout-content>
    </a-layout>
    <a-layout-footer> @Gary Li </a-layout-footer>
  </div>
</template>

<style scoped>
.page-title {
  color: #fff;
}
</style>
