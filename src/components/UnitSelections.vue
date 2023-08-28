<script setup>
import { useLocationStore } from '../stores/locations';
import { storeToRefs } from 'pinia'

const locationStore = useLocationStore()
const { tempUnits } = storeToRefs(locationStore)
</script>

<template>
    <div class="row">
        <div class="col-12">
            <select v-model="tempUnits" class="form-control border-0">
                <option value="ºC" selected>Celsius ( ºC ) - Default on requests</option>
                <option value="ºF">Fahrenheit ( ºF )</option>
                <option value="K">Kelvin ( K )</option>
            </select>
        </div>
    </div>
</template>