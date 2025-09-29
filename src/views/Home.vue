<template>
  <img :src="backgroundImage" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 1;">
  
  <v-container style="position: relative; z-index: 2;">
    <v-row>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useTheme } from 'vuetify'
import { SnackBarData } from '@/services/error.service.ts'
import Snackbar from "@/components/Snackbar.vue"

// Import images
import lightBookcase from '@/assets/HomePageBookcase-Light.png'
import darkBookcase from '@/assets/HomePageBookcase-Dark.png'

const theme = useTheme()
const snackData = ref<SnackBarData>({on: false, color: '', text: ''})

// Computed property for background image
const backgroundImage = computed(() => {
  return theme.global.name.value === 'light' ? lightBookcase : darkBookcase
})
</script>