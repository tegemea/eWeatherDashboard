<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => console.log(coords),
      error => console.log(error),
      { maximumAge: 300000, timeout: 10000, enableHighAccuracy: false }
    )
  }
})
</script>

<template>
  home
</template>
