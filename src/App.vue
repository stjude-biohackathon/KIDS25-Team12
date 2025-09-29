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

import { onMounted } from 'vue'
import { useAppStore } from '@/store/app.ts'
import { useRoute } from 'vue-router'
import {UserService} from "@/services/user.service.ts";

const store = useAppStore()
const route = useRoute()

const authStatus = async () => {
  try {
    return await UserService.authStatus()
  } catch (error: any) {
    if (error.errorCode === 401) {
      await store.logout401()
    }
    return false
  }
}

onMounted(() => {
  if (store.accessToken && route.name !== 'login') {
    authStatus()
  }
})
</script>
