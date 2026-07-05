export enum OperationType {
  Crop = 'crop',
  Brightness = 'brightness',
  Contrast = 'contrast',
  Saturation = 'saturation',
  Filter = 'filter',
}

export enum FilterPreset {
  None = 'none',
  Grayscale = 'grayscale',
  Sepia = 'sepia',
}

export enum OperationRenderOrder {
  Crop = 1,
  Brightness = 2,
  Contrast = 3,
  Saturation = 4,
  Filter = 5,
}

export const OPERATION_RENDER_PIPELINE: Record<OperationType, OperationRenderOrder> = {
  [OperationType.Crop]: OperationRenderOrder.Crop,
  [OperationType.Brightness]: OperationRenderOrder.Brightness,
  [OperationType.Contrast]: OperationRenderOrder.Contrast,
  [OperationType.Saturation]: OperationRenderOrder.Saturation,
  [OperationType.Filter]: OperationRenderOrder.Filter,
}
