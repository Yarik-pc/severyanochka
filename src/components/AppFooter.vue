<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-wrapper">
        <div class="footer-nav">
          <RouterLink to="/">
            <div class="footer-nav__logo-wrapper">
              <img
                src="/images/logo-2.svg"
                alt="Logo"
                class="footer-nav__logo"
              />
            </div>
          </RouterLink>
          <ul class="footer-nav__list">
            <li
              v-for="item in footerNavigate"
              :key="item.id"
              @click="goToCategory(item.link)"
              class="footer-nav__item"
            >
              {{ item.title }}
            </li>
          </ul>
        </div>
        <div class="footer-contact">
          <div class="footer-contact__socialmedia">
            <ul class="footer-contact__socialmedia-list">
              <li class="footer-contact__socialmedia-item">
                <img src="/images/footer/socialmedia-1.svg" alt="Instagram" />
              </li>
              <li class="footer-contact__socialmedia-item">
                <img src="/images/footer/socialmedia-2.svg" alt="Wk" />
              </li>
              <li class="footer-contact__socialmedia-item">
                <img src="/images/footer/socialmedia-3.svg" alt="Facebook" />
              </li>
              <li class="footer-contact__socialmedia-item">
                <img src="/images/footer/socialmedia-4.svg" alt="Ok" />
              </li>
            </ul>
          </div>
          <div class="footer-contact__phonenumber">
            <img
              class="footer-contact__phonenumber-img"
              src="/images/footer/telephone.svg"
              alt="Telephone"
            />
            <a
              href="tel:8 800 777 33 33"
              class="footer-contact__phonenumber-telephone"
              >8 800 777 33 33</a
            >
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import footerNav from "../constants/FooterNav";
import Footer from "../types/Footer";

const footerNavigate = computed<Footer[]>(() => footerNav);

const router = useRouter();

const goToCategory = (categoryTitle: string) => {
  router.push({ path: categoryTitle });
};
</script>