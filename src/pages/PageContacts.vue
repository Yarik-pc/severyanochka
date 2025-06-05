<template>
  <div class="container">
    <div class="breadcrumbs">
      <BreadCrumbs />
    </div>
    <div class="contacts">
      <h2 class="contacts-title large-title">Контакты</h2>
      <div class="contacts-numbers">
        <div class="contacts-numbers__block">
          <img
            src="/images/main/contacts/house.svg"
            alt="house"
            class="contacts-numbers__block-img"
          />
          <div class="contacts-numbers__block-content numbers__block-content">
            <p class="numbers__block-content__text">Бухгалтерия, склад</p>
            <a href="tel:+7 82140 92619" class="numbers__block-content__phone"
              >+7 82140 92619</a
            >
          </div>
        </div>
        <div class="contacts-numbers__block">
          <img
            src="/images/main/contacts/percent.svg"
            alt="percent"
            class="contacts-numbers__block-img"
          />
          <div class="contacts-numbers__block-content numbers__block-content">
            <p class="numbers__block-content__text">
              Вопросы по системе лояльности
            </p>
            <a href="tel:+7 908 716 33 97" class="numbers__block-content__phone"
              >+7 908 716 33 97</a
            >
          </div>
        </div>
      </div>
      <div class="contacts-shop">
        <AppMap />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BreadCrumbs from "../components/BreadCrumbs.vue";
import AppMap from "../components/AppMap.vue";
</script>