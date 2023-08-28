<script setup>
import SearchByName from '../components/SearchByName.vue';
import { useLocationStore } from '../stores/locations';
import { storeToRefs } from 'pinia'
import dayjs from 'dayjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, Colors } from 'chart.js'
import { Bar } from 'vue-chartjs'
import { watch } from 'vue'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, Colors)

const locationStore = useLocationStore()
const { locationsHistory: locations, tempUnits, humidUnits, windSpeedUnits } = storeToRefs(locationStore)

let chartData = {};
watch(
  locations.value,
  v => {
    if (v.length) {
      chartData = {
        labels: [...v[0]?.data?.forecasts?.map(f => dayjs(f.dt_txt).format('ddd, DD MMM'))],
        datasets: [{ data: [...v[0]?.data?.forecasts?.map(f => f.main?.temp_max)], label: 'Day Forecast' }]
      }
    } else {
      chartData = {
        labels: [],
        datasets: []
      }
    }
  }
)

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      labels: {
        color: '#333'
      }
    }
  }
}

</script>

<template>
  <div class="row">
    <div class="col-12">
      <SearchByName />

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
            <div class="col-md-4 text-black-50">
              <ul class="list-group list-group-flush">
                <li class="list-group-item">
                  <h4 class="d-flex justify-content-between">
                    <span>
                      <Icon icon="fluent:temperature-16-regular" class="me-2" />
                      Temperature
                    </span>
                    <span>{{ locations[0]?.current?.main?.temp.toFixed('2') }} {{ tempUnits }}</span>
                  </h4>
                </li>
                <li class="list-group-item">
                  <h4 class="d-flex justify-content-between">
                    <span>
                      <Icon icon="carbon:humidity" class="me-2" />
                      Humidity
                    </span>
                    <span>{{ locations[0]?.current?.main?.humidity }} {{ humidUnits }}</span>
                  </h4>
                </li>
                <li class="list-group-item">
                  <h4 class="d-flex justify-content-between">
                    <span>
                      <Icon icon="solar:wind-linear" class="me-2" />
                      Wind Speed
                    </span>
                    <span>{{ locations[0]?.current?.wind?.speed }} {{ windSpeedUnits }}</span>
                  </h4>
                </li>
              </ul>
            </div>
            <div class="col-md-4 text-end">
              <img :src="`https://openweathermap.org/img/wn/${locations[0]?.current?.weather[0]?.icon}@2x.png`" alt="" />
              <span>{{ locations[0]?.current?.weather[0]?.main }}</span>
            </div>
          </div>
        </div>
        <div class="card-footer d-flex justify-content-between">
          <span class="text-black-50">{{ locations[0]?.current?.weather[0]?.description }}</span>
        </div>
      </div>
      <div v-if="locations.length" class="card mb-4">
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
                <td>{{ forecast.main?.temp_min.toFixed('2') }} {{ tempUnits }}</td>
                <td>{{ forecast.main?.temp_max.toFixed('2') }} {{ tempUnits }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="card-footer text-danger">
          Data not persistent, will vanish upon browser refresh
        </div>
      </div>
      <h5 v-else class="text-danger mb-4">Sorry, not last search!</h5>
      <div v-if="chartData?.labels?.length" class="card mb-4">
        <h5 class="card-header">Graph representation of next 5 days temperature variations in {{ locations[0].name }}</h5>
        <div class="card-body">
          <Bar :data="chartData" :options="chartOptions" />
        </div>
      </div>
    </div>
  </div>
</template>
