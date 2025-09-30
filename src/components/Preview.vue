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
            <v-card width="400" class="mx-auto my-12 pa-4" :elevation="12">
                <v-img :src="book.cover" class="mb-4" height="150" contain />
                <v-card-title class="text-h6">{{ book.label }}</v-card-title>
                <v-card-text class="text-body-2">{{ book.description }}</v-card-text>
                <div class="button-container">
                    <v-btn class="action-btn" @click="$emit('open-reader')">Read the Comic!</v-btn>
                    <v-btn class="action-btn secondary" @click="$emit('view-details')">Meet the Characters</v-btn>
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

const props = defineProps({
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

const showControls = ref(true)
let hideTimeout: NodeJS.Timeout | null = null

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
    justify-content: center;
    align-items: center;
    margin-top: 16px;
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