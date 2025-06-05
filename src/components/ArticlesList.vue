<template>
  <div class="articles-wrapper">
    <ArticleCard
      v-for="article in articels"
      :key="article.id"
      :id="article.id"
      :imageUrl="article.imageUrl"
      :date="article.date"
      :title="article.title"
      :text="article.text"
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType } from "vue";
import ArticleCard from "../components/ArticleCard.vue";
import Article from "../types/Article";

defineProps({
  articels: {
    type: Array as PropType<Article[]>,
    required: true,
  },
});
</script>