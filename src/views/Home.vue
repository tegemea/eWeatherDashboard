<script setup>
import { useLocationStore } from '../stores/locations.js'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const locationStore = useLocationStore()
const { locationsHistory, coordinates, loading } = storeToRefs(locationStore)
const { getMyLocation } = locationStore

onMounted(() => getMyLocation())

</script>

<template>
  <div v-if="loading" class="overlay">
    <Icon icon="svg-spinners:12-dots-scale-rotate" :style="{ color: '#0D9DE3' }" :height="100" />
    <span class="mt-5">Please wait, loading...</span>
  </div>
  <div v-else>Location : {{ coordinates }}</div>
</template>

<style lang="scss" scoped>
.overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(#fff, .3);
  backdrop-filter: blur(5px);
}
</style>
