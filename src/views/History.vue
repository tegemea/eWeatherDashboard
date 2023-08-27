<script setup>
import SearchByName from '../components/SearchByName.vue';
import { useLocationStore } from '../stores/locations';
import { storeToRefs } from 'pinia'

const locationStore = useLocationStore()
const { loading, locationsHistory: locations } = storeToRefs(locationStore)
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
                            <th>Data 1</th>
                            <th>Data 2</th>
                            <th>Data 3</th>
                            <th>Data 4</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(location, i) in locations" :key="i">
                            <td>{{ location.name }}</td>
                            <td>Data 1</td>
                            <td>Data 2</td>
                            <td>Data 3</td>
                            <td>Data 4</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="card-footer">
            <small class="text-danger">Data not persistent, will vanish upon browser refresh</small>
        </div>
    </div>
</template>