<script setup lang="ts">
import { ref } from 'vue'
import { useImageStore } from '@/stores/image'

const { loadImage } = useImageStore()
const file = ref<File | File[] | undefined>(undefined)

async function handleChange(value: File | File[]) {
  const picked = Array.isArray(value) ? value[0] : value
  if (picked) {
    await loadImage(picked)
  }
}
</script>

<template>
  <v-card variant="outlined" class="pa-4">
    <v-card-text>
      <v-file-input
        v-model="file"
        accept="image/*"
        label="Select an image"
        density="comfortable"
        show-size
        @update:model-value="handleChange"
      />
    </v-card-text>
  </v-card>
</template>
