import { nextTick, onBeforeUnmount, onMounted, useTemplateRef, watch } from 'vue'
import Cropper from 'cropperjs'
import { storeToRefs } from 'pinia'
import { useImageStore } from '@/stores/image'
import { toOriginalCrop } from '@/utils/cropCoordinates'

export function useImageCropper() {
  const imageStore = useImageStore()
  const { originalImage, operations } = storeToRefs(imageStore)
  const { applyCrop: applyCropToStore } = imageStore

  const imageEl = useTemplateRef<HTMLImageElement>('imageEl')
  const containerEl = useTemplateRef<HTMLDivElement>('containerEl')
  let cropper: Cropper | null = null

  function destroyCropper() {
    cropper?.destroy()
    cropper = null
  }

  function initCropper() {
    destroyCropper()
    if (imageEl.value && containerEl.value) {
      cropper = new Cropper(imageEl.value, {
        container: containerEl.value,
      })
    }
  }

  function applyCrop() {
    const selection = cropper?.getCropperSelection()
    const cropperCanvas = cropper?.getCropperCanvas()
    const cropperImage = cropper?.getCropperImage()
    if (!selection || !cropperCanvas || !cropperImage || !imageEl.value) return

    const crop = toOriginalCrop({
      selection,
      canvasRect: cropperCanvas.getBoundingClientRect(),
      imageRect: cropperImage.getBoundingClientRect(),
      naturalWidth: imageEl.value.naturalWidth,
      naturalHeight: imageEl.value.naturalHeight,
    })
    if (!crop) return

    applyCropToStore(crop)
  }

  onMounted(async () => {
    await nextTick()
    initCropper()
  })

  watch(originalImage, async () => {
    await nextTick()
    initCropper()
  })

  watch(
    () => operations.value.length,
    (length, previousLength) => {
      if (length === 0 && previousLength > 0) {
        cropper?.getCropperSelection()?.$reset()
      }
    },
  )

  onBeforeUnmount(destroyCropper)

  return {
    applyCrop,
    originalImage,
  }
}
