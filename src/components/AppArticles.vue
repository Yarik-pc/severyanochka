<template>
  <div class="container">
    <PromoHeader v-bind="promo" />
    <ArticlesList :articels="requestArticles.slice(0, 3)" />
  </div>
</template>


<script setup lang="ts">
import { defineProps, computed } from "vue";
import PromoHeader from "../components/PromoHeader.vue";
import ArticlesConst from "../constants/ArticlesConst";
import ArticlesList from "../components/ArticlesList.vue";
import Article from "../types/Article";

defineProps({
  promo: {
    type: Object,
    required: true,
  },
});

const requestArticles = computed<Article[]>(() => ArticlesConst);
</script>