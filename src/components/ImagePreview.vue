<script setup lang="ts">
import { useOperationExport } from "@/composables/useOperationExport";
import { useImagePreview } from "@/composables/useImagePreview";

const {
  downloadImage,
  hasOperations,
  originalImage,
  resetEdits,
  toggleViewOriginal,
  viewOriginal,
} = useImagePreview();
const { downloadOperationsJson } = useOperationExport();
</script>

<template>
  <v-card v-if="originalImage" variant="outlined" class="pa-4">
    <v-card-title class="text-subtitle-1">Preview</v-card-title>
    <v-card-text>
      <div class="preview-container">
        <canvas ref="canvasEl" />
      </div>
      <div class="preview-actions mt-4">
        <div class="preview-actions__group">
          <v-btn v-if="hasOperations" variant="outlined" @click="resetEdits()">
            Reset
          </v-btn>
          <v-btn
            :color="viewOriginal ? 'primary' : undefined"
            variant="outlined"
            :disabled="!hasOperations"
            @click="toggleViewOriginal()"
          >
            View Original
          </v-btn>
        </div>
        <div class="preview-actions__group preview-actions__group--end">
          <v-btn
            v-if="hasOperations"
            variant="outlined"
            prepend-icon="$download"
            @click="downloadOperationsJson()"
          >
            Operations JSON
          </v-btn>
          <v-btn
            v-if="hasOperations"
            color="primary"
            variant="flat"
            prepend-icon="$download"
            @click="downloadImage()"
          >
            Download
          </v-btn>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.preview-container {
  width: 100%;
  aspect-ratio: 16 / 9;
}

.preview-container canvas {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: contain;
}

.preview-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: space-between;
}

.preview-actions__group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.preview-actions__group--end {
  justify-content: flex-end;
}

@media (max-width: 600px) {
  .preview-actions,
  .preview-actions__group {
    width: 100%;
  }

  .preview-actions__group .v-btn {
    flex: 1 1 100%;
    min-width: 0;
  }
}
</style>
