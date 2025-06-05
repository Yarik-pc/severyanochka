<template>
  <div class="catalog">
    <div class="container">
      <div class="catalog-wrapper">
        <CatalogDropdown />

        <div class="breadcrumbs">
          <BreadCrumbs />
        </div>

        <div class="catalog-categories">
          <h1 class="catalog-categories__title large-title">Каталог</h1>
          <div class="catalog-categories__wrapper">
            <div
              v-for="category in categories"
              :key="category.id"
              class="catalog-categories__block"
              @click="goToCategory(category.url)"
            >
              <img
                :src="category.image"
                :alt="category.name"
                class="catalog-categories__img"
              />
              <span class="catalog-categories__span">{{ category.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import CatalogDropdown from "../components/CatalogDropdown.vue";
import BreadCrumbs from "../components/BreadCrumbs.vue";
import CatalogCategories from "../constants/CatalogCategories";
import categoriesTypes from "../types/Categories";

const categories = computed<categoriesTypes[]>(() => CatalogCategories);

const router = useRouter();

const goToCategory = (categoryUrl: string) => {
  router.push(`/catalog/${categoryUrl}`);
};
</script>
