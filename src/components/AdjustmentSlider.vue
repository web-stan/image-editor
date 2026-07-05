<script setup lang="ts">
withDefaults(
  defineProps<{
    label: string
    icon: string
    modelValue: number
    min?: number
    max?: number
    step?: number
    resetValue?: number
  }>(),
  {
    min: -100,
    max: 100,
    step: 1,
    resetValue: 0,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

function updateValue(value: number | string) {
  emit('update:modelValue', Number(value))
}
</script>

<template>
  <div class="adjustment-slider-header d-flex align-center ga-2 mb-1">
    <v-icon :icon="icon" size="small" />
    <span class="text-body-2">{{ label }}</span>
    <v-spacer />
    <span class="text-caption text-medium-emphasis">{{ modelValue }}</span>
  </div>
  <v-slider
    :model-value="modelValue"
    :min="min"
    :max="max"
    :step="step"
    color="primary"
    track-color="grey-lighten-1"
    thumb-label
    hide-details
    @update:model-value="updateValue"
  >
    <template #append>
      <v-btn
        icon="$restore"
        size="small"
        variant="text"
        density="comfortable"
        :disabled="modelValue === resetValue"
        @click="emit('update:modelValue', resetValue)"
      />
    </template>
  </v-slider>
</template>

<style scoped>
.adjustment-slider-header {
  margin-top: 16px;
}

.adjustment-slider-header:first-child {
  margin-top: 0;
}
</style>
