import { computed, useTemplateRef, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import { useImageStore } from '@/stores/image'
import { operationsToRenderFacade, renderImage } from '@/utils/renderImage'

export function useImagePreview() {
  const imageStore = useImageStore()
  const { originalFileName, originalImage, operations, viewOriginal } = storeToRefs(imageStore)
  const { resetEdits, toggleViewOriginal } = imageStore

  const canvasEl = useTemplateRef<HTMLCanvasElement>('canvasEl')

  const hasOperations = computed(() => operations.value.length > 0)

  function downloadImage() {
    const src = originalImage.value
    if (!src) return

    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const plan = operationsToRenderFacade(operations.value)
      renderImage(canvas, img, plan.crop, plan.filter)
      const url = canvas.toDataURL()
      const extension = url.match(/^data:image\/([^;]+)/)?.[1] ?? 'png'

      const link = document.createElement('a')
      link.href = url
      link.download = (originalFileName.value ?? 'image.png').replace(/\.[^/.]+$/, `.${extension}`)
      link.click()
    }
    img.src = src
  }

  watchEffect((onCleanup) => {
    const canvas = canvasEl.value
    const src = originalImage.value
    if (!canvas || !src) return

    const plan = operationsToRenderFacade(viewOriginal.value ? [] : operations.value)
    let isStale = false
    const img = new Image()
    img.onload = () => {
      if (isStale) return
      renderImage(canvas, img, plan.crop, plan.filter)
    }
    onCleanup(() => {
      isStale = true
      img.onload = null
    })
    img.src = src
  })

  return {
    downloadImage,
    hasOperations,
    originalImage,
    resetEdits,
    toggleViewOriginal,
    viewOriginal,
  }
}
