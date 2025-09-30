<template>
    <v-dialog v-model="dialog" @update-modelValue="(n: any) => dialog = n" fullscreen>
        <div class="d-flex justify-end">
            <img src="@/assets/Close Icon.png"
                style="position: absolute; top: 0px; right: 0px; width: 100px; height: 100px; z-index: 2; cursor: pointer;"
                @click="dialog = false" />
        </div>
        <v-carousel class="w-100 h-100" hide-delimiter-background show-arrows="hover">
            <v-carousel-item v-for="(item, i) in 5" :key="i">
                <div class="image-zoom-container">
                    <v-img contain src="@/assets/Artboard 1.svg" class="zoomable-image"
                        :style="{ transform: `scale(${zoomLevel}) translate(${panX}px, ${panY}px)` }"
                        @wheel.prevent="handleZoom" @mousedown="startPan" @mousemove="handlePan" @mouseup="endPan"
                        @mouseleave="endPan"></v-img>
                </div>
            </v-carousel-item>
            <template #next="{ props }">
                <v-img :width="100" class="nav-button next-button" src="@/assets/NextButton.png" :height="100" v-bind="props" @click="props.onClick"></v-img>
            </template>
            <template #prev="{ props }">
                <v-img class="nav-button prev-button" src="@/assets/PrevButton.png" :height="100" v-bind="props" @click="props.onClick"></v-img>
            </template>
        </v-carousel>

        <!-- Zoom controls
        <div class="zoom-controls">
            <v-btn @click="zoomIn" icon="mdi-plus" size="small">
                <v-icon>mdi-plus</v-icon>
            </v-btn>
            <v-btn @click="zoomOut" icon="mdi-minus" size="small"></v-btn>
            <v-btn @click="resetZoom" icon="mdi-refresh" size="small"></v-btn>
        </div> -->
    </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const dialog = defineModel('dialog', {
    type: Boolean,
    required: true
})

const zoomLevel = ref(1)
const panX = ref(0)
const panY = ref(0)
const isPanning = ref(false)
const lastMouseX = ref(0)
const lastMouseY = ref(0)

const handleZoom = (event: WheelEvent) => {
    const delta = event.deltaY > 0 ? -0.1 : 0.1
    zoomLevel.value = Math.max(0.5, Math.min(3, zoomLevel.value + delta))
}

const zoomIn = () => {
    zoomLevel.value = Math.min(3, zoomLevel.value + 0.2)
}

const zoomOut = () => {
    zoomLevel.value = Math.max(0.5, zoomLevel.value - 0.2)
}

const resetZoom = () => {
    zoomLevel.value = 1
    panX.value = 0
    panY.value = 0
}

const startPan = (event: MouseEvent) => {
    if (zoomLevel.value > 1) {
        isPanning.value = true
        lastMouseX.value = event.clientX
        lastMouseY.value = event.clientY
    }
}

const handlePan = (event: MouseEvent) => {
    if (isPanning.value && zoomLevel.value > 1) {
        const deltaX = event.clientX - lastMouseX.value
        const deltaY = event.clientY - lastMouseY.value

        panX.value += deltaX / zoomLevel.value
        panY.value += deltaY / zoomLevel.value

        lastMouseX.value = event.clientX
        lastMouseY.value = event.clientY
    }
}

const endPan = () => {
    isPanning.value = false
}
</script>

<style scoped>
/* .image-zoom-container {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    position: relative;
} */

/* .zoomable-image {
    width: 100% !important;
    height: 100% !important;
    cursor: grab;
    transition: transform 0.1s ease-out;
    transform-origin: center center;
} */

/* .zoomable-image:active {
    cursor: grabbing;
}

.zoom-controls {
    position: absolute;
    bottom: 20px;
    right: 20px;
    display: flex;
    gap: 8px;
    z-index: 3;
} */

.nav-button {
    transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
    cursor: pointer;
}

.nav-button:hover {
    opacity: 0.8;
    transform: scale(1.05);
}

.prev-button {
    position: absolute;
    top: 50%;
    left: 20px;
    transform: translateY(-50%);
}

.next-button {
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
}
</style>