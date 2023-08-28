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
      <div class="col-sm-6 col-md-4 col-xl-3 bg-light sidebar-container">
        <SidebarLayout class="sidebar" />
      </div>
      <div class="col-sm-6 col-md-8 col-xl-9 py-3 content">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@media screen and (min-width: 768px) {
  .sidebar-container {
    // height: 100vh;
    // background: red;
  }

  .sidebar {
    position: sticky;
    position: -webkit-sticky;
    top: 0;
  }
}

.content {
  position: relative;
  max-height: 100vh;
}

.border-radius-0 {
  border-radius: 0;
}
</style>
