<template>
  <div v-if="totalPages > 1" class="pagination">
    <button
      @click="changePage(page - 1)"
      :disabled="page === 1"
      class="pagination-btn"
    >
      <img
        src="/images/main/smallArrow-left.svg"
        alt="PaginationArrow"
        class="pagination-btn__img"
      />
    </button>

    <button
      v-for="pageNumber in totalPages"
      :key="pageNumber"
      @click="changePage(pageNumber)"
      :disabled="pageNumber === page"
      :class="{ active: pageNumber === page }"
      class="pagination-btn__number"
    >
      {{ pageNumber }}
    </button>

    <button
      @click="changePage(page + 1)"
      :disabled="page === totalPages"
      class="pagination-btn"
    >
      <img
        src="/images/main/smallArrow-right.svg"
        alt="PaginationArrow"
        class="pagination-btn__img"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const props = defineProps<{
  totalPages: number;
  page: number;
}>();

const emit = defineEmits(["update:page"]);

const changePage = (newPage: number) => {
  if (newPage >= 1 && newPage <= props.totalPages) {
    emit("update:page", newPage);
  }
};
</script>