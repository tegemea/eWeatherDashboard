<script setup>
import SiteTitle from './SiteTitle.vue'
import LinksToPages from './Links.vue'
import MostRecentSearches from '../MostRecentSearches.vue';
import { useLocationStore } from '../../stores/locations';
import { storeToRefs } from 'pinia'

const locationStore = useLocationStore()
const { locationsHistory } = storeToRefs(locationStore)
</script>

<template>
    <div class="row">
        <div class="col-12 py-3">
            <div class="card mb-3">
                <div class="card-body">
                    <SiteTitle />
                </div>
            </div>
            <div class="card mb-3">
                <div class="card-body p-0">
                    <LinksToPages />
                </div>
            </div>
            <div v-if="locationsHistory.length" class="card mb-3">
                <div class="card-body">
                    <MostRecentSearches :locations="locationsHistory" />
                </div>
            </div>
        </div>
    </div>
</template>