<script setup>
import SearchByName from '../components/SearchByName.vue';
import { useLocationStore } from '../stores/locations';
import { storeToRefs } from 'pinia'

const locationStore = useLocationStore()
const { locationsHistory: locations } = storeToRefs(locationStore)

function removeLocationinHistory(i) {
    if (confirm('Aare you sure you want to remove this record?')) {
        locations.value.splice(i, 1)
    }
}
</script>

<template>
    <SearchByName />
    <div v-if="locations.length" class="card">
        <h4 class="card-header">Search History</h4>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table">
                    <thead>
                        <tr class="text-uppercase font-thin">
                            <th>Location</th>
                            <th>Weather</th>
                            <th>HIGH</th>
                            <th>LOW</th>
                            <th class="text-danger text-center">
                                <Icon icon="mdi:trash" />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(location, i) in locations" :key="i">
                            <td>{{ location.name }}, {{ location.data?.city?.country }}</td>
                            <td>
                                <img :src="`https://openweathermap.org/img/wn/${location.current?.weather[0]?.icon}.png`" />
                                {{ location.current?.weather[0]?.main }}
                            </td>
                            <td>{{ location.current?.main?.temp_max }}</td>
                            <td>{{ location.current?.main?.temp_min }}</td>
                            <td class="text-center">
                                <button @click="removeLocationinHistory(i)" class="btn text-danger">
                                    <Icon icon="bi:trash" />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="card-footer">
            <small class="text-danger">Data not persistent, will vanish upon browser refresh</small>
        </div>
    </div>
    <h5 v-else class="text-danger">Sorry, no search history!</h5>
</template>