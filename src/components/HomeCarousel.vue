<template>
  <Carousel v-bind="carouselConfig" class="carousel">
    <Slide v-for="slide in images" :key="slide.id">
      <div class="carousel-item">
        <img :src="slide.image" alt="Slider" class="carousel-item__img" />
      </div>
    </Slide>
  </Carousel>
</template>

<script setup lang="ts">
import { computed } from "vue";
import "vue3-carousel/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import CarouselImages from "../constants/CarouselImages";

const carouselConfig = {
  itemsToShow: 1,
  wrapAround: true,
  autoplay: 3000,
};

const images = computed(() => CarouselImages);
</script>