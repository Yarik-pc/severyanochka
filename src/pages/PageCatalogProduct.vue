<template>
  <div class="container">
    <div class="breadcrumbs">
      <BreadCrumbs />
    </div>
    <div class="catalog-product">
      <div class="catalog-page">
        <h1 v-if="category" class="catalog-page__title title">
          {{ category.name }}
        </h1>
        <div v-if="filteredProducts.length > 0" class="catalog-page__list">
          <div
            v-for="product in paginatedProducts"
            :key="product.id"
            class="catalog-page__item"
          >
            <img
              :src="
                product.isFavorite
                  ? '/images/main/like2.svg'
                  : '/images/main/like1.svg'
              "
              alt="like"
              class="card-liked"
              @click="clickOnFavorite(product)"
            />
            <img
              :src="product.imageUrl"
              :alt="product.title"
              class="catalog-page__item-img"
            />
            <div class="catalog-page__item-content">
              <h2 class="catalog-page__item-title">{{ product.title }}</h2>
              <p class="catalog-page__item-price">
                Цена: {{ product.price }} UAH
              </p>
              <button
                :class="{ added: product.isAdded, notAdded: !product.isAdded }"
                class="catalog-page__item-btn"
                @click="addToCart(product)"
              >
                <span v-if="product.isAdded">В корзине</span>
                <span v-else>В корзину</span>
              </button>
            </div>
          </div>
        </div>
        <p v-else class="catalog-page__error">Нет товаров в этой категории.</p>
      </div>
      <Pagination :totalPages="totalProducts" v-model:page="page" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useProductsStore } from "../store/products";
import BreadCrumbs from "../components/BreadCrumbs.vue";
import CatalogCategories from "../constants/CatalogCategories";
import Pagination from "../components/AppPagination.vue";

const route = useRoute();
const productStore = useProductsStore();
const products = productStore.items;

const categoryUrl = computed(() => String(route.params.url));

const category = computed(() =>
  CatalogCategories.find((cat) => cat.url === categoryUrl.value)
);

const filteredProducts = computed(() =>
  products.filter((product) => product.categoryUrl === categoryUrl.value)
);

const page = ref(1);
const perPage = ref(8);

const paginatedProducts = computed(() => {
  const start = (page.value - 1) * perPage.value;
  const end = start + perPage.value;
  return filteredProducts.value.slice(start, end);
});

const totalProducts = computed(() =>
  Math.ceil(filteredProducts.value.length / perPage.value)
);

watch(filteredProducts, () => {
  page.value = 1;
});

const clickOnFavorite = productStore.addTofavorite;
const addToCart = productStore.addToCart;
</script>