'use client'

import { useState } from 'react'
import { useVariantMutations } from '@/src/features/admin/hooks/use-variant-mutations'
import type { AdminProduct, AdminVariant } from '@/src/types/api/admin-products'

/** Which variant is open in the side panel, the add dialog and the archive confirmation. */
export function useVariantsCard(product: AdminProduct) {
  const { setDefault, archive } = useVariantMutations(product.id)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [adding, setAdding] = useState(false)
  const [archiving, setArchiving] = useState<AdminVariant | null>(null)

  return {
    // Always read from the product, so the panel shows the saved data after every change.
    editing: product.variants.find(variant => variant.id === editingId) ?? null,
    edit: (variant: AdminVariant) => setEditingId(variant.id),
    closeEditor: () => setEditingId(null),
    adding,
    setAdding,
    archiving,
    askArchive: setArchiving,
    cancelArchive: () => setArchiving(null),
    confirmArchive: () => archiving && archive.mutate(archiving.id),
    makeDefault: (variant: AdminVariant) => setDefault.mutate(variant.id),
  }
}
