import type { CropOperation } from '@/types'

type CropSelection = Pick<CropOperation['params'], 'x' | 'y' | 'width' | 'height'>

function isPositiveFinite(value: number) {
  return Number.isFinite(value) && value > 0
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

export function toOriginalCrop(params: {
  selection: CropSelection
  canvasRect: DOMRect
  imageRect: DOMRect
  naturalWidth: number
  naturalHeight: number
}): CropOperation['params'] | null {
  const { selection, canvasRect, imageRect, naturalWidth, naturalHeight } = params

  if (
    !isPositiveFinite(imageRect.width) ||
    !isPositiveFinite(imageRect.height) ||
    !isPositiveFinite(naturalWidth) ||
    !isPositiveFinite(naturalHeight)
  ) {
    return null
  }

  const scaleX = naturalWidth / imageRect.width
  const scaleY = naturalHeight / imageRect.height
  const imageOffsetX = imageRect.left - canvasRect.left
  const imageOffsetY = imageRect.top - canvasRect.top

  const x = clamp((selection.x - imageOffsetX) * scaleX, 0, naturalWidth)
  const y = clamp((selection.y - imageOffsetY) * scaleY, 0, naturalHeight)
  const right = clamp((selection.x + selection.width - imageOffsetX) * scaleX, 0, naturalWidth)
  const bottom = clamp((selection.y + selection.height - imageOffsetY) * scaleY, 0, naturalHeight)
  const width = right - x
  const height = bottom - y

  if (!isPositiveFinite(width) || !isPositiveFinite(height)) return null

  return {
    x,
    y,
    width,
    height,
    sourceWidth: naturalWidth,
    sourceHeight: naturalHeight,
  }
}
