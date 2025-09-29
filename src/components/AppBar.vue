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
        <span><strong>BBQ Boilerplate</strong></span>
      </v-app-bar-title>
      </v-row>
    </button>
    <v-spacer/>
    <span v-if="loggedIn && (!eed)" class="mr-4 unselectable whiten large-text">Welcome, {{ loggedInUser }}</span>
    <div class="whiten" v-if="eed">
      {{ eedTextOne }}
      <v-icon color="red" icon="$heart" size="small" v-if="eeIcon"/>
      {{ eedTextTwo }}
    </div>

    <v-chip :class="'theme-button' + (loggedIn ? ' ml-4 mr-1' :' ml-4 mr-9')" @click="changeTheme" v-if="!eed" color="red-darken-5">
      <v-icon class="mr-1" :color="theme.global.name.value === 'light' ? 'white' : 'black'" icon="$whiteBalanceSunny"
              size="18"/>
      <v-icon class="ml-1" :color="theme.global.name.value === 'dark' ? 'white' : 'black'" icon="$weatherNight"
              size="18"/>
    </v-chip>
    <v-btn
        class="mx-4"
        density="compact"
        icon="true"
        v-if="loggedIn && currentRoute"
        @click="helpDialog = true"
        @contextmenu="ee($event)"
    >
      <v-icon class="whiten" icon="$helpcircleoutline" />
      <v-tooltip
          activator="parent"
          location="bottom"
          offset="22"
      >
        <span>Help</span>
      </v-tooltip>
    </v-btn>

    <v-btn
        class="mr-6"
        density="compact"
        icon="true"
        v-if="loggedIn && currentRoute"
        @click="signOutClick"
    >
      <v-icon class="whiten" icon="$exittoapp" />
      <v-tooltip
          activator="parent"
          location="bottom"
          offset="22"
      >
        <span>Sign Out</span>
      </v-tooltip>
    </v-btn>
  </v-app-bar>

  <v-dialog
      v-model="helpDialog"
      max-width="auto"
  >
    <!-- Card which contains the help dialog -->
    <v-card>
      <v-card-text>
        <!-- Links to <Help /> component, which contains formatted help information  -->
        <Help/>
      </v-card-text>

      <v-card-actions class="v-card-actions">
        <v-spacer></v-spacer>
        <!-- Close button in bottom right of Help Dialog -->
        <v-btn
            class="help-dialog-button"
            color="red lighten-3"
            text-color="black"
            variant="tonal"
            @click="helpDialog = false"
        >Close
          <v-icon class="help-dialog-button-icon" icon="$close" />
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import {computed, onBeforeMount, ref} from 'vue'
import Help from '@/components/Help.vue'
import { useAppStore } from '@/store/app'
import { useRoute, useRouter } from 'vue-router'
import {useTheme} from 'vuetify'

const route = useRoute()
const router = useRouter()
const store = useAppStore()
const theme = useTheme()

const eed = ref(false)
const eeIcon = ref(false)
const eedTextOne = ref('')
const eedTextTwo = ref('')
const helpDialog = ref(false)
const imageLoaded = ref(false)

const currentRoute = computed(() => {
  return route.name;
})

const loggedIn = computed(() => {
  return store.loggedIn;
})

const loggedInUser = computed(() => {
  return store.getLoggedInUser
})

const changeTheme = () => {
  if (theme.global.name.value === 'light') {
    theme.global.name.value = 'dark';
    localStorage.setItem('theme', theme.global.name.value)
  } else {
    theme.global.name.value = 'light'
    localStorage.setItem('theme', theme.global.name.value)
  }
}

function ee(event: Event) {
  event.preventDefault()
  if (!eed.value){
    eed.value = true
    updateText()
  }
}

const navigateHome = () => {
  router.push({name: 'home'})
}

async function signOutClick() {
  await store.logout()
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function updateText(){
  eedTextOne.value = ''
  eedTextTwo.value = ''
  let textOne = [... 'made with']
  let textTwo = [... 'by alex, john, and michael']

  for (let i = 0; i < textOne.length; i++){
    eedTextOne.value += textOne[i]
    await sleep(100)
  }

  await sleep(100)
  eeIcon.value = true
  await sleep(100)

  for (let i = 0; i < textTwo.length; i++) {
    eedTextTwo.value += textTwo[i]
    await sleep(100)
  }
  await sleep(1000)
  eed.value = false
  eeIcon.value = false
}

onBeforeMount(() => {
  store.setUserOnRefresh()
  if (localStorage.getItem('theme')){
    theme.global.name.value = localStorage.getItem('theme')
  } else {
    theme.global.name.value = 'light'
    localStorage.setItem('theme', 'light')
  }
})
</script>