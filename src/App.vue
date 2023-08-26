<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-3">
        side navigation
      </div>
      <div class="col-9">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
