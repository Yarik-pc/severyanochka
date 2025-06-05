<template>
  <div v-if="isModalVisible" class="modal-wrapper">
    <div class="modal-content">
      <div class="modal-content__wrapper">
        <button class="modal-content__btn-close" @click="closeModal">
          <img src="/images/header/modal-close.svg" alt="ModalClose" />
        </button>
        <h2 class="modal-content__title">
          {{ isRegistering ? "Регистрация" : "Вход" }}
        </h2>
        <label for="phone" class="modal-content__label">Телефон</label>
        <p v-if="errorMessage" class="modal-content__errorMessage">
          {{ errorMessage }}
        </p>
        <input
          v-model="phone"
          type="text"
          id="phone"
          placeholder="+380"
          class="modal-content__input"
          @input="validatePhone"
        />

        <label v-if="isRegistering" for="name" class="modal-content__label"
          >Имя</label
        >
        <input
          v-if="isRegistering"
          v-model="name"
          type="text"
          id="name"
          placeholder="Введите имя"
          class="modal-content__input"
        />
        <button
          v-if="isRegistering"
          :disabled="!canRegister"
          class="modal-content__btn"
          @click="registerUser"
        >
          Регистрироваться
        </button>
        <button
          v-else
          :disabled="!isPhoneValid"
          class="modal-content__btn"
          @click="loginUser"
        >
          Вход
        </button>
        <button class="modal-content__btn-regist" @click="switchToRegister">
          Регистрация
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, computed } from "vue";

const props = defineProps({
  isModalVisible: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["closeModal", "userLogin"]);

const closeModal = () => {
  emit("closeModal");
};

const isRegistering = ref(false);
const phone = ref("");
const name = ref("");
const errorMessage = ref("");

const isPhoneValid = computed(() => {
  return /^(\+380\d{9})$/.test(phone.value);
});

const canRegister = computed(() => {
  return isPhoneValid.value && name.value.trim().length > 1;
});

const validatePhone = () => {
  phone.value = phone.value.replace(/\s/g, "");

  if (phone.value.trim().length === 0) {
    errorMessage.value = "";
  } else if (!isPhoneValid.value) {
    errorMessage.value = "Некорректный номер телефона";
  }
};

const registerUser = () => {
  if (canRegister.value) {
    const user = { phone: phone.value, name: name.value };
    localStorage.setItem("user", JSON.stringify(user));

    isRegistering.value = false;
    phone.value = "";
    name.value = "";
    errorMessage.value = "";
  }
};

const loginUser = () => {
  const savedUser = JSON.parse(localStorage.getItem("user"));
  if (savedUser && savedUser.phone === phone.value) {
    emit("userLogin", savedUser.name);
    emit("closeModal");
  } else {
    errorMessage.value = "Неверный номер телефона";
  }
};

const switchToRegister = (): void => {
  isRegistering.value = !isRegistering.value;
  errorMessage.value = "";
};
</script>
