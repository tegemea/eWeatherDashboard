<script setup>
import SearchByName from '../components/SearchByName.vue';
import { useLocationStore } from '../stores/locations';
import { storeToRefs } from 'pinia'

const locationStore = useLocationStore()
const { loading, locationsHistory } = storeToRefs(locationStore)
</script>

<template>
  <div class="row">
    <div class="col-12">
      <SearchByName />
      {{ locationsHistory.at(locationsHistory.length - 1) }}
      {{ console.log(locationsHistory?.at(locationsHistory?.length - 1)) }}
    </div>
  </div>
</template>
