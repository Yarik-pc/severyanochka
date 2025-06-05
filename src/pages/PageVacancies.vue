<template>
  <div class="container">
    <div class="breadcrumbs">
      <BreadCrumbs />
    </div>
    <div class="vacancies">
      <h2 class="vacancies-title large-title">Вакансии</h2>
      <div class="vacancies-wrapper">
          <JobCard v-for="(item, index) in jobs" :key="index" :item="item" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import BreadCrumbs from "../components/BreadCrumbs.vue";
import JobCard from "../components/JobCard.vue";
import JobCards from "../constants/JobCards";

const jobs = computed(() => JobCards);
</script>
