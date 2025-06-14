import { defineStore } from "pinia";
import { ref, onMounted } from "vue";
import { useProductsStore } from "../store/products";

export const useProfileStore = defineStore("profile", () => {
  const productStore = useProductsStore();

  const isEntered = ref(false);

  const userLogout = () => {
    isEntered.value = false;
    localStorage.removeItem("user");
    productStore.resetStore()
  };

  const userName = ref("");

  const handleUserLogin = (name: string) => {
    userName.value = name;
    isEntered.value = true;
  };

  const isModalVisible = ref(false);
  const phone = ref("");

  const toggleLoginModal = () => {
    isModalVisible.value = true;
  };

  const handleCloseModal = () => {
    isModalVisible.value = false;
    phone.value = "";
  };

  onMounted(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user && user.name) {
        userName.value = user.name;
        isEntered.value = true;
      }
    }
  });

  return {
    isEntered,
    userName,
    isModalVisible,

    userLogout,
    handleUserLogin,
    toggleLoginModal,
    handleCloseModal,
  }
});