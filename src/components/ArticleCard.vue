<template>
  <div class="article-card">
    <img :src="imageUrl" alt="Article Img" class="article-card__img" />
    <div class="article-card__content">
      <span class="article-card__content-date">{{ date }}</span>
      <h3 class="article-card__content-title">{{ title }}</h3>
      <p class="article-card__content-text">{{ text }}</p>
      <button class="article-card__content-btn">Подробнее</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import Arcticle from "../types/Article";

defineProps<Arcticle>();
</script>
