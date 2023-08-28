<script setup>
import { useLocationStore } from '../stores/locations';
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const router = useRouter()

const locationStore = useLocationStore()
const { loading, locationsHistory, cityNameToSearch, cityChoicesOnSearch } = storeToRefs(locationStore)
const { getCityWeatherData, getCityChoicesByName, getOnlyMorningData } = locationStore

async function handleSearchButton() {
    router.push('/locations')
    const { data: cityChoices } = await getCityChoicesByName(cityNameToSearch)
    cityChoicesOnSearch.value = cityChoices
    loading.value = false
}

async function handleCityChoice(lat, lon) {
    const { cityForecast, cityCurrentWeather } = await getCityWeatherData(lat, lon)
    const morningForecastData = await getOnlyMorningData(cityForecast)
    cityChoicesOnSearch.value = []
    loading.value = false
    if (!locationsHistory.value.some(l => l.name === cityNameToSearch.value)) {
        locationsHistory.value.unshift({
            name: cityNameToSearch.value,
            data: morningForecastData,
            current: cityCurrentWeather
        })
        cityNameToSearch.value = ''
    }
}

</script>

<template>
    <div class="card mb-4 border-0 main">
        <div class="card-body p-0">
            <div class="row">
                <div class="col-md-9 mb-2">
                    <input type="search" @keyup.enter="handleSearchButton" v-model="cityNameToSearch"
                        class="form-control form-control-lg" placeholder="Type city name and Enter to search" />
                </div>
                <div class="col-md-3 mb-2">
                    <button @click.prevent="handleSearchButton" class="btn btn-lg btn-outline-info w-100">
                        <Icon icon="iconamoon:search-fill" />
                        Search
                    </button>
                </div>
            </div>
        </div>
        <div v-if="loading" class="overlay">
            <Icon icon="svg-spinners:ring-resize" :style="{ color: '#0D9DE3' }" :height="100" />
            <span class="mt-5">Please wait, loading...</span>
        </div>
        <div v-else-if="cityChoicesOnSearch.length" class="card-body">
            <h5 v-if="cityChoicesOnSearch.length > 1">Which {{ cityNameToSearch }} do you mean? Choose among below</h5>
            <h5 v-else>Confirm the choice below</h5>
            <button @click.prevent="handleCityChoice(cityChoice.lat, cityChoice.lon)"
                v-for="(cityChoice, i) in cityChoicesOnSearch" class="btn btn-lg btn-outline-secondary me-3 my-2" :key="i">
                {{ cityChoice.name }}
                <span v-if="cityChoice.state" class="ms-1">
                    - {{ cityChoice.state }}
                </span>,
                {{ cityChoice.country }}
            </button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.main {
    position: relative;

    .overlay {
        position: absolute;
        height: 100vh;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: rgba(#fff, .3);
        backdrop-filter: blur(10px);
        z-index: 10;
    }
}
</style>