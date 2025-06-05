<template>
  <div class="wrapper">
    <app-header />
    <main><RouterView /></main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";
</script>


<style lang="scss">
@import "./assets/style.scss";
</style>
