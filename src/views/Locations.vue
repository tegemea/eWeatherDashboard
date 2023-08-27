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
      {{ console.log(locationsHistory.at(locationsHistory?.length - 1)) }}
      <div v-if="locationsHistory.length">
        <h4>Recent Searches</h4>
        <hr />
        <ul class="list-unstyled">
          <li v-for="(location, i) in locationsHistory" :key="i">{{ i + 1 }}. {{ location.name }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
