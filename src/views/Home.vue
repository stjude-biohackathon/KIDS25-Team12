<template>
  <img :src="backgroundImage" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 1;">
  
  <v-container style="position: relative; z-index: 2;">
    <v-row class="ml-16 mt-16">
      <v-btn @click="openReader">Open Reader</v-btn>
    </v-row>
  </v-container>
  <Reader v-model:dialog="dialog"></Reader>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useTheme } from 'vuetify'
import { SnackBarData } from '@/services/error.service.ts'
import Reader from './Reader.vue'


const dialog = ref(false)
const openReader = () => {
  dialog.value = true
}

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