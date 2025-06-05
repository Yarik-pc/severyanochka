<template>
  <div
    v-if="menuStore.isOpen"
    class="catalog-dropdown dropdown-menu"
    @mouseenter="menuStore.isOpen = true"
    @mouseleave="menuStore.isOpen = false"
  >
    <div class="container">
      <ul class="dropdown-menu__list">
        <li
          v-for="category in categories"
          :key="category.id"
          class="dropdown-menu__item"
          @click="goToCategory(category.url)"
        >
          {{ category.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMenuStore } from "@/store/menu";
import { computed } from "vue";
import { useRouter } from "vue-router";
import CatalogCategories from "../constants/CatalogCategories";
import CategoriesTypes from "../types/Categories";

const menuStore = useMenuStore();

const categories = computed<CategoriesTypes[]>(() => CatalogCategories);

const router = useRouter();

const goToCategory = (categoryId: number) => {
  router.push({ path: `/catalog/${categoryId}` });
  menuStore.isOpen = false;
};
</script>
