import { ref } from 'vue'
import { defineStore } from 'pinia'
import { FilterPreset, OPERATION_RENDER_PIPELINE, OperationType } from '@/types'
import type {
  AdjustmentOperation,
  AdjustmentOperationType,
  CropOperation,
  FilterOperation,
  ImageOperation,
} from '@/types'

function sortOperationsByRenderOrder(ops: ImageOperation[]) {
  return [...ops].sort(
    (a, b) => OPERATION_RENDER_PIPELINE[a.type] - OPERATION_RENDER_PIPELINE[b.type],
  )
}

export const useImageStore = defineStore('image', () => {
  const originalImage = ref<string | null>(null)
  const originalFileName = ref<string | null>(null)
  const operations = ref<ImageOperation[]>([])
  const viewOriginal = ref(false)

  function loadImage(file: File) {
    return new Promise<void>((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        originalImage.value = reader.result as string
        originalFileName.value = file.name
        operations.value = []
        viewOriginal.value = false
        resolve()
      }
      reader.onerror = () => reject(reader.error)
      reader.readAsDataURL(file)
    })
  }

  function applyCrop(params: CropOperation['params']) {
    operations.value = sortOperationsByRenderOrder([
      ...operations.value.filter((op) => op.type !== OperationType.Crop),
      { type: OperationType.Crop, params },
    ])
    viewOriginal.value = false
  }

  function setAdjustment(type: AdjustmentOperationType, value: number) {
    const op = operations.value.find((o): o is AdjustmentOperation => o.type === type)
    if (value === 0) {
      operations.value = operations.value.filter((op) => op.type !== type)
      viewOriginal.value = false
      return
    }

    if (op) {
      op.params.value = value
    } else {
      operations.value = sortOperationsByRenderOrder([
        ...operations.value,
        { type, params: { value } },
      ])
    }
    viewOriginal.value = false
  }

  function setBrightness(value: number) {
    setAdjustment(OperationType.Brightness, value)
  }

  function setContrast(value: number) {
    setAdjustment(OperationType.Contrast, value)
  }

  function setSaturation(value: number) {
    setAdjustment(OperationType.Saturation, value)
  }

  function setFilters(presets: FilterPreset[]) {
    const filterPresets = presets.filter(
      (preset): preset is FilterOperation['params']['preset'] => preset !== FilterPreset.None,
    )
    operations.value = operations.value.filter((op) => op.type !== OperationType.Filter)
    if (filterPresets.length > 0) {
      operations.value = sortOperationsByRenderOrder([
        ...operations.value,
        ...filterPresets.map<FilterOperation>((preset) => ({
          type: OperationType.Filter,
          params: { preset },
        })),
      ])
    }
    viewOriginal.value = false
  }

  function resetEdits() {
    operations.value = []
    viewOriginal.value = false
  }

  function toggleViewOriginal() {
    viewOriginal.value = !viewOriginal.value
  }

  return {
    originalImage,
    originalFileName,
    operations,
    viewOriginal,
    loadImage,
    applyCrop,
    setBrightness,
    setContrast,
    setSaturation,
    setFilters,
    resetEdits,
    toggleViewOriginal,
  }
})
