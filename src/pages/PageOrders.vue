<template>
  <div class="container">
    <div class="breadcrumbs">
      <BreadCrumbs />
    </div>
    <div class="page-order">
      <h2 class="page-order__title large-title">Заказы</h2>
      <div class="orders">
        <div v-for="order in productStore.orders" :key="order.id" class="order">
          <div class="order-header">
            <h3 class="order-header__title">Заказ {{ order.id }}</h3>
            <span class="order-header__status">В процессе</span>
            <p class="order-header__price">{{ order.totalPrice }} UAH</p>
          </div>
          <div class="order-wrapper">
            <ProductCard
              v-for="product in visibleOrders[order.id]"
              :key="product.id"
              :id="product.id"
              :title="product.title"
              :price="product.price"
              :discount_price="product.discount_price"
              :imageUrl="product.imageUrl"
              :is_sale="product.is_sale"
              :is_new="product.is_new"
              :isFavorite="product.isFavorite"
              :isAdded="product.isAdded"
            />
          </div>
          <button class="order-btn" @click="loadMore(order.id, order.items)">
            {{ isExpanded[order.id] ? "Скрыть" : "Показать все" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useProductsStore } from "../store/products";
import BreadCrumbs from "../components/BreadCrumbs.vue";
import ProductCard from "../components/ProductCard.vue";

const productStore = useProductsStore();

const visibleOrders = ref<{ [key: number]: any[] }>([]);
const isExpanded = ref<{ [key: number]: boolean }>([]);

onMounted(async () => {
  await productStore.fetchItems();
  await productStore.fetchOrders();

  productStore.orders.forEach((order) => {
    visibleOrders.value[order.id] = order.items.slice(0, 4);
    isExpanded.value[order.id] = false;
  });
});

const loadMore = async (orderId: number, items: any[]) => {
  if (isExpanded.value[orderId]) {
    visibleOrders.value[orderId] = items.slice(0, 4);
  } else {
    visibleOrders.value[orderId] = items;
  }
  isExpanded.value[orderId] = !isExpanded.value[orderId];
};
</script>