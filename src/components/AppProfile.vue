<template>
  <div class="header-user__profile">
    <div
      v-if="profileStore.isEntered"
      @mouseenter="showMenu = true"
      @mouseleave="showMenu = false"
      class="header-user__profile-entered profile-entered"
    >
      <div class="user-info">
        <img
          src="/images/header/avatar.png"
          alt="Avatar"
          class="user-info__avatar"
        />
        <span class="user-info__name">{{ profileStore.userName }}</span>
        <img
          src="/images/header/chevron.svg"
          alt="Chevron"
          :class="{ 'chevron-up': showMenu, 'chevron-down': !showMenu }"
        />
      </div>

      <div v-if="showMenu" class="user-dropdown__menu">
        <div class="user-dropdown__menu-item">
          <span> Профиль</span>
          <img src="/images/header/chevron.svg" alt="Chevron" />
        </div>
        <div @click="profileStore.userLogout" class="user-dropdown__menu-item">Выйти</div>
      </div>
    </div>

    <div v-else class="header-user__profile-notentered profile-notentered">
      <button @click="profileStore.toggleLoginModal" class="profile-notentered__btn">
        <span class="profile-notentered__btn-title">Войти</span>
        <img
          src="/images/header/log-in.svg"
          alt="enter"
          class="profile-notentered__btn-img"
        />
      </button>
    </div>
  </div>

  <ModalWindow
    :isModalVisible="profileStore.isModalVisible"
    @closeModal="profileStore.handleCloseModal"
    @userLogin="profileStore.handleUserLogin"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import ModalWindow from "./ModalWindow.vue";
import { useProfileStore } from "../store/profile";

const profileStore = useProfileStore();

// const isEntered = ref(false);

// const userLogout = () => {
//   isEntered.value = false;
// };

const showMenu = ref(false);

// const userName = ref("");

// const handleUserLogin = (name: string) => {
//   userName.value = name;
//   isEntered.value = true;
// };

// const isModalVisible = ref(false);
// const phone = ref("");

// const toggleLoginModal = () => {
//   isModalVisible.value = true;
// };

// const handleCloseModal = () => {
//   isModalVisible.value = false;
//   phone.value = "";
// };

// onMounted(() => {
//   const storedUser = localStorage.getItem("user");
//   if (storedUser) {
//     const user = JSON.parse(storedUser);
//     if (user && user.name) {
//       userName.value = user.name;
//       isEntered.value = true;
//     }
//   }
// });
</script>
