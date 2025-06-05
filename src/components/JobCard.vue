<template>
  <div class="vacancies-card">
    <h2 class="vacancies-card__title">Должность</h2>

    <div class="vacancies-card__section">
      <h3 class="vacancies-card__section-title">Требования</h3>
      <p class="vacancies-card__section-text">{{ item.requirements }}</p>
    </div>

    <div class="vacancies-card__section">
      <h3 class="vacancies-card__section-title">Обязанности</h3>
      <p class="vacancies-card__section-text">{{ item.responsibilities }}</p>
    </div>

    <div class="vacancies-card__section">
      <h3 class="vacancies-card__section-title">Условия</h3>
      <p class="vacancies-card__section-text">{{ item.conditions }}</p>
    </div>

    <div class="vacancies-card__contact">
      <h3 class="vacancies-card__contact-title">Звоните</h3>
      <div class="vacancies-card__contact-numbers contact-numbers">
        <img
          src="/images/main/vacancies/phone.svg"
          alt="phone"
          class="contact-numbers__img"
        />
        <a :href="'tel:' + item.phone" class="contact-numbers__phone">{{
          item.phone
        }}</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

defineProps<{
  item: {
    requirements: string;
    responsibilities: string;
    conditions: string;
    phone: string;
  };
}>();
</script>