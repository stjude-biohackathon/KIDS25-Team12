<template>
  <img :src="backgroundImage" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 1;">
  
  <!-- Existing Animated Stars -->
  <img src="/animations/comic-book-style-cartoon-of-a-gold-star-png.webp" 
       class="animated-star1" 
       alt="Star" />
  <img src="/animations/comic-book-style-cartoon-of-a-gold-star-png.webp" 
       class="animated-star2" 
       alt="Star" />

  <!-- Existing White Stars -->
  <img src="/animations/whiteStar.png" 
      class="white-star" 
      style="--top: 30%; --right: 14%; --size: 60px; --scale-start: 1; --scale-end: 0.5; --duration: 3s;"
      alt="Star" />
  <img src="/animations/whiteStar.png" 
      class="white-star" 
      style="--top: 50%; --right: 82%; --size: 50px; --scale-start: 0.7; --scale-end: 1.2; --duration: 2.5s;"
      alt="Star" /> 
  <img src="/animations/whiteStar.png" 
      class="white-star" 
      style="--top: 10%; --right: 29%; --size: 80px; --scale-start: 1.1; --scale-end: 0.3; --duration: 4s;"
      alt="Star" />
  <img src="/animations/whiteStar.png" 
      class="white-star" 
      style="--top: 92%; --right: 46%; --size: 70px; --scale-start: 1; --scale-end: 0.4; --duration: 2.5s;"
      alt="Star" />
  <img src="/animations/whiteStar.png" 
      class="white-star" 
      style="--top: 20%; --right: 95%; --size: 70px; --scale-start: .5; --scale-end: 1.1; --duration: 3s;"
      alt="Star" />
  
  <!-- Shooting Stars -->
  <div class="shooting-star shooting-star-1"></div>
  <div class="shooting-star shooting-star-2"></div>
  <div class="shooting-star shooting-star-3"></div>
  <div class="shooting-star shooting-star-4"></div>
  <div class="shooting-star shooting-star-5"></div>
  
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
import Reader from '@/components/Reader.vue'
import Preview from '@/components/Preview.vue'
import MeetCharacters from '@/components/MeetCharacters.vue'
import { comicsConfig } from '@/config/comics'
const previewDialog = ref(false);
const charactersDialog = ref(false);
const readerDialog = ref(false);
const handleBookClick = (book: any) => {
  selectedBook.value = book;
  previewDialog.value = true;

  const audioFile = new Audio('/audio/17.m4a');
  audioFile.play().catch(err => {
    console.error("Audio playback failed:", err);
  });
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

.animated-star1 {
  position: fixed;
  top: 45%;
  right: 8%;
  width: 90px;
  height: 90px;
  z-index: 1500;
  animation: cuteRotate 3s ease-in-out infinite;
  
  /* Luminescent glow effect */
  filter: 
    drop-shadow(0 0 10px rgba(255, 215, 0, 0.8))
    drop-shadow(0 0 20px rgba(255, 215, 0, 0.6))
    drop-shadow(0 0 30px rgba(255, 215, 0, 0.4))
    brightness(1.2);
}

.animated-star2 {
  position: fixed;
  top: 35%;
  right: 90%;
  width: 90px;
  height: 90px;
  z-index: 1500;
  animation: cuteRotate2 4s ease-in-out infinite;
  
  /* Luminescent glow effect */
  filter: 
    drop-shadow(0 0 10px rgba(255, 215, 0, 0.8))
    drop-shadow(0 0 20px rgba(255, 215, 0, 0.6))
    drop-shadow(0 0 30px rgba(255, 215, 0, 0.4))
    brightness(1.2);
}

.white-star {
  position: fixed;
  top: var(--top, 30%);
  right: var(--right, 14%);
  width: var(--size, 60px);
  height: var(--size, 60px);
  z-index: 1500;
  animation: starPulse var(--duration, 3s) ease-in-out infinite;
  
  /* White luminescent glow */
  filter: 
    drop-shadow(0 0 8px rgba(255, 255, 255, 0.9))
    drop-shadow(0 0 15px rgba(255, 255, 255, 0.6))
    drop-shadow(0 0 25px rgba(255, 255, 255, 0.3))
    brightness(1.3);
}

@keyframes cuteRotate {
  0%, 100% { 
    transform: rotate(-15deg) scale(1); 
  }
  25% {
    transform: rotate(0deg) scale(1.1);
  }
  50% { 
    transform: rotate(15deg) scale(1); 
  }
  75% {
    transform: rotate(0deg) scale(1.1);
  }
}

@keyframes cuteRotate2 {
  0%, 100% { 
    transform: rotate(15deg) scale(1.3); 
  }
  25% {
    transform: rotate(0deg) scale(0.8);
  }
  50% { 
    transform: rotate(-15deg) scale(1.3); 
  }
  75% {
    transform: rotate(0deg) scale(.8);
  }
}

@keyframes starPulse {
  0%, 100% { 
    transform: scale(var(--scale-start, 1)); 
  }
  50% { 
    transform: scale(var(--scale-end, 0.5)); 
  }
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
<<<<<<< Updated upstream


.shooting-star {
  position: fixed;
  width: 3px;
  height: 3px;
  background: radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.8) 30%, transparent 70%);
  border-radius: 50%;
  z-index: 400;
  opacity: 0;
}

.shooting-star::before {
  content: '';
  position: absolute;
  top: 50%;
  right: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, 
    rgba(255, 255, 255, 0) 0%, 
    rgba(255, 255, 255, 0.8) 30%, 
    rgba(255, 255, 255, 1) 100%);
  transform: translateY(-50%);
  border-radius: 1px;
  filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.8));
}

/* Individual Shooting Star Animations */
.shooting-star-1 {
  top: 15%;
  right: 100%;
  animation: shootingStar1 8s linear infinite;
}

.shooting-star-1::before {
  animation: shootingStarTail1 8s linear infinite;
}

.shooting-star-2 {
  top: 45%;
  right: 100%;
  animation: shootingStar2 10s linear infinite;
  animation-delay: 3s;
}

.shooting-star-2::before {
  animation: shootingStarTail2 10s linear infinite;
  animation-delay: 3s;
}

.shooting-star-3 {
  top: 75%;
  right: 100%;
  animation: shootingStar3 12s linear infinite;
  animation-delay: 6s;
}

.shooting-star-3::before {
  animation: shootingStarTail3 12s linear infinite;
  animation-delay: 6s;
}

.shooting-star-4 {
  top: 25%;
  right: 100%;
  animation: shootingStar4 9s linear infinite;
  animation-delay: 1.5s;
}

.shooting-star-4::before {
  animation: shootingStarTail4 9s linear infinite;
  animation-delay: 1.5s;
}

.shooting-star-5 {
  top: 60%;
  right: 100%;
  animation: shootingStar5 11s linear infinite;
  animation-delay: 4.5s;
}

.shooting-star-5::before {
  animation: shootingStarTail5 11s linear infinite;
  animation-delay: 4.5s;
}

/* Shooting Star Movement Animations */
@keyframes shootingStar1 {
  0% {
    transform: translateX(0) translateY(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateX(-120vw) translateY(20vh);
    opacity: 0;
  }
}

@keyframes shootingStar2 {
  0% {
    transform: translateX(0) translateY(0);
    opacity: 0;
  }
  15% {
    opacity: 1;
  }
  85% {
    opacity: 1;
  }
  100% {
    transform: translateX(-130vw) translateY(-15vh);
    opacity: 0;
  }
}

@keyframes shootingStar3 {
  0% {
    transform: translateX(0) translateY(0);
    opacity: 0;
  }
  8% {
    opacity: 1;
  }
  92% {
    opacity: 1;
  }
  100% {
    transform: translateX(-140vw) translateY(10vh);
    opacity: 0;
  }
}

@keyframes shootingStar4 {
  0% {
    transform: translateX(0) translateY(0);
    opacity: 0;
  }
  12% {
    opacity: 1;
  }
  88% {
    opacity: 1;
  }
  100% {
    transform: translateX(-125vw) translateY(25vh);
    opacity: 0;
  }
}

@keyframes shootingStar5 {
  0% {
    transform: translateX(0) translateY(0);
    opacity: 0;
  }
  9% {
    opacity: 1;
  }
  91% {
    opacity: 1;
  }
  100% {
    transform: translateX(-135vw) translateY(-10vh);
    opacity: 0;
  }
}

/* Shooting Star Tail Animations */
@keyframes shootingStarTail1 {
  0% {
    width: 0;
  }
  10% {
    width: 80px;
  }
  90% {
    width: 80px;
  }
  100% {
    width: 0;
  }
}

@keyframes shootingStarTail2 {
  0% {
    width: 0;
  }
  15% {
    width: 100px;
  }
  85% {
    width: 100px;
  }
  100% {
    width: 0;
  }
}

@keyframes shootingStarTail3 {
  0% {
    width: 0;
  }
  8% {
    width: 70px;
  }
  92% {
    width: 70px;
  }
  100% {
    width: 0;
  }
}

@keyframes shootingStarTail4 {
  0% {
    width: 0;
  }
  12% {
    width: 90px;
  }
  88% {
    width: 90px;
  }
  100% {
    width: 0;
  }
}

@keyframes shootingStarTail5 {
  0% {
    width: 0;
  }
  9% {
    width: 75px;
  }
  91% {
    width: 75px;
  }
  100% {
    width: 0;
  }
}
</style>
