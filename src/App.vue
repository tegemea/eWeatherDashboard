<script setup>
import { RouterView } from 'vue-router'
import SidebarLayout from './components/sidebar/Layout.vue'
import { useLocationStore } from './stores/locations';
import { storeToRefs } from 'pinia'

const locationStore = useLocationStore()
// const { loading } = storeToRefs(locationStore)

</script>

<template>
  <div class="container-fluid min-vh-100">
    <div class="row min-vh-100">
      <div class="col-md-5 col-xl-3 bg-light sidebar-container">
        <SidebarLayout class="sidebar" />
      </div>
      <div class="col-md-7 col-xl-9 py-3 content">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@media screen and (min-width: 768px) {

  .sidebar {
    position: sticky;
    position: -webkit-sticky;
    top: 0;
  }

  .content {
    position: relative;
  }
}

.border-radius-0 {
  border-radius: 0;
}
</style>
