<template>
  <img :src="backgroundImage" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 1;">
  <p class="adventure-title">Choose Your Adventure</p>
  <div class="d-flex justify-center align-center">
    <div class="books-grid">
      <div class="book" v-for="book of books" :key="book.id" @click="handleBookClick(book)">
        <img :src="book.cover" alt="Book Cover" class="book-cover" />
      </div>
    </div>
  </div>

  <Preview v-if="previewDialog" :book="selectedBook" v-model:dialog="previewDialog"
    @open-reader="() => { previewDialog = false; readerDialog = true }"
    @open-characters="() => { previewDialog = false; charactersDialog = true }" />
  <Reader v-if="readerDialog" v-model:dialog="readerDialog" :image-files="selectedBook.comics || []" />
  <MeetCharacters v-if="charactersDialog" v-model:dialog="charactersDialog" :image-files="selectedBook.characterFiles || []"
    :character-descriptions="selectedBook.characterDescriptions || []" />
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import { useTheme } from 'vuetify'
import Reader from './Reader.vue'
import Preview from '@/components/Preview.vue'
import MeetCharacters from './MeetCharacters.vue'
import { comicsConfig } from '@/config/comics'

// This is a BOOK OBJECT
const previewDialog = ref(false);
const charactersDialog = ref(false);
const readerDialog = ref(false);

const handleBookClick = (book: any) => {
  selectedBook.value = book;
  previewDialog.value = true;
}

const books = ref(comicsConfig);

// Import images
import lightBookcase from '@/assets/HomePageBookcase-Light.png'
import darkBookcase from '@/assets/HomePageBookcase-Dark2.png'

const theme = useTheme()

const backgroundImage = computed(() => {
  return theme.global.name.value === 'light' ? lightBookcase : darkBookcase
})

const selectedBook = ref(books.value[0]); 
</script>

<!-- Your CSS stays the same -->
<style>
/* Your existing styles... */
.books-grid {
  display: grid;
  height: 53%;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 30vh 30vh;
  position: absolute;
  top: 27.5%;
  z-index: 2;
  row-gap: 1.3vh;
  column-gap: 6.6vw;
}

.book {
  border-radius: 5px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s ease;
  width: 8.91vw;
  height: 26.1vh;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 15);
}

.book-cover {
  width: 8.91vw;
  height: 26.1vh;
}

.book:hover {
  transform: scale(1.05);
}

.book-title {
  font-size: 11px;
  font-weight: bold;
  text-align: center;
}

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

.action-btn:hover,
.close-btn:hover {
  opacity: 0.8;
}

.adventure-title {
  position: absolute;
  top: 12.5%;
  width: 100%;
  text-align: center;
  font-size: 4.0vw;
  color: #ffffff;
  text-shadow: 2px 4px 4px rgba(0, 0, 0, 8.0);
  z-index: 2000;
  font-family: 'Bangers', cursive, sans-serif;
}
</style>