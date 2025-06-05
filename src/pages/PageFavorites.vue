<template>
  <div class="container">
    <div class="breadcrumbs">
      <BreadCrumbs />
    </div>
    <div class="favorite">
      <h2 class="favorite-title title">Избраное</h2>
      <div class="favorite-wrapper">
        <ProductList :items="productStore.favorites" />
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useProductsStore } from "../store/products";
import BreadCrumbs from "../components/BreadCrumbs.vue";
import ProductList from "../components/ProductList.vue";

const productStore = useProductsStore();

onMounted(async () => {
  await productStore.fetchItems();
  await productStore.fetchFavorites();
});
</script>