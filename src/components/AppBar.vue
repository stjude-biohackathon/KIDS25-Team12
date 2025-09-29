<template>
  <v-app-bar
      color="grey-darken-4"
      :absolute="true"
      :flat="true"
  >
    <template v-slot:image v-if="theme.global.name.value === 'light'">
      <v-img
          gradient="to bottom right, #8d0034, #d11947"
      />
    </template>

    <button
        class="ml-8"
        @click="navigateHome"
        :disabled="['login', 'home'].includes(String(route.name))"
    >
      <v-row>
      <img src="@/assets/SJ-Icon-White.svg" :width="70" alt="St. Jude Logo" />
      <v-app-bar-title class="mt-2 ml-2">
        <span><strong>Treatment Titans</strong></span>
      </v-app-bar-title>
      </v-row>
    </button>
    <v-spacer/>

    <v-chip class="theme-button mr-9" @click="changeTheme" color="red-darken-5">
      <v-icon class="mr-1" :color="theme.global.name.value === 'light' ? 'white' : 'black'" icon="$whiteBalanceSunny"
              size="18"/>
      <v-icon class="ml-1" :color="theme.global.name.value === 'dark' ? 'white' : 'black'" icon="$weatherNight"
              size="18"/>
    </v-chip>
  </v-app-bar>
</template>

<script setup lang="ts">
import {onBeforeMount} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {useTheme} from 'vuetify'

const route = useRoute()
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
  router.push({name: 'home'})
}

onBeforeMount(() => {
  // store.setUserOnRefresh()
  if (localStorage.getItem('theme')){
    theme.global.name.value = localStorage.getItem('theme') as string
  } else {
    theme.global.name.value = 'light'
    localStorage.setItem('theme', 'light')
  }
})
</script>