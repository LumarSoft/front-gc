import { PRODUCT_ISSUE_LABELS } from '@/src/features/admin/lib/product-labels'
import type { BulkProductAction, BulkProductsResult } from '@/src/types/api/admin-products'

const DONE: Record<BulkProductAction, [one: string, many: string]> = {
  PUBLISH: ['producto publicado', 'productos publicados'],
  HIDE: ['producto oculto', 'productos ocultos'],
  DRAFT: ['producto pasado a borrador', 'productos pasados a borrador'],
  ARCHIVE: ['producto archivado', 'productos archivados'],
}

const count = (n: number, [one, many]: [string, string]): string => `${n} ${n === 1 ? one : many}`

/** Toast after a bulk action: what changed, plus why some products were left as they were. */
export function bulkResultMessages(action: BulkProductAction, result: BulkProductsResult) {
  const changed = result.updated.length + result.unchanged.length
  const blocked = result.skipped.filter(skip => skip.reason === 'CANNOT_PUBLISH')
  const missing = result.skipped.length - blocked.length
  const reasons = [...new Set(blocked.flatMap(skip => skip.issues ?? []))].map(issue =>
    PRODUCT_ISSUE_LABELS[issue].toLowerCase(),
  )
  const warnings = [
    blocked.length > 0 &&
      `${count(blocked.length, ['no se publicó', 'no se publicaron'])}: ${reasons.join(' o ')}. Completalos desde su ficha.`,
    missing > 0 && `${count(missing, ['ya no existe', 'ya no existen'])} (otra persona lo archivó).`,
  ].filter((warning): warning is string => Boolean(warning))

  return { success: changed > 0 ? count(changed, DONE[action]) : null, warning: warnings.join(' ') || null }
}
