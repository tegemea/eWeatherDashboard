<script setup>
import SearchByName from '../components/SearchByName.vue'
import { useLocationStore } from '../stores/locations.js'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const locationStore = useLocationStore()
const { myCityData, cityWeatherData, loading, tempUnits, humidUnits, windSpeedUnits } = storeToRefs(locationStore)
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
    <div v-if="cityWeatherData" class="card">
      <div class="card-body">
        <h3 class="color-primary">Welcome, you are now in <span class="font-thin">{{ myCityData.name }}, {{
          myCityData.country }}</span></h3>
        <hr />
        <div class="row">
          <div class="col-lg-8 col-xl-5 text-black-50">
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                <h4 class="d-flex justify-content-between">
                  <span>
                    <Icon icon="fluent:temperature-16-regular" class="me-2" />
                    Temperature
                  </span>
                  <span>{{ cityWeatherData?.current?.temp.toFixed('2') }} {{ tempUnits }}</span>
                </h4>
              </li>
              <li class="list-group-item">
                <h4 class="d-flex justify-content-between">
                  <span>
                    <Icon icon="carbon:humidity" class="me-2" />
                    Humidity
                  </span>
                  <span>{{ cityWeatherData?.current?.humidity }} {{ humidUnits }}</span>
                </h4>
              </li>
              <li class="list-group-item">
                <h4 class="d-flex justify-content-between">
                  <span>
                    <Icon icon="solar:wind-linear" class="me-2" />
                    Wind Speed
                  </span>
                  <span>{{ cityWeatherData?.current?.wind_speed }} {{ windSpeedUnits }}</span>
                </h4>
              </li>
            </ul>
          </div>
          <div class="col-lg-4 col-xl-4 text-end">
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
