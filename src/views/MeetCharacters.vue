<template>
    <v-dialog v-model="dialog" @update-modelValue="(n: any) => dialog = n" fullscreen scrim="rgba(0, 0, 0, 0.8)" opacity="90">
        <div 
            class="dialog-content"
            @mousemove="handleMouseMove"
            @mouseleave="handleMouseLeave"
        >
            <div class="d-flex justify-end">
                <img 
                    src="@/assets/Close Icon.png"
                    class="close-button"
                    :class="{ 'hidden': !showControls }"
                    @click="dialog = false" 
                />
            </div>
            
            <!-- Move buttons outside carousel -->
            <img 
                v-if="currentSlide > 0"
                src="@/assets/PrevButton.png" 
                class="nav-button prev-button" 
                :class="{ 'hidden': !showControls, 'visible': showControls }"
                width="100" 
                height="100"
                @click="previousSlide" 
            />
            <img 
                v-if="currentSlide < characterImages.length - 1"
                src="@/assets/NextButton.png" 
                class="nav-button next-button" 
                :class="{ 'hidden': !showControls, 'visible': showControls }"
                width="100" 
                height="100"
                @click="nextSlide" 
            />
                
            <v-carousel 
                v-model="currentSlide"
                height="auto" 
                class="carousel" 
                hide-delimiter-background 
                :show-arrows="false"
            >
                <v-carousel-item v-for="image of characterImages" :key="image">
                    <v-img :src="image" class="carousel-image" cover />
                </v-carousel-item>
            </v-carousel>
        </div>
    </v-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const dialog = defineModel('dialog', {
    type: Boolean,
    required: true
})

// Import all images from MeetCharacters directory
const characterImageModules = import.meta.glob('@/assets/MeetCharacters/*', { eager: true })

// Convert the imported modules to an array of image URLs
const characterImages = ref<string[]>([])

// Process the imported images
onMounted(() => {
    characterImages.value = Object.values(characterImageModules).map((module: any) => module.default)
})

const currentSlide = ref(0)
const showControls = ref(true)
let hideTimeout: NodeJS.Timeout | null = null

const nextSlide = () => {
    if (currentSlide.value < characterImages.value.length - 1) {
        currentSlide.value++
    }
}

const previousSlide = () => {
    if (currentSlide.value > 0) {
        currentSlide.value--
    }
}

const showControlsTemporarily = () => {
    showControls.value = true
    
    if (hideTimeout) {
        clearTimeout(hideTimeout)
    }
    
    hideTimeout = setTimeout(() => {
        showControls.value = false
    }, 2000)
}

const handleMouseMove = () => {
    showControlsTemporarily()
}

const handleMouseLeave = () => {
    if (hideTimeout) {
        clearTimeout(hideTimeout)
    }
    showControls.value = false
}

onMounted(() => {
    showControlsTemporarily()
})

onUnmounted(() => {
    if (hideTimeout) {
        clearTimeout(hideTimeout)
    }
})
</script>

<style scoped>
.dialog-content {
    width: 100%;
    height: 100%;
    position: relative;
}

.carousel {
    top: 9%;
    height: 80vh;
    min-height: 80vh;
}

.carousel-image {
    width: 50%;
    margin: 0 auto;
    max-height: 90vh;
    object-fit: contain;
}

.close-button {
    position: absolute;
    top: 0px;
    right: 0px;
    width: 100px;
    height: 100px;
    z-index: 2;
    cursor: pointer;
    transition: opacity 0.3s ease-in-out;
}

.close-button.hidden {
    opacity: 0;
    pointer-events: none;
}

.nav-button {
    position: fixed !important;
    top: 50vh !important;
    transform: translateY(-50%) !important;
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    cursor: pointer;
    z-index: 1000;
    opacity: 1;
}

.nav-button:hover {
    opacity: 0.8;
    transform: translateY(-50%) scale(1.05) !important;
}

.prev-button {
    left: 20px !important;
}

.prev-button.hidden {
    opacity: 0 !important;
    pointer-events: none;
    transform: translateY(-50%) translateX(-120px) !important;
}

.prev-button.visible {
    opacity: 1;
    transform: translateY(-50%) translateX(0) !important;
}

.next-button {
    right: 20px !important;
}

.next-button.hidden {
    opacity: 0 !important;
    pointer-events: none;
    transform: translateY(-50%) translateX(120px) !important;
}

.next-button.visible {
    opacity: 1;
    transform: translateY(-50%) translateX(0) !important;
}
</style>