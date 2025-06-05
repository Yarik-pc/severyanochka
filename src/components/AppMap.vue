<template>
  <div class="container">
    <h2 class="map-title title">Наши магазины</h2>

    <div class="map-buttons">
      <button
        v-for="location in locations"
        :key="location.name"
        @click="changeLocation(location)"
        :class="{ mapButtonActive: activeButton === location.name }"
        class="map-button"
      >
        {{ location.name }}
      </button>
    </div>
    <div class="map-container">
      <iframe
        class="map-container__iframe"
        :src="currentMapSrc"
        style="border: 0"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from "vue";
import MapLocation from "../constants/MapLocation";
import Location from "../types/Location";

const locations = computed<Location[]>(() => MapLocation);

const activeButton = ref(locations.value[0].position);

const currentMapSrc = ref(locations.value[0].position);

const changeLocation = (location: { name: string; position: string }) => {
  currentMapSrc.value = location.position;
  activeButton.value = location.name;
};

onMounted(() => {
  activeButton.value = locations.value[0].name;
});
</script>