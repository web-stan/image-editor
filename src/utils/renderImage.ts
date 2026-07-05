import { FilterPreset, OperationType } from '@/types'
import type { CropOperation, ImageOperation } from '@/types'

export function operationsToRenderFacade(ops: ImageOperation[]) {
  const crop = ops.find((op) => op.type === OperationType.Crop)
  const filters = ops
    .map((op) => {
      if (op.type === OperationType.Brightness) return `brightness(${1 + op.params.value / 100})`
      if (op.type === OperationType.Contrast) return `contrast(${1 + op.params.value / 100})`
      if (op.type === OperationType.Saturation) return `saturate(${1 + op.params.value / 100})`
      if (op.type === OperationType.Filter) {
        if (op.params.preset === FilterPreset.Grayscale) return 'grayscale(1)'
        if (op.params.preset === FilterPreset.Sepia) return 'sepia(1)'
      }
      return null
    })
    .filter((filter): filter is string => filter !== null)

  return {
    crop,
    filter: filters.length > 0 ? filters.join(' ') : FilterPreset.None,
  }
}

export function renderImage(
  canvas: HTMLCanvasElement,
  img: HTMLImageElement,
  crop: CropOperation | undefined,
  filter: string,
) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const sourceX = crop?.params.x ?? 0
  const sourceY = crop?.params.y ?? 0
  const sourceWidth = crop?.params.width ?? img.naturalWidth
  const sourceHeight = crop?.params.height ?? img.naturalHeight

  canvas.width = sourceWidth
  canvas.height = sourceHeight
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.filter = filter
  ctx.drawImage(img, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, sourceWidth, sourceHeight)
}
