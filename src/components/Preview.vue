<template>
    <v-dialog v-model="dialog" @update-modelValue="(n: any) => dialog = n" fullscreen scrim="rgba(0, 0, 0, 0.8)"
        opacity="90">
        <div class="dialog-content" @mousemove="handleMouseMove" @mouseleave="handleMouseLeave">
            <div class="d-flex justify-end">
                <img src="@/assets/Close Icon.png" class="close-button" :class="{ 'hidden': !showControls }"
                    @click="dialog = false" />
            </div>
            <v-card width="800" class="mx-auto my-12 pa-7" :elevation="12">
                <v-card-title class="text-h3 text-center mb-5" style="font-family: 'Bangers';">{{ book.label }}</v-card-title>
                <div class="d-flex justify-center">
                    <div class="d-flex flex-column justify-center">
                        <img :src="book.cover" class="mb-4" height="400" contain />
                    </div>
                    <div class="ml-4">
                        <v-card-text class="book-description">{{ book.description }}</v-card-text>
                        <div class="mt-16 button-container">
                            <img class="img-btn" src="@/assets/ReadTheComicBtn.svg" height="130" @click="emits('open-reader')" />
                            <img class="img-btn" src="@/assets/MeetTheCharactersBtn.svg" height="130" @click="emits('open-characters')" />
                        </div>
                    </div>
                </div>
            </v-card>
        </div>
    </v-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const dialog = defineModel('dialog', {
    type: Boolean,
    required: true
})

defineProps({
    book: {
        type: Object as () => {
            id: number;
            cover: string;
            label: string;
            comics: string[];
            description: string;
        },
        required: true
    }
})

const emits = defineEmits(['open-reader', 'open-characters'])

const showControls = ref(true)
let hideTimeout: number | null = null

const showControlsTemporarily = () => {
    showControls.value = true

    // Clear existing timeout
    if (hideTimeout) {
        clearTimeout(hideTimeout)
    }

    // Set new timeout to hide controls after 2 seconds
    hideTimeout = setTimeout(() => {
        showControls.value = false
    }, 2000)
}

const handleMouseMove = () => {
    showControlsTemporarily()
}

const handleMouseLeave = () => {
    // Hide controls immediately when mouse leaves the dialog
    if (hideTimeout) {
        clearTimeout(hideTimeout)
    }
    showControls.value = false
}

onMounted(() => {
    // Show controls initially
    showControlsTemporarily()
})

onUnmounted(() => {
    if (hideTimeout) {
        clearTimeout(hideTimeout)
    }
})
</script>

<style scoped>
.button-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 16px;
}

.book-description {
    font-size: 16px;
    line-height: 1.5;
    margin-bottom: 16px;
    font-family: 'Arial', sans-serif;
}

.close-button {
    position: absolute;
    top: 40px;
    right: 40px;
    width: 100px;
    height: 100px;
    z-index: 2;
    cursor: pointer;
    transition: opacity 0.3s ease-in-out;
}

.img-btn {
    cursor: pointer;
    margin: 0 8px;
    transition: transform 0.2s ease;
}

.img-btn:hover {
    transform: translateY(-4px) scale(1.02);
    filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3)); /* Shadow follows SVG shape */
}

.close-button.hidden {
    opacity: 0;
    pointer-events: none;
}

.dialog-content {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    overflow: auto;
}
</style>