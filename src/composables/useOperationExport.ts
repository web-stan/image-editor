import { storeToRefs } from 'pinia'
import { useImageStore } from '@/stores/image'
import { OPERATION_RENDER_PIPELINE } from '@/types'

function operationsFileName(fileName: string | null) {
  const baseName = fileName?.replace(/\.[^/.]+$/, '') || 'image'
  return `${baseName}.operations.json`
}

export function useOperationExport() {
  const imageStore = useImageStore()
  const { operations, originalFileName } = storeToRefs(imageStore)

  function downloadOperationsJson() {
    const exportedOperations = operations.value
    if (exportedOperations.length === 0) return

    const payload = {
      version: 1,
      source: {
        fileName: originalFileName.value,
      },
      pipeline: OPERATION_RENDER_PIPELINE,
      operations: exportedOperations,
    }

    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')

    link.href = url
    link.download = operationsFileName(originalFileName.value)
    link.click()
    URL.revokeObjectURL(url)
  }

  return {
    downloadOperationsJson,
  }
}
