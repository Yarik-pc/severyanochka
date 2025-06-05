<template>
  <div class="container">
    <div class="breadcrumbs">
      <BreadCrumbs />
    </div>
    <div class="page">
      <PromoHeader v-bind="PromoData.articlesBack" />
      <ArticlesList :articels="requestArticles" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import BreadCrumbs from "../components/BreadCrumbs.vue";
import PromoHeader from "../components/PromoHeader.vue";
import PromoData from "../constants/PromoData";
import ArticlesList from "../components/ArticlesList.vue";
import ArticlesConst from "../constants/ArticlesConst";
import Article from "../types/Article";

const requestArticles = computed<Article[]>(() => ArticlesConst);
</script>