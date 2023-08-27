<script setup>
import SiteTitle from './SiteTitle.vue'
import LinksToPages from './Links.vue'
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
                <div class="card-body">
                    current location & weather info
                </div>
            </div>
            <div class="card mb-3">
                <div class="card-body p-0">
                    <LinksToPages />
                </div>
            </div>
        </div>
    </div>
</template>