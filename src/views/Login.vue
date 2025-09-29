<template>
  <v-container
      class="mx-auto unselectable"
      :fluid="true"
  >
    <v-row class="login-row-padding">
      <v-col class="justify-center">
        <v-card class="elevation-12" max-width="400" min-width="400" v-show="imageLoaded">
          <v-card-text>
            <v-row class="justify-center">
              <img
                  class="login-logo shrink"
                  src="../assets/BP-Login-Logo-Light.png"
                  @load="imageLoaded = true"
                  v-if="currentTheme === 'light'"
                  alt="St. Jude Children's Research Hospital Biorepository Pathology"
              />
              <img
                  class="login-logo shrink"
                  src="../assets/BP-Login-Logo-Dark.png"
                  @load="imageLoaded = true"
                  v-if="currentTheme === 'dark'"
                  alt="St. Jude Children's Research Hospital Biorepository Pathology"
              />
            </v-row>
            <v-form class="mx-8 mt-3" v-if="!loginLoading">
              <v-text-field
                  :autofocus="true"
                  autocomplete="off"
                  class="shrink reserve-error-space"
                  :disabled="isAuthenticating"
                  :error-count="errorMessages.username.length"
                  :error-messages="errorMessages.username"
                  id="usernameInput"
                  label="Username"
                  type="text"
                  v-model="username"
                  @keydown="capsLockPrevent($event, 'username')"
              >
                <template v-slot:prepend-inner="{}">
                  <v-icon class="mt-1 pb-1" icon="$account" size="25"/>
                </template>
              </v-text-field>
              <v-text-field
                  autocomplete="off"
                  class="shrink reserve-error-space"
                  :error-messages="errorMessages.password"
                  id="password"
                  @keyup.enter="handleSubmit"
                  label="Password"
                  type="password"
                  v-model="password"
                  @keydown="capsLockPrevent($event, 'password')"
              >
                <template v-slot:prepend-inner="{}">
                  <v-icon class="mt-1 pb-1" icon="$lock" size="25"/>
                </template>
              </v-text-field>

            </v-form>
            <div style="display: flex; justify-content: center">
              <v-progress-circular
                  color="red-darken-3"
                  :indeterminate="true"
                  size="75"
                  style="height: 170px"
                  v-if="loginLoading"
              />
            </div>
          </v-card-text>
          <v-card-actions v-if="!loginLoading">
            <div class="flex-grow-1"/>
            <v-btn
                class="mb-4 mr-10 mt-6"
                color="light-green-darken-1"
                :disabled="username.length === 0 || password.length === 0"
                variant="elevated"
                @click="handleSubmit"
            >
              Login
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <Snackbar
        :snack="snackData.on"
        :snackColor="snackData.color"
        :snackText="snackData.text"
        @close_click="ErrorService.resetSnackBar(snackData)"
        v-model="snackData.on"
    />
  </v-container>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue'
import {ErrorService} from '@/services/error.service.ts'
import Snackbar from '@/components/Snackbar.vue'
import {useAppStore} from '@/store/app.ts'
import {useTheme} from 'vuetify'

const store = useAppStore()
const theme = useTheme()

type ErrorMessageKeys = 'username' | 'password'

const capsLockOn = ref(false)
const errorMessages = ref<{ [key in ErrorMessageKeys]: string[] }>({
  username: [],
  password: [],
})
const imageLoaded = ref<boolean>(false)
const loginLoading = ref<boolean>(false)
const password = ref<string>('')

interface SnackData {
  on: boolean
  color: string
  text: string
}

const snackData = ref<SnackData>(
    {
      on: false,
      color: '',
      text: ''}
)
const username = ref<string>('')

const currentTheme = computed(() => {
  return theme.global.name.value
})

const isAuthenticating = computed(() => {
  return store.authenticating
})

const capsLockPrevent = (event: KeyboardEvent, key: ErrorMessageKeys): void => {
  if (event.getModifierState('CapsLock')) {
    event.preventDefault()
    capsLockOn.value = true
    errorMessages.value[key] = []
    errorMessages.value[key].push('Turn off Caps Lock and try again')
  } else {
    errorMessages.value[key] = []
    capsLockOn.value = false
  }
}

const failedLogin = async (message: string): Promise<void> => {
  loginLoading.value = false
  await ErrorService.handleError(message, snackData.value, new Error())
}

const handleSubmit = async (): Promise<void> => {
  loginLoading.value = true
  store.resetErrorState()
  try {
    if (await store.login(username.value, password.value)) {
      loginLoading.value = false
    }
    await failedLogin(store.authenticationError[0])
  } catch (error: any) {
    await failedLogin(store.authenticationError[0])
  }
  username.value = ''
  password.value = ''
}

</script>