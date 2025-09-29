<template>
  <v-container>
    <Snackbar
        key="loginSnackBar"
        :snack="snackData.on"
        :snackColor="snackData.color"
        :snackText="snackData.text"
        v-model="snackData.on"
    />
    <v-row>
      <v-spacer/>
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title style="white-space: normal">
            This is a boilerplate app for Front-end Use within the Biorepository Department at St. Jude Children's
            Research Hospital
          </v-card-title>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card to="componentView">
          <v-card-title style="white-space: normal">
            Click here to go to a password-protected, non-home page
          </v-card-title>
        </v-card>
      </v-col>
      <v-col>
        <v-btn @click="sendRequest">
          Send Request
        </v-btn>
      </v-col>
      <v-spacer/>
    </v-row>
  </v-container>
</template>
<script setup lang="ts" >
import ApiService from '@/services/api.service.ts'
import {ErrorService, SnackBarData} from '@/services/error.service.ts'
import {ref} from 'vue'
import Snackbar from "@/components/Snackbar.vue";

const snackData = ref<SnackBarData>({on: false, color: '', text: ''})
//methods
const sendRequest = async() => {
  try {
    await ApiService.get('asdfgfewj')
  } catch (error) {
    await ErrorService.handleError(`Why'd you do that??`, snackData.value, error)
  }
}
</script>