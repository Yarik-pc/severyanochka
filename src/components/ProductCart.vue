<template>
  <div class="product-cart">
    <div class="product-cart__container-one">
      <img :src="props.imageUrl" alt="Product" class="product-cart__img" />
      <div class="product-cart__content">
        <p class="product-cart__text">{{ title }}</p>
        <div class="product-cart__price-wrapper">
          <div v-if="is_sale" class="product-cart__price-block">
            <p class="product-cart__price-discount cart-price">
              {{ discount_price }} UAH
            </p>
            <span class="product-cart__price-sale">С картой</span>
          </div>
          <div class="product-cart__price-block">
            <p class="product-cart__price cart-price">{{ price }} UAH</p>
            <span v-if="is_sale" class="product-cart__price-sale">Обычная</span>
          </div>
          <span class="product-cart__price-onepiece">за шт.</span>
        </div>
      </div>
    </div>
    <div class="product-cart__container-two">
      <div class="product-cart__quantity quantity">
        <div class="quantity-selector">
          <button class="quantity-button" @click="decreaseQuantity">
            <img src="/images/main/minus.png" alt="minus" />
          </button>
          <span class="quantity-value">{{ quantity }}</span>
          <button class="quantity-button" @click="increaseQuantity">
            <img src="/images/main/plus.png" alt="plus" />
          </button>
        </div>
        <span class="quantity-totalprice">{{ totalPrice }}UAH</span>
      </div>
      <div class="product-cart__delete" @click="removeCart(props)">
        <img src="/images/main/trash.svg" alt="Delete" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { defineProps, ref, watchEffect } from "vue";
import { useProductsStore } from "../store/products";
import axios from "axios";
import Product from "../types/Product";

const props = defineProps({
  id: Number,
  title: String,
  price: Number,
  discount_price: Number,
  imageUrl: String,
  is_sale: Boolean,
  is_new: Boolean,
  quantity: Number,
});

const productStore = useProductsStore();

const quantity = ref(props.quantity || 1);

watchEffect(() => {
  quantity.value = props.quantity || 1;
});

const increaseQuantity = () => {
  quantity.value++;
  productStore.updateQuantity(props.id!, quantity.value + 1);
};

const decreaseQuantity = () => {
  quantity.value = Math.max(quantity.value - 1, 1);
  productStore.updateQuantity(props.id!, quantity.value - 1);
};

const totalPrice = computed(() => {
  return props.is_sale
    ? props.discount_price * quantity.value
    : props.price * quantity.value;
});

const removeCart = async (item: Product) => {
  const items = productStore.items;

  const product = items.find((product) => product.id === item.id);
  if (product) {
    await axios.delete(
      `https://dbe18d33419d0611.mokky.dev/cart/${product.addedId}`
    );
    product.isAdded = false;

    productStore.cart = productStore.cart.filter(
      (cart) => cart.id !== product.id
    );
  }
};
</script>