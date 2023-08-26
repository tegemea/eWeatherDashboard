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
  <div v-if="loading">Loading...</div>
  <div v-else>Location : {{ coordinates }}</div>
</template>
