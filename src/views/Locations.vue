<script setup>
import SearchByName from '../components/SearchByName.vue';
import { useLocationStore } from '../stores/locations';
import { storeToRefs } from 'pinia'
import dayjs from 'dayjs'

const locationStore = useLocationStore()
const { loading, locationsHistory: locations } = storeToRefs(locationStore)
</script>

<template>
  <div class="row">
    <div class="col-12">
      <SearchByName />
      <div>{{ console.log(locations[0] ?? 'N/A') }}</div>

      <div v-if="locations.length" class="card mb-4">
        <div class="card-body">
          <h3 class="color-primary d-flex justify-content-between">
            <span>Last City Search</span>
            <span class="font-thin">
              Weather for
              {{ locations[0]?.name }} ({{ locations[0]?.data?.city?.name }}), {{ locations[0]?.data?.city?.country }}
            </span>
          </h3>
          <hr />
          <div class="row">
            <div class="col-md-6 text-black-50">
              <h4>Temperature : {{ locations[0]?.current?.main?.temp }}</h4>
              <h4>Humidity : {{ locations[0]?.current?.main?.humidity }}</h4>
              <h4>Wind Speed : {{ locations[0]?.current?.wind?.speed }}</h4>
            </div>
            <div class="col-md-6 text-center">
              <img :src="`https://openweathermap.org/img/wn/${locations[0]?.current?.weather[0]?.icon}@2x.png`" alt="" />
              <span>{{ locations[0]?.current?.weather[0]?.main }}</span>
            </div>
          </div>
        </div>
        <div class="card-footer d-flex justify-content-between">
          <span class="text-black-50">{{ locations[0]?.current?.weather[0]?.description }}</span>
        </div>
      </div>
      <div v-if="locations.length" class="card">
        <h5 class="card-header d-flex justify-content-between">
          <span>Last City Forecast</span>
          <strong>{{ locations[0]?.name }} ({{ locations[0]?.data?.city?.name }}) 5 Days Forecast
            <Icon icon="line-md:moon-filled-to-sunny-filled-loop-transition" />
          </strong>
        </h5>
        <div class="card-body">
          <table class="table">
            <thead>
              <tr class="text-uppercase font-thin">
                <th>Date, Day & Time of the Day</th>
                <th class="text-center">Weather</th>
                <th>Low</th>
                <th>High</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="forecast in locations[0]?.data?.forecasts">
                <td>{{ dayjs(forecast.dt_txt).format('DD MMM YYYY, ddd - HH:mm A') }}</td>
                <td class="text-center">
                  <img :src="`http://openweathermap.org/img/wn/${forecast.weather[0]?.icon}.png`" alt="" />
                  {{ forecast.weather[0]?.main }}
                </td>
                <td>{{ forecast.main?.temp_min }}</td>
                <td>{{ forecast.main?.temp_max }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="card-footer text-danger">
          Data not persistent, will vanish upon browser refresh
        </div>
      </div>
      <h5 v-else class="text-danger">Sorry, not last search!</h5>
    </div>
  </div>
</template>
