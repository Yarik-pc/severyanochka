<template>
  <div class="card">
    <img
      :src="
        props.isFavorite ? '/images/main/like2.svg' : '/images/main/like1.svg'
      "
      alt="like"
      class="card-liked"
      @click="clickOnFavorite(props)"
    />
    <img :src="props.imageUrl" alt="Product" class="card-img" />
    <div class="card-content">
      <div class="card-content__price">
        <p v-if="is_sale" class="card-content__price-discount">
          {{ discount_price }} UAH
        </p>
        <b class="card-content__price-default">{{ price }} UAH</b>
      </div>
      <h3 class="card-content__title">{{ title }}</h3>
      <button
        :class="{ added: props.isAdded, notAdded: !props.isAdded }"
        class="card-content__btn"
        @click="addToCart(props)"
      >
        <span v-if="props.isAdded">В корзине</span>
        <span v-else>В корзину</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { useProductsStore } from "../store/products";

const props = defineProps({
  id: Number,
  title: String,
  price: Number,
  discount_price: Number,
  imageUrl: String,
  is_sale: Boolean,
  is_new: Boolean,
  categoryId: Number,
  isFavorite: {
    type: Boolean,
    default: false,
  },
  favoriteId: {
    type: Number,
    required: false,
    default: null,
  },
  parentId: Number,
  isAdded: {
    type: Boolean,
    defeult: false,
  },
});

const productStore = useProductsStore();

const clickOnFavorite = productStore.addTofavorite;
const addToCart = productStore.addToCart;
</script>