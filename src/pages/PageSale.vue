<template>
  <div class="container">
    <div class="breadcrumbs">
      <BreadCrumbs />
    </div>
    <div v-if="productStore" class="page">
      <PromoSection
        :productStore="productStore.paginatedSaleItems"
        :promo="PromoData.saleBack"
      />
      <Pagination
        :totalPages="productStore.totalPagesSale"
        v-model:page="productStore.page"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useProductsStore } from "../store/products";
import BreadCrumbs from "../components/BreadCrumbs.vue";
import PromoSection from "../components/PromoSection.vue";
import PromoData from "../constants/PromoData";
import Pagination from "../components/AppPagination.vue";

const productStore = useProductsStore();

onMounted(async () => {
  await productStore.fetchItems();
  await productStore.fetchFavorites();
  await productStore.fetchCart();
});
</script>