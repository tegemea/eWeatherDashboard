<script setup>
import SiteTitle from './SiteTitle.vue'
import LinksToPages from './Links.vue'
import UnitSelections from '../UnitSelections.vue'
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
                <strong class="card-header">
                    <Icon icon="fluent:temperature-16-regular" class="me-2" />
                    Change Temperate Units
                </strong>
                <div class="card-body p-0">
                    <UnitSelections />
                </div>
                <div class="card-footer text-danger small">
                    <Icon icon="streamline:interface-alert-warning-circle-warning-alert-frame-exclamation-caution-circle"
                        class="me-2" />
                    Values not being re-calculated
                </div>
            </div>
            <div class="card mb-3 border-radius-0">
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