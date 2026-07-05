import { FilterPreset, OperationType } from './enums'

export interface CropOperation {
  type: OperationType.Crop
  params: {
    x: number
    y: number
    width: number
    height: number
    sourceWidth: number
    sourceHeight: number
  }
}

export interface BrightnessOperation {
  type: OperationType.Brightness
  params: { value: number }
}

export interface ContrastOperation {
  type: OperationType.Contrast
  params: { value: number }
}

export interface SaturationOperation {
  type: OperationType.Saturation
  params: { value: number }
}

export interface FilterOperation {
  type: OperationType.Filter
  params: { preset: Exclude<FilterPreset, FilterPreset.None> }
}

export type ImageOperation =
  | CropOperation
  | BrightnessOperation
  | ContrastOperation
  | SaturationOperation
  | FilterOperation

export type AdjustmentOperation = BrightnessOperation | ContrastOperation | SaturationOperation
export type AdjustmentOperationType = AdjustmentOperation['type']
