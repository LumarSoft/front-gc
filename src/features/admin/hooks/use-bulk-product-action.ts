'use client'

import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { adminErrorMessage } from '@/src/features/admin/lib/admin-error-message'
import { bulkResultMessages } from '@/src/features/admin/lib/bulk-product-messages'
import { QUERY_KEYS } from '@/src/lib/query-keys'
import { bulkUpdateProducts } from '@/src/services/admin-products.service'
import type { BulkProductAction } from '@/src/types/api/admin-products'

/** Runs a bulk action on the selected products. Archiving asks first; the rest are reversible and run at once. */
export function useBulkProductAction(selectedIds: number[], onDone: () => void) {
  const queryClient = useQueryClient()
  const [confirmingArchive, setConfirmingArchive] = useState(false)
  const mutation = useMutation({
    mutationFn: (action: BulkProductAction) => bulkUpdateProducts(selectedIds, action),
    onSuccess: async (result, action) => {
      const { success, warning } = bulkResultMessages(action, result)
      if (success) toast.success(success)
      if (warning) toast.warning(warning, { duration: 8000 })
      setConfirmingArchive(false)
      onDone()
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.admin.productLists })
    },
    onError: error => toast.error(adminErrorMessage(error)),
  })

  return {
    pending: mutation.isPending,
    run: (action: BulkProductAction): void =>
      action === 'ARCHIVE' ? setConfirmingArchive(true) : mutation.mutate(action),
    confirmingArchive,
    setConfirmingArchive,
    archive: (): void => mutation.mutate('ARCHIVE'),
  }
}
