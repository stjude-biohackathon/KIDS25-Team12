<template>
  <img :src="backgroundImage" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 1;">
  
  <div class="books-container">
    <div class="book-row">
      <div class="book" @click="showPopup = true">
        <span class="book-title">{{ books[0].label }}</span>
      </div>
      <div class="book">
        <span class="book-title">{{ books[1].label }}</span>
      </div>
      <div class="book">
        <span class="book-title">{{ books[2].label }}</span>
      </div>
    </div>
    <div class="book-row">
      <div class="book">
        <span class="book-title">{{ books[3].label }}</span>
      </div>
      <div class="book">
        <span class="book-title">{{ books[4].label }}</span>
      </div>
      <div class="book">
        <span class="book-title">{{ books[5].label }}</span>
      </div>
    </div>
  </div>
  
  <!-- Popup Modal with Animation -->
  <Transition name="popup">
    <div v-if="showPopup" class="popup-overlay" @click="showPopup = false">
      <div class="popup-content" @click.stop>
        <h2>TITLE</h2>
        <p>Description of comic</p>
        <div class="button-container">
          <div class="action-buttons">
            <button @click="handleAction1" class="action-btn">Meet the Characters</button>
            <button @click="handleAction2" class="action-btn secondary">Read the Comic</button>
          </div>
          <button @click="showPopup = false" class="close-btn">Close</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<!-- Your script stays the same -->
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
const showPopup = ref(false)

const handleAction1 = () => {
  console.log('Action 1 clicked!')
  showPopup.value = false
}

const handleAction2 = () => {
  console.log('Action 2 clicked!')
  showPopup.value = false
}

const backgroundImage = computed(() => {
  return theme.global.name.value === 'light' ? lightBookcase : darkBookcase
})

const books = ref([
  { label: 'Book 1' },
  { label: 'Book 2' },
  { label: 'Book 3' },
  { label: 'Book 4' },
  { label: 'Book 5' },
  { label: 'Book 6' },
])
</script>

<style>
/* Your existing styles... */
.books-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
  z-index: 2;
  gap: 150px;
}

.book-row {
  display: flex;
  flex-direction: row;
  gap: 100px;
}

.book {
  background-color: #f5f5f5;
  border-radius: 5px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s ease;
  width: 100px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.book:hover {
  transform: scale(1.05);
}

.book-title {
  font-size: 11px;
  font-weight: bold;
  text-align: center;
}

/* Popup Animation Styles */
.popup-enter-active {
  transition: all 0.3s ease-out;
}

.popup-leave-active {
  transition: all 0.2s ease-in;
}

.popup-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.popup-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  max-width: 400px;
  width: 90%;
  transform-origin: center;
}

.button-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 15px;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
}

.action-btn {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  width: 200px;
  text-align: center;
}

.action-btn.secondary {
  background-color: #ffc107;
}

.close-btn {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.action-btn:hover, .close-btn:hover {
  opacity: 0.8;
}
</style>