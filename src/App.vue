<script lang="ts" setup>
import Uploader from "./components/Uploader.vue";
</script>

<template>
  <div id="app">
    <Uploader action="https://www.baidu.com"></Uploader>
    <router-view />
  </div>
</template>

<style></style>
