<template>
    <div class="list-group list-group-flush">
        <RouterLink to="/" class="list-group-item">
            <Icon icon="tabler:home" class="me-2" />
            Your current Location
        </RouterLink>
        <RouterLink to="locations" class="list-group-item">
            <Icon icon="ion:location" class="me-2" />
            Check other Locations
        </RouterLink>
        <RouterLink to="history" class="list-group-item">
            <Icon icon="solar:history-bold-duotone" class="me-2" />
            View Search History
        </RouterLink>
    </div>
</template>