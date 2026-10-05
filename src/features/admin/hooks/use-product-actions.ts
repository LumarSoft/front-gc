'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useProductMutations } from '@/src/features/admin/hooks/use-product-mutations'

/** Duplicate (and open the copy) and archive (with confirmation, then back to the list). */
export function useProductActions(productId: number) {
  const router = useRouter()
  const { duplicate, archive } = useProductMutations(productId)
  const [confirmingArchive, setConfirmingArchive] = useState(false)

  return {
    duplicate: () => duplicate.mutate(undefined, { onSuccess: copy => router.push(`/admin/productos/${copy.id}`) }),
    isDuplicating: duplicate.isPending,
    confirmingArchive,
    askArchive: () => setConfirmingArchive(true),
    cancelArchive: () => setConfirmingArchive(false),
    archive: () => archive.mutate(undefined, { onSuccess: () => router.push('/admin/productos') }),
  }
}
