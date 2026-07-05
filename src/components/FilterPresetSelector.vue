<script setup lang="ts">
import { FilterPreset } from '@/types'

defineProps<{
  modelValue: FilterPreset[]
  options: { label: string; value: FilterPreset; icon: string }[]
}>()

const emit = defineEmits<{
  'update:modelValue': [value: FilterPreset[]]
}>()

function isSelected(value: FilterPreset, selectedValues: FilterPreset[]) {
  return value === FilterPreset.None ? selectedValues.length === 0 : selectedValues.includes(value)
}

function toggleFilter(value: FilterPreset, selectedValues: FilterPreset[]) {
  if (value === FilterPreset.None) {
    emit('update:modelValue', [])
    return
  }

  emit(
    'update:modelValue',
    selectedValues.includes(value)
      ? selectedValues.filter((selectedValue) => selectedValue !== value)
      : [...selectedValues, value],
  )
}
</script>

<template>
  <div class="d-flex align-center ga-2 mt-4 mb-2">
    <v-icon icon="$filter" size="small" />
    <span class="text-body-2">Filter</span>
  </div>
  <div class="filter-options">
    <v-btn
      v-for="option in options"
      :key="option.value"
      :color="isSelected(option.value, modelValue) ? 'primary' : undefined"
      :prepend-icon="option.icon"
      :variant="isSelected(option.value, modelValue) ? 'flat' : 'outlined'"
      size="small"
      @click="toggleFilter(option.value, modelValue)"
    >
      {{ option.label }}
    </v-btn>
  </div>
</template>

<style scoped>
.filter-options {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

@media (max-width: 600px) {
  .filter-options .v-btn {
    flex: 1 1 100%;
    min-width: 0;
  }
}
</style>
