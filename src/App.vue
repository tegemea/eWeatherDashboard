<script setup>
import { RouterView } from 'vue-router'
import SidebarLayout from './components/sidebar/Layout.vue'
import { useLocationStore } from './stores/locations';
import { storeToRefs } from 'pinia'

const locationStore = useLocationStore()
// const { loading } = storeToRefs(locationStore)

</script>

<template>
  <div class="container-fluid vh-100">
    <div class="row vh-100">
      <div class="col-sm-6 col-md-4 col-xl-3 bg-light sidebar">
        <SidebarLayout />
      </div>
      <div class="col-sm-6 col-md-8 col-xl-9 py-3 content">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@media screen and (min-width: 768px) {
  .sidebar {
    height: 100vh;
  }
}

.content {
  position: relative;
}

.card {
  border-radius: 0;
}
</style>
