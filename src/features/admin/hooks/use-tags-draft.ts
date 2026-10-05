'use client'

import { useState } from 'react'
import { useProductMutations } from '@/src/features/admin/hooks/use-product-mutations'
import type { AdminProduct } from '@/src/types/api/admin-products'

const idsOf = (product: AdminProduct): number[] => product.tags.map(tag => tag.id).sort((a, b) => a - b)

/** Selected tag ids, saved as a whole. */
export function useTagsDraft(product: AdminProduct) {
  const { replaceTags } = useProductMutations(product.id)
  const saved = idsOf(product)
  const [selected, setSelected] = useState<number[]>(saved)
  const [savedTags, setSavedTags] = useState(product.tags)
  if (savedTags !== product.tags) {
    setSavedTags(product.tags)
    setSelected(saved)
  }

  return {
    selected,
    toggle: (id: number) =>
      setSelected(current =>
        current.includes(id) ? current.filter(item => item !== id) : [...current, id].sort((a, b) => a - b),
      ),
    dirty: JSON.stringify(selected) !== JSON.stringify(saved),
    pending: replaceTags.isPending,
    save: () => replaceTags.mutate(selected),
    discard: () => setSelected(saved),
  }
}
