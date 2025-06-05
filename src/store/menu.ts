import { defineStore } from "pinia";
import { ref } from "vue";

export const useMenuStore = defineStore("menu", () => {
  const isOpen = ref(false);

  return { isOpen };
});