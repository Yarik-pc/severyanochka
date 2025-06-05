<template>
  <div class="container">
    <div class="breadcrumbs">
      <BreadCrumbs />
    </div>
    <div class="aboutus">
      <div class="aboutus-info">
        <img
          src="/images/main/aboutUs/aboutus-background.svg"
          alt="backgound"
          class="aboutus-info__backgound"
        />
        <h2 class="aboutus-info__title large-title">О компании</h2>
        <p class="aboutus-info__text">
          Мы непрерывно развиваемся и работаем над совершенствованием сервиса,
          заботимся о наших клиентах, стремимся к лучшему будущему.
        </p>
      </div>
      <div class="aboutus-mission">
        <div class="aboutus-mission__block mission__block">
          <img
            src="/images/main/aboutUs/mark.svg"
            alt="check mark"
            class="mission__block-img"
          />
          <div class="mission__block-values">
            <p class="mission__block-values__text">
              Мы занимаемся розничной торговлей
            </p>
            <h3 class="mission__block-values__strongtext">Более 20 лет.</h3>
          </div>
        </div>
        <div class="aboutus-mission__block mission__block">
          <img
            src="/images/main/aboutUs/mark.svg"
            alt="check mark"
            class="mission__block-img"
          />
          <div class="mission__block-values">
            <p class="mission__block-values__text">Основная миссия компании</p>
            <h3 class="mission__block-values__strongtext">
              Максимальное качество товаров и услуг по доступной цене.
            </h3>
          </div>
        </div>
        <div class="aboutus-mission__block mission__block">
          <img
            src="/images/main/aboutUs/mark.svg"
            alt="check mark"
            class="mission__block-img"
          />
          <div class="mission__block-values">
            <p class="mission__block-values__text">
              Отличительная черта нашей сети
            </p>
            <h3 class="mission__block-values__strongtext">
              Здоровая и полезная продукция местного производства внаших
              магазинах.
            </h3>
          </div>
        </div>
      </div>
      <div class="aboutus-message">
        <img
          src="/images/main/aboutUs/logo.svg"
          alt="message"
          class="aboutus-message__logo"
        />
        <img
          src="/images/main/aboutUs/message-img.svg"
          alt="message"
          class="aboutus-message__img"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BreadCrumbs from "../components/BreadCrumbs.vue";
</script>