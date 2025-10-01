<template>
  <div>
    <div style="z-index: 2001;">
      <img @click="navigateHome" class="project-logo"
        src="@/assets/ProjectLogo.png"></img>
    </div>
    <v-app-bar :absolute="true" :flat="true" class="halftone-appbar" style="height: 120px">
      <template v-slot:image>
        <v-img src="@/assets/halftone-2.png" class="halftone-background" cover />
      </template>
    </v-app-bar>
    <div class="speech-bubble-container">
      <img v-if="theme.global.name.value === 'light'" src="@/assets/12in_ComicSpeech_1.png" class="speech-bubble-bg" />
      <img v-if="theme.global.name.value === 'dark'" src="@/assets/dark/12in_ComicSpeech_1.png"
        class="speech-bubble-bg" />
      <v-chip class="theme-button-overlay" @click="changeTheme" color="grey-darken-2" variant="text">
        <v-icon class="mr-1" :color="theme.global.name.value === 'light' ? 'grey' : 'black'" icon="$whiteBalanceSunny"
          size="18" />
        <v-icon class="ml-1" :color="theme.global.name.value === 'dark' ? 'white' : 'gray-lighten-2'"
          icon="$weatherNight" size="18" />
      </v-chip>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useTheme } from 'vuetify'

const router = useRouter()
const theme = useTheme()

const changeTheme = () => {
  if (theme.global.name.value === 'light') {
    theme.global.name.value = 'dark';
    localStorage.setItem('theme', theme.global.name.value)
  } else {
    theme.global.name.value = 'light'
    localStorage.setItem('theme', theme.global.name.value)
  }
}

const navigateHome = () => {
  router.push({ name: 'home' })
}

onBeforeMount(() => {
  // store.setUserOnRefresh()
  if (localStorage.getItem('theme')) {
    theme.global.name.value = localStorage.getItem('theme') as string
  } else {
    theme.global.name.value = 'light'
    localStorage.setItem('theme', 'light')
  }
})
</script>
<style scoped>
.halftone-appbar {
  background: transparent !important;
}

.halftone-background {
  width: 100% !important;
  height: 100% !important;
}

/* Ensure content is above the background */
.halftone-appbar .v-toolbar__content {
  position: relative;
  z-index: 1;
}

.project-logo {
  margin-left: 10px;
  max-height: 190px;
  height: 190px !important;
  /* Make it large */
  width: auto !important;
  /* Maintain aspect ratio */
  cursor: pointer;
  position: absolute;
  top: -10px;
  /* Adjust position as needed */
  z-index: 2001;
}

.dark-project-logo {
    margin-left: 10px;
    max-height: 150px;
    height: 150px !important;
    width: auto !important;
    /* Maintain aspect ratio */
    cursor: pointer;
    position: absolute;
    top: -10px;
    /* Adjust position as needed */
    z-index: 2001;
}

.speech-bubble-container {
  position: absolute !important;
  /* Break free from container flow */
  top: -20px;
  /* Position it to extend above the app bar */
  right: 20px;
  /* Position from the right edge */
  z-index: 2002;
  /* Ensure it's above everything */
}

.speech-bubble-bg {
  height: 160px;
  /* Make it larger to extend beyond boundaries */
  width: auto;
}

.theme-button-overlay {
  position: absolute !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
  z-index: 2 !important;
}
</style>
