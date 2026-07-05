<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useImageStore } from '@/stores/image'
import { FilterPreset, OperationType } from '@/types'

const imageStore = useImageStore()
const { operations } = storeToRefs(imageStore)
const { setBrightness, setContrast, setSaturation, setFilters } = imageStore

const filterOptions: { label: string; value: FilterPreset; icon: string }[] = [
  { label: 'None', value: FilterPreset.None, icon: '$image' },
  { label: 'Grayscale', value: FilterPreset.Grayscale, icon: '$grayscale' },
  { label: 'Sepia', value: FilterPreset.Sepia, icon: '$sepia' },
]

const brightness = computed({
  get: () => operations.value.find((op) => op.type === OperationType.Brightness)?.params.value ?? 0,
  set: (value: number) => setBrightness(value),
})

const contrast = computed({
  get: () => operations.value.find((op) => op.type === OperationType.Contrast)?.params.value ?? 0,
  set: (value: number) => setContrast(value),
})

const saturation = computed({
  get: () => operations.value.find((op) => op.type === OperationType.Saturation)?.params.value ?? 0,
  set: (value: number) => setSaturation(value),
})

const filterPresets = computed<FilterPreset[]>({
  get: () =>
    operations.value.filter((op) => op.type === OperationType.Filter).map((op) => op.params.preset),
  set: (presets) => setFilters(presets),
})

const adjustmentSliders = [
  { label: 'Brightness', icon: '$brightness', model: brightness },
  { label: 'Contrast', icon: '$contrast', model: contrast },
  { label: 'Saturation', icon: '$palette', model: saturation },
]
</script>

<template>
  <v-card variant="outlined" class="pa-4">
    <v-card-title class="text-subtitle-1">Adjustments</v-card-title>
    <v-card-text>
      <AdjustmentSlider
        v-for="adjustment in adjustmentSliders"
        :key="adjustment.label"
        :model-value="adjustment.model.value"
        :label="adjustment.label"
        :icon="adjustment.icon"
        @update:model-value="adjustment.model.value = $event"
      />

      <FilterPresetSelector v-model="filterPresets" :options="filterOptions" />
    </v-card-text>
  </v-card>
</template>
