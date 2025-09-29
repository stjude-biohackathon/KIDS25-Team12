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
        <v-btn @click="console.log('Request Sent')" color="primary" class="ma-2" variant="outlined">
          Send Request
        </v-btn>
      </v-col>
      <v-spacer/>
    </v-row>
  </v-container>
</template>
<script setup lang="ts" >
import { SnackBarData} from '@/services/error.service.ts'
import {ref} from 'vue'
import Snackbar from "@/components/Snackbar.vue";

const snackData = ref<SnackBarData>({on: false, color: '', text: ''})

</script>