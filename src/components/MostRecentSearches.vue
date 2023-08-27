<script setup>

const { locations } = defineProps(['locations'])

</script>

<template>
    <div v-if="locations.length">
        <h5 class="font-thin">Most Recent Searches</h5>
        <hr />
        <ul class="list-group list-group-flush">
            <li v-for="location in locations" class="list-group-item">{{ location.name }}</li>
        </ul>
    </div>
</template>