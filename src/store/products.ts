import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import Product from "../types/Product";
import Orders from "../types/Orders";
import { useProfileStore } from "../store/profile";

export const useProductsStore = defineStore("products", () => {
  const items = ref<Product[]>([]);
  const favorites = ref<Product[]>([]);
  const cart = ref<Product[]>([]);
  const orders = ref<Orders[]>([]);
  const quantityCart = computed(() => cart.value.length);
  const page = ref(1);
  const perPage = ref(8);
  const searchQuery = ref("");

  const route = useRoute();

  const profileStore = useProfileStore();

  const filteredItems = computed(() => {
    const query = route.query.q ? route.query.q.toString().toLowerCase() : "";
    if (!query) return items.value;

    return items.value.filter((item) =>
      item.title.toLowerCase().includes(query)
    );
  });

  const saleItems = computed(() => items.value.filter((item) => item.is_sale));
  const newItems = computed(() => items.value.filter((item) => item.is_new));

  const paginatedSaleItems = computed(() => {
    const start = (page.value - 1) * perPage.value;
    const end = start + perPage.value;
    return saleItems.value.slice(start, end);
  });

  const paginatedNewItems = computed(() => {
    const start = (page.value - 1) * perPage.value;
    const end = start + perPage.value;
    return newItems.value.slice(start, end);
  });

  const paginatedItems = computed(() => {
    const start = (page.value - 1) * perPage.value;
    const end = start + perPage.value;
    return filteredItems.value.slice(start, end);
  });

  const fetchItems = async () => {
    try {
      const { data } = await axios.get<Product[]>('https://dbe18d33419d0611.mokky.dev/product');

      items.value = data.map((obj) => ({
        ...obj,
        isFavorite: false,
        isAdded: false,
      }));
    } catch (error) {
      console.log("Ошибка запроса Product", error);
    }
  };

  const fetchFavorites = async () => {
    try {
      if (profileStore.isEntered) {
        const { data: favoriteData } = await axios.get<Product[]>('https://dbe18d33419d0611.mokky.dev/favorites');

        items.value = items.value.map(item => {
          const favorite = favoriteData.find(fav => fav.parentId === item.id);

          if (!favorite) {
            return item;
          }

          return {
            ...item,
            isFavorite: true,
            favoriteId: favorite.id,
          }
        });
        favorites.value = items.value.filter(item => item.isFavorite);
      } return
    } catch (error) {
      console.log(error);
    }
  }

  const addTofavorite = async (item: Product) => {
    try {
      if (!item.isFavorite && profileStore.isEntered) {
        const obj = {
          parentId: item.id,
        }

        const { data } = await axios.post<Product>(`https://dbe18d33419d0611.mokky.dev/favorites`, obj);

        const product = items.value.find((product) => product.id === item.id);

        if (product) {
          product.isFavorite = true;
          product.favoriteId = data.id;
          favorites.value.push(product);
        }
      } else {
        const product = items.value.find((product) => product.id === item.id);
        if (product) {
          await axios.delete(`https://dbe18d33419d0611.mokky.dev/favorites/${product.favoriteId}`);
          product.isFavorite = false;

          favorites.value = favorites.value.filter((fav) => fav.id !== product.id);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const fetchCart = async () => {
    try {
      if (profileStore.isEntered) {
        const { data: cartData } = await axios.get<Product[]>('https://dbe18d33419d0611.mokky.dev/cart');

        items.value = items.value.map(item => {
          const availableCart = cartData.find(cart => cart.cartId === item.id);

          if (!availableCart) {
            return item;
          }

          return {
            ...item,
            isAdded: true,
            addedId: availableCart.id,
          }
        });
        cart.value = items.value.filter(item => item.isAdded);
      } return
    } catch (error) {
      console.log("Ошибка запроса Cart", error);
    }
  }

  const addToCart = async (item: Product) => {
    if (!item.isAdded && profileStore.isEntered) {
      const obj = {
        cartId: item.id,
      }
      const { data } = await axios.post<Product>('https://dbe18d33419d0611.mokky.dev/cart', obj);

      const product = items.value.find((product) => product.id === item.id);

      if (product) {
        product.isAdded = true;
        product.addedId = data.id;
        cart.value.push(product);
      }
    }
  }

  const fetchOrders = async () => {
    const { data } = await axios.get<Orders[]>('https://dbe18d33419d0611.mokky.dev/orders');

    orders.value = data;
  }

  const changePage = (newPage: number) => {
    page.value = newPage;
  };

  const totalPagesSale = computed(() => Math.ceil(saleItems.value.length / perPage.value));
  const totalPagesNew = computed(() => Math.ceil(newItems.value.length / perPage.value))
  const totalPages = computed(() => Math.ceil(filteredItems.value.length / perPage.value));

  const totalCartPrice = computed(() => {
    return cart.value.reduce((sum, cartItem) => {
      const price = Number(cartItem.is_sale ? cartItem.discount_price : cartItem.price) || 0;
      const quantity = Number(cartItem.quantity) || 1;
      return sum + price * quantity;
    }, 0);
  });

  const updateQuantity = (id: number, newQuantity: number) => {
    const product = cart.value.find((item) => item.id === id);
    if (product) {
      product.quantity = Math.max(newQuantity, 1); // Не даем уйти в 0
    }
  };

  const resetStore = () => {
    items.value = items.value.map((item) => ({
      ...item,
      isFavorite: false,
      isAdded: false,
      favoriteId: null,
      addedId: null,
      quantity: 1,
    }));

    favorites.value = [];
    cart.value = [];
    orders.value = [];
  };

  return {
    items,
    favorites,
    cart,
    quantityCart,
    orders,
    searchQuery,

    saleItems,
    newItems,
    filteredItems,

    fetchItems,
    fetchFavorites,
    fetchCart,
    fetchOrders,

    addTofavorite,
    addToCart,

    paginatedSaleItems,
    paginatedNewItems,
    paginatedItems,

    page,

    totalPagesSale,
    totalPagesNew,
    totalPages,

    totalCartPrice,
    updateQuantity,
    resetStore,
  };
});