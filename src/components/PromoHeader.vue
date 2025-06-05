<template>
  <div class="products__header">
    <h2 class="products__header-title title">{{ title }}</h2>
    <RouterLink :to="link">
      <a class="products__header-link">
        <span>{{ linkText }}</span>
        <img src="/images/main/arrow-right.svg" alt="Arrow"
      /></a>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

defineProps({
  title: {
    type: String,
    required: true,
  },

  link: {
    type: String,
    required: true,
  },

  linkText: {
    type: String,
    required: true,
  },
});
</script>