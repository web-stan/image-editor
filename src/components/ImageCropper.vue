<script setup lang="ts">
import { useImageCropper } from '@/composables/useImageCropper'

defineProps<{ fileName?: string | null }>()

const { applyCrop, originalImage } = useImageCropper()
</script>

<template>
  <v-card v-if="originalImage" variant="outlined" class="pa-4">
    <v-card-title class="text-subtitle-1">Crop{{ fileName ? ` — ${fileName}` : '' }}</v-card-title>
    <v-card-text>
      <div ref="containerEl" class="cropper-container">
        <img ref="imageEl" :src="originalImage" style="max-width: 100%; display: block" />
      </div>
      <v-btn class="mt-4" color="primary" @click="applyCrop">Apply Crop</v-btn>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.cropper-container {
  width: 100%;
  aspect-ratio: 16 / 9;
}

.cropper-container :deep(cropper-canvas) {
  width: 100%;
  height: 100%;
}
</style>
