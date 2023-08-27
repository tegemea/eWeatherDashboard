<script setup>

const { locations } = defineProps(['locations'])

</script>

<template>
    <div v-if="locations.length">
        <h5 class="font-thin">
            <Icon icon="mingcute:search-fill" class="me-2" />
            Most Recent Searches
        </h5>
        <hr />
        <ul class="list-group list-group-flush">
            <li v-for="location in locations.slice(0, 5)" class="list-group-item">
                <Icon icon="prime:angle-right" class="me-2" />
                {{ location.name }}
            </li>
            <RouterLink to="/history" class="list-group-item">... <small class="ms-3 color-primary">see all</small>
            </RouterLink>
        </ul>
    </div>
</template>