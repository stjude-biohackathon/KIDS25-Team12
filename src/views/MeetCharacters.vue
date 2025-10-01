<template>
    <v-dialog v-model="dialog" @update-modelValue="(n: any) => dialog = n" fullscreen scrim="rgba(0, 0, 0, 0.8)"
        opacity="90">
        <div class="dialog-content" @mousemove="handleMouseMove" @mouseleave="handleMouseLeave">
            <div class="d-flex justify-end">
                <img src="@/assets/Close Icon.png" class="close-button" :class="{ 'hidden': !showControls }"
                    @click="dialog = false" />
            </div>

            <!-- Move buttons outside carousel -->
            <img v-if="currentSlide > 0" src="@/assets/PrevButton.png" class="nav-button prev-button"
                :class="{ 'hidden': !showControls, 'visible': showControls }" width="100" height="100"
                @click="previousSlide" />
            <img v-if="currentSlide < imageFiles.length - 1" src="@/assets/NextButton.png"
                class="nav-button next-button" :class="{ 'hidden': !showControls, 'visible': showControls }" width="100"
                height="100" @click="nextSlide" />

            <v-carousel v-model="currentSlide" height="auto" hide-delimiter-background
                :show-arrows="false" hide-delimiters>
                <v-carousel-item v-for="(image, index) of imageFiles" :key="image"
                    class="carousel-item">
                    <v-img :src="image" class="carousel-image" @load="onImageLoad(index)"
                        @error="onImageError(index)" />

                    <!-- Only show span when current image is loaded -->
                    <div class="d-flex justify-center mt-4 description-text" v-if="characterDescriptions &&
                        characterDescriptions.length > currentSlide &&
                        loadedImages[currentSlide]">
                        <span class="character-description">
                            {{ characterDescriptions[currentSlide] }}
                        </span>
                    </div>

                    <!-- Optional loading indicator -->
                    <div class="d-flex justify-center mt-4"
                        v-if="!loadedImages[currentSlide] && index === currentSlide">
                        <v-progress-circular indeterminate color="white" size="32"></v-progress-circular>
                    </div>
                </v-carousel-item>
            </v-carousel>
        </div>
    </v-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'

const dialog = defineModel('dialog', {
    type: Boolean,
    required: true
})

const props = defineProps({
    imageFiles: {
        type: Array as () => string[],
        required: true
    },
    characterDescriptions: {
        type: Array as () => string[],
        required: false
    }
})

const currentSlide = ref(0)
const showControls = ref(true)
const loadedImages = ref<Record<number, boolean>>({})
let hideTimeout: NodeJS.Timeout | null = null

// Track image loading
const onImageLoad = (index: number) => {
    loadedImages.value[index] = true
    console.log(`Image ${index} loaded`)
}

const onImageError = (index: number) => {
    loadedImages.value[index] = false
    console.error(`Image ${index} failed to load`)
}

// Reset loaded images when dialog opens
watch(dialog, (newVal) => {
    if (newVal) {
        loadedImages.value = {}
        currentSlide.value = 0
    }
})

const nextSlide = () => {
    if (currentSlide.value < props.imageFiles.length - 1) {
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
    height: 90vh;
    min-height: 90vh;
}

.carousel-image {
    width: 50%;
    margin: 40px auto 0 auto;
    max-height: 70vh;
    object-fit: contain;
}

.carousel-item {
    padding-top: 10vh;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
    /* Slide out to the left */
}

.prev-button.visible {
    opacity: 1;
    transform: translateY(-50%) translateX(0) !important;
    /* Slide in from the left */
}

.next-button {
    right: 20px !important;
}

.next-button.hidden {
    opacity: 0 !important;
    pointer-events: none;
    transform: translateY(-50%) translateX(120px) !important;
    /* Slide out to the right */
}

.next-button.visible {
    opacity: 1;
    transform: translateY(-50%) translateX(0) !important;
    /* Slide in from the right */
}

.character-description {
    font-family: 'Bangers', cursive;
    background-color: white;
    text-align: center;
    padding: 12px 24px;
    border-radius: 12px;
    font-size: 1.5rem;
    color: #333;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    max-width: 80%;
    line-height: 1.2;

    /* Add a nice fade-in animation */
    animation: fadeInUp 0.5s ease-out;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>