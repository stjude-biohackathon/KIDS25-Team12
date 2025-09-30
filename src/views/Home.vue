<template>
  <img :src="backgroundImage" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 1;">
  <div class="d-flex justify-center align-center">
    <div class="books-grid">
      <div class="book" v-for="book of books" :key="book.id" @click="handleBookClick(book)">
        <img :src="book.cover" alt="Book Cover" height="150" />
      </div>
    </div>
  </div>

  <!-- Popup Modal with Animation -->
  <Preview :book="selectedBook" v-model:dialog="previewDialog" @open-reader="() => {previewDialog = false; readerDialog = true}" />
  <Reader v-model:dialog="readerDialog" :image-files="selectedBook.comics || []" />
</template>

<!-- Your script stays the same -->
<script setup lang="ts">
import { computed, ref } from 'vue'
import { useTheme } from 'vuetify'
import Reader from './Reader.vue'
import Preview from '@/components/Preview.vue'

// This is a BOOK OBJECT
const previewDialog = ref(false);
const readerDialog = ref(false);

const handleBookClick = (book: any) => {
  selectedBook.value = book;
  console.log(selectedBook.value);
  previewDialog.value = true;
}


// Import images
import lightBookcase from '@/assets/HomePageBookcase-Light.png'
import darkBookcase from '@/assets/HomePageBookcase-Dark.png'

const theme = useTheme()

const backgroundImage = computed(() => {
  return theme.global.name.value === 'light' ? lightBookcase : darkBookcase
})

const books = ref([
  { id: 0, cover: '/comics-1/Sample Comic Cover-1.png', label: 'CAR-T Titans', comics: ['/comics-1/Page1.svg', '/comics-1/Page1.svg'], description: 'Dive into the thrilling world of CAR-T therapy with "CAR-T Titans." Follow the journey of brave heroes battling cancer at the cellular level, showcasing the power of cutting-edge science and teamwork.' },
  { id: 1, cover: '/comics-2/NeuronNebula.png', label: 'Neuron Nebula: Pt. II', comics: ['comics-1/Page1.svg'], description: 'Explore the mysteries of the mind in "Neuron Nebula: Pt. II." This captivating sequel delves deeper into the neural universe, where every thought and memory is a star in the vast expanse of human consciousness.' },
  { id: 2, cover: '/comics-3/ReturnofTheGanglia.png', label: 'Return of the Ganglia', comics: ['comics-1/Page1.svg'], description: 'Join the adventure in "Return of the Ganglia," where a group of unlikely heroes embarks on a quest to restore balance to the nervous system. Packed with action, humor, and heart, this comic is a must-read for all ages.' },
  { id: 3, cover: '/comics-4/LordLeukemia.png', label: 'Lord Leukemia: An Origin Story', comics: ['comics-1/Page1.svg'], description: 'Uncover the origins of a formidable foe in "Lord Leukemia: An Origin Story." This gripping tale reveals the rise of a villain determined to conquer the body, and the heroes who stand against him in a battle for survival.' },
  { id: 4, cover: '/comics-5/fMRIAllSeeingEye.png', label: 'fMRI: The All-Seeing Eye', comics: ['comics-1/Page1.svg'], description: 'Step into the future with "fMRI: The All-Seeing Eye." This visionary comic explores the incredible technology of functional MRI, allowing readers to witness the brain in action and understand the complexities of human thought and emotion.' },
  { id: 5, cover: '/comics-6/BMTTransplant.png', label: 'BMT: At the Transplant', comics: ['comics-1/Page1.svg'], description: 'Experience the life-saving journey in "BMT: At the Transplant." Follow patients and medical teams through the challenges and triumphs of bone marrow transplantation, highlighting the resilience of the human spirit and the miracles of modern medicine.' },
])

const selectedBook = ref(books.value[0]); 
</script>

<style>
/* Your existing styles... */
.books-grid {
  display: grid;
  height: 53%;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 30vh 30vh;
  /* Two rows, each taking 222px */
  position: absolute;
  top: 30%;
  z-index: 2;
  column-gap: 90px;
}

.book {
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
  box-shadow: 0 4px 8px rgba(0, 0, 0, 15);
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

.action-btn:hover,
.close-btn:hover {
  opacity: 0.8;
}
</style>