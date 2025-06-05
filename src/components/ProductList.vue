<template>
  <div class="product-wrapper">
    <ProductCard
      v-for="item in props.items"
      :key="item.id"
      :id="item.id"
      :title="item.title"
      :price="item.price"
      :discount_price="item.discount_price"
      :imageUrl="item.imageUrl"
      :is_sale="item.is_sale"
      :is_new="item.is_new"
      :isFavorite="item.isFavorite"
      :isAdded="item.isAdded"
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType } from "vue";
import ProductCard from "../components/ProductCard.vue";
import Product from "../types/Product";

const props = defineProps({
  items: {
    type: Array as PropType<Product[]>,
    required: true,
  },
});
</script>