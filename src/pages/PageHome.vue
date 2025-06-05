<template>
  <HomeCarousel />
  <div class="home">
    <div class="container">
      <div class="home-wrapper">
        <div class="sale-products">
          <PromoSection
            :productStore="productStore.saleItems.slice(0, 4)"
            :promo="PromoData.sale"
          />
        </div>
        <div class="new-products">
          <PromoSection
            :productStore="productStore.newItems.slice(0, 4)"
            :promo="PromoData.new"
          />
        </div>
        <div class="offer">
          <AppOffer />
        </div>
        <div class="map">
          <AppMap />
        </div>
        <div class="article">
          <AppArticles :promo="PromoData.articles" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useProductsStore } from "../store/products";
import HomeCarousel from "../components/HomeCarousel.vue";
import PromoSection from "../components/PromoSection.vue";
import AppOffer from "../components/AppOffer.vue";
import AppArticles from "../components/AppArticles.vue";
import AppMap from "../components/AppMap.vue";
import PromoData from "../constants/PromoData";

const productStore = useProductsStore();

onMounted(async () => {
  await productStore.fetchItems();
  await productStore.fetchCart();
  await productStore.fetchFavorites();
});
</script>
