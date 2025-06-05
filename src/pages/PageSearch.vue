<template>
  <div class="container">
    <div class="search">
      <template v-if="searchQuery">
        <h2 class="search-title">Результаты поиска</h2>

        <p class="search-request">
          по запросу:
          <span class="search-request__query">{{ searchQuery }}</span>
        </p>
      </template>
      <div v-if="productStore.paginatedItems.length">
        <ProductList :items="productStore.paginatedItems" />
        <Pagination
          :totalPages="productStore.totalPages"
          v-model:page="productStore.page"
        />
      </div>

      <p v-else class="search-title__error">Ничего не найдено</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useProductsStore } from "../store/products";
import { useRoute } from "vue-router";
import ProductList from "../components/ProductList.vue";
import Pagination from "../components/AppPagination.vue";

const productStore = useProductsStore();
const route = useRoute();

const searchQuery = computed(() => route.query.q || "");

onMounted(async () => {
  await productStore.fetchItems();
  await productStore.fetchFavorites();
  await productStore.fetchCart();
});
</script>