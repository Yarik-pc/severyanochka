<template>
  <div class="container">
    <div class="breadcrumbs">
      <BreadCrumbs />
    </div>
    <div class="cart-header">
      <h2 class="cart-header__title large-title">Корзина</h2>
      <div class="cart-header__amount">{{ quantityCart }}</div>
    </div>
    <div class="cart">
      <div class="cart-container">
        <div class="cart-wrapper">
          <ProductCart
            v-for="cart in productStore.cart"
            :key="cart.id"
            :id="cart.id"
            :title="cart.title"
            :price="cart.price"
            :discount_price="cart.discount_price"
            :imageUrl="cart.imageUrl"
            :is_sale="cart.is_sale"
          />
        </div>
      </div>
      <div v-if="productStore.cart.length" class="cart-makeorder">
        <div class="cart-makeorder__quantity">
          <p class="makeorder-text cart-makeorder__quantity-text">Tovar</p>
        </div>
        <div class="cart-makeorder__result">
          <p class="makeorder-text cart-makeorder__result-text">Итог</p>
          <span class="cart-makeorder__result-price">{{ totalPrice }} UAH</span>
        </div>
        <p v-if="totalPrice < 1000" class="cart-makeorder__notice">
          Минимальная сумма заказа 1000р
        </p>
        <button
          :disabled="totalPrice < 1000"
          :class="{ 'cart-makeorder__btn-disabled': totalPrice < 1000 }"
          class="cart-makeorder__btn"
          @click="createOrder"
        >
          Оформить заказ
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useProductsStore } from "../store/products";
import BreadCrumbs from "../components/BreadCrumbs.vue";
import ProductCart from "../components/ProductCart.vue";
import axios from "axios";

const productStore = useProductsStore();

const totalPrice = computed(() => productStore.totalCartPrice);

const quantityCart = computed(() => productStore.quantityCart);

const orderId = ref<number | null>(null);

const clearCart = async () => {
  try {
    await Promise.all(
      productStore.cart.map(async (item) => {
        if (item.addedId) {
          await axios.delete(
            `https://dbe18d33419d0611.mokky.dev/cart/${item.addedId}`
          );
        }
      })
    );
    productStore.cart = [];
  } catch (error) {
    console.log("Ошибка очистки корзины:", error);
  }
};

const createOrder = async () => {
  if (totalPrice.value < 1000) return;

  try {
    const { data } = await axios.post(
      "https://dbe18d33419d0611.mokky.dev/orders",
      {
        items: productStore.cart,
        totalPrice: totalPrice.value,
      }
    );

    await clearCart();

    orderId.value = data.id;
  } catch (error) {
    console.log(error);
  }
};

onMounted(async () => {
  await productStore.fetchItems();
  await productStore.fetchCart();
});
</script>