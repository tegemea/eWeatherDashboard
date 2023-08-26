<script setup>
import { RouterView } from 'vue-router'
import SidebarLayout from './components/sidebar/Layout.vue'
</script>

<template>
  <div class="container-fluid vh-100">
    <div class="row vh-100">
      <div class="col-3 bg-light" style="height: 100%;">
        <SidebarLayout />
      </div>
      <div class="col-9">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
