<template>
  <v-app>
    <AppBar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import AppBar from '@/components/AppBar.vue'
</script>

<style>
/* Import the Bangers font from Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Bangers&display=swap');

/* Apply the Bangers font globally */
body {
  font-family: 'Bangers', cursive;
}
</style>