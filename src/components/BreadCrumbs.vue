<template>
  <div id="breadcrumb">
    <ul class="breadcrumbs-list">
      <li
        v-for="(breadcrumb, index) in breadcrumbList"
        :key="index"
        class="breadcrumbs-item"
      >
        <span
          @click="navigate(index)"
          :class="{
            'black-text':
              index === 0 || (index === 1 && breadcrumbList.length > 2), // Главная и Каталог — черный цвет
            'gray-text':
              (index === 1 && breadcrumbList.length <= 2) || index > 1,
            linked: !!breadcrumb.link,
          }"
        >
          {{ breadcrumb.name }}
        </span>

        <span
          v-if="index < breadcrumbList.length - 1"
          class="breadcrumbs-separator"
        >
          <img src="/images/main/breadcrumv-arrow.svg" alt="arrow" />
        </span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

interface Breadcrumb {
  name: string;
  link?: string;
}

const route = useRoute();
const router = useRouter();

const breadcrumbList = computed<Breadcrumb[]>(
  () => (route.meta.breadcrumb as Breadcrumb[]) || []
);

const navigate = (index: number) => {
  const breadcrumb = breadcrumbList.value[index];
  if (breadcrumb.link) {
    router.push(breadcrumb.link);
  }
};
</script>