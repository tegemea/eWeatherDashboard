<script setup>
import SearchByName from '../components/SearchByName.vue'
import { useLocationStore } from '../stores/locations.js'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const locationStore = useLocationStore()
const { locationsHistory, myCityData, cityWeatherData, coordinates, loading } = storeToRefs(locationStore)
const { getLocation } = locationStore

onMounted(() => getLocation())

</script>

<template>
  <div v-if="loading" class="overlay">
    <Icon icon="svg-spinners:ring-resize" :style="{ color: '#0D9DE3' }" :height="100" />
    <span class="mt-5">Please wait, loading...</span>
  </div>
  <div v-else>
    <SearchByName />
    <div class="card">
      <div class="card-body">
        <h3 class="color-primary">Welcome, you are now in <span class="font-thin">{{ myCityData.name }}, {{
          myCityData.country }}</span></h3>
        <hr />
        <div class="row">
          <div class="col-md-6 text-black-50">
            <h4>Temperature : {{ cityWeatherData?.current?.temp }}</h4>
            <h4>Humidity : {{ cityWeatherData?.current?.humidity }}</h4>
            <h4>Wind Speed : {{ cityWeatherData?.current?.wind_speed }}</h4>
          </div>
          <div class="col-md-6 text-center">
            <img :src="`https://openweathermap.org/img/wn/${cityWeatherData?.current?.weather[0]?.icon}@2x.png`" alt="" />
            <span>{{ cityWeatherData?.current?.weather[0]?.main }}</span>
          </div>
        </div>
      </div>
      <div class="card-footer d-flex justify-content-between">
        <span class="text-black-50">{{ cityWeatherData?.current?.weather[0]?.description }}</span>
      </div>
    </div>
  </div>
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
