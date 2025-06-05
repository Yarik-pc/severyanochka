<template>
  <header class="header">
    <div class="container">
      <div class="header-wrapper">
        <div class="header-nav">
          <RouterLink to="/">
            <div class="header-nav__logo-wrapper">
              <img
                src="/images/header/small-logo.svg"
                alt="Logo"
                class="header-nav__logo"
              />
              <span class="header-nav__logo-title">Северяночка</span>
            </div>
          </RouterLink>
          <RouterLink to="/catalog">
            <button
              @mouseenter="menuStore.isOpen = true"
              @mouseleave="checkClose"
              class="header-nav__button"
            >
              <img src="/images/header/menu-burger.svg" alt="Burger" />
              <span class="header-nav__button-title">Каталог</span>
            </button>
          </RouterLink>
          <div class="header-nav__search">
            <input
              v-model="search"
              @keydown.enter="goToSearch"
              type="text"
              placeholder="Найти товар"
              class="header-nav__search-input"
            />
            <img
              src="/images/header/search.svg"
              alt="Search"
              class="header-nav__search-img"
              @click="goToSearch"
            />
          </div>
        </div>
        <div class="header-user">
          <ul class="header-user__menu">
            <RouterLink to="/favorites">
              <li class="header-user__menu-item menu-item">
                <img
                  :src="
                    $route.path === '/favorites'
                      ? '/images/header/heart-active.svg'
                      : '/images/header/heart.svg'
                  "
                  alt="Heart"
                  class="menu-item__img"
                />
                <span
                  :class="{
                    'menu-item__text-active': $route.path === '/favorites',
                  }"
                  class="menu-item__text"
                  >Избранное</span
                >
              </li>
            </RouterLink>
            <RouterLink to="/orders">
              <li class="header-user__menu-item">
                <img
                  :src="
                    $route.path === '/orders'
                      ? '/images/header/box-active.svg'
                      : '/images/header/box.svg'
                  "
                  alt="Heart"
                  class="menu-item__img"
                />
                <span
                  :class="{
                    'menu-item__text-active': $route.path === '/orders',
                  }"
                  class="menu-item__text"
                  >Заказы</span
                >
              </li>
            </RouterLink>
            <RouterLink to="/cart">
              <li class="header-user__menu-item">
                <img
                  :src="
                    $route.path === '/cart'
                      ? '/images/header/shopping-cart-active.svg'
                      : '/images/header/shopping-cart.svg'
                  "
                  alt="Heart"
                  class="menu-item__img"
                />
                <div class="menu-item__quantity-cart quantity-cart">
                  <span class="quantity-cart__number">{{ quantityCart }}</span>
                </div>
                <span
                  :class="{ 'menu-item__text-active': $route.path === '/cart' }"
                  class="menu-item__text"
                  >Корзина</span
                >
              </li>
            </RouterLink>
          </ul>
          <AppProfile />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useMenuStore } from "@/store/menu";
import { useProductsStore } from "@/store/products";
import { useRouter } from "vue-router";
import AppProfile from "./AppProfile.vue";

const menuStore = useMenuStore();
const ProductStore = useProductsStore();

const router = useRouter();
const search = ref(ProductStore.searchQuery || "");
const quantityCart = computed(() => ProductStore.quantityCart);

watch(search, (newValue) => {
  ProductStore.searchQuery = newValue;
});

const goToSearch = () => {
  if (search.value.trim()) {
    router.push({ name: "PageSearch", query: { q: search.value.trim() } });
    search.value = "";
  }
};
</script>
