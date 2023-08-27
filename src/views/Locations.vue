<script setup>
import SearchByName from '../components/SearchByName.vue';
import { useLocationStore } from '../stores/locations';
import { storeToRefs } from 'pinia'

const locationStore = useLocationStore()
const { loading } = storeToRefs(locationStore)
</script>

<template>
  <SearchByName />
</template>

<style></style>
