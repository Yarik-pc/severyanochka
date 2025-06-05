import { createApp } from "vue";
import { createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";

import "./assets/main.scss";

import PageHome from "./pages/PageHome.vue";
import PageCatalog from "./pages/PageCatalog.vue";
import PageCatalogProduct from "./pages/PageCatalogProduct.vue";
import PageSale from "./pages/PageSale.vue";
import PageNew from "./pages/PageNew.vue";
import PageSearch from "./pages/PageSearch.vue";
import PageArticles from "./pages/PageArticles.vue";
import PageFavorites from "./pages/PageFavorites.vue";
import PageOrders from "./pages/PageOrders.vue";
import PageCart from "./pages/PageCart.vue";
import PageAboutUs from "./pages/PageAboutUs.vue";
import PageContacts from "./pages/PageContacts.vue";
import PageVacancies from "./pages/PageVacancies.vue";

const app = createApp(App);

const routes = [
  {
    path: "/", name: "Home", component: PageHome,
    meta: {
      breadcrumb: [{ name: "Главная", link: "/" }],
    },
  },
  {
    path: "/catalog", name: "Catalog", component: PageCatalog,
    meta: {
      breadcrumb: [{ name: "Главная", link: "/" },
      { name: "Каталог" }],
    },
  },
  {
    path: "/catalog/:url", name: "PageCatalog", component: PageCatalogProduct,
    meta: {
      breadcrumb: [],
    },
  },
  {
    path: "/sales", name: "PageSale", component: PageSale,
    meta: {
      breadcrumb: [{ name: "Главная", link: "/" },
      { name: "Акции" }],
    },
  },
  {
    path: "/new", name: "PageNew", component: PageNew,
    meta: {
      breadcrumb: [{ name: "Главная", link: "/" },
      { name: "Новинки" }],
    },
  },
  { path: "/search", name: "PageSearch", component: PageSearch, },
  {
    path: "/articles", name: "PageArticles", component: PageArticles,
    meta: {
      breadcrumb: [{ name: "Главная", link: "/" },
      { name: "Статьи" }],
    },
  },
  {
    path: "/favorites", name: "PageFavorites", component: PageFavorites,
    meta: {
      breadcrumb: [{ name: "Главная", link: "/" },
      { name: "Избраное" }],
    },
  },
  {
    path: "/orders", name: "PageOrders", component: PageOrders,
    meta: {
      breadcrumb: [{ name: "Главная", link: "/" },
      { name: "Заказы" }],
    },
  },
  {
    path: "/cart", name: "PageCart", component: PageCart,
    meta: {
      breadcrumb: [{ name: "Главная", link: "/" },
      { name: "Корзина" }],
    },
  },
  {
    path: "/aboutus", name: "aboutus", component: PageAboutUs,
    meta: {
      breadcrumb: [{ name: "Главная", link: "/" },
      { name: "О компании" }],
    },
  },
  {
    path: "/contacts", name: "contacts", component: PageContacts,
    meta: {
      breadcrumb: [{ name: "Главная", link: "/" },
      { name: "Контакты" }],
    },
  },
  {
    path: "/vacancies", name: "vacancies", component: PageVacancies,
    meta: {
      breadcrumb: [{ name: "Главная", link: "/" },
      { name: "Вакансии" }],
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name === "PageCatalog" && to.params.url) {
    to.meta.breadcrumb = [
      { name: "Главная", link: "/" },
      { name: "Каталог", link: "/catalog" },
      { name: String(to.params.url) },
    ];
  }
  next();
});

app.use(router);
app.use(createPinia());
app.mount("#app");