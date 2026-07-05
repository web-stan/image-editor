<script setup lang="ts">
import { onErrorCaptured } from 'vue'
import { storeToRefs } from 'pinia'
import { useImageStore } from '@/stores/image'

const imageStore = useImageStore()
const { originalImage, originalFileName } = storeToRefs(imageStore)

onErrorCaptured((error) => {
  console.error(error)
})
</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <h1 class="text-h5 mb-4">Image Editor - Upload</h1>
        <v-row>
          <v-col cols="12">
            <ImageUploadDropzone />
          </v-col>
        </v-row>

        <v-row v-if="originalImage">
          <v-fade-transition appear>
            <v-col cols="12" class="editor-panel editor-panel--cropper">
              <ImageCropper :file-name="originalFileName" />
            </v-col>
          </v-fade-transition>
          <v-fade-transition appear>
            <v-col cols="12" class="editor-panel editor-panel--adjustments">
              <ImageAdjustments />
            </v-col>
          </v-fade-transition>
          <v-fade-transition appear>
            <v-col cols="12" class="editor-panel editor-panel--preview">
              <ImagePreview />
            </v-col>
          </v-fade-transition>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
