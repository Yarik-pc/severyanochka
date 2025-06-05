<template>
  <PromoHeader v-bind="promo" />
  <ProductList :items="productStore" />
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import PromoHeader from "./PromoHeader.vue";
import ProductList from "./ProductList.vue";

defineProps({
  productStore: {
    type: Array,
    required: true,
  },

  promo: {
    type: Object,
    required: true,
  },
});
</script>