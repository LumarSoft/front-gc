'use client'

import { useQueryClient } from '@tanstack/react-query'
import { useAdminMutation } from '@/src/features/admin/hooks/use-admin-mutation'
import { QUERY_KEYS } from '@/src/lib/query-keys'
import {
  adjustVariantStock,
  archiveVariant,
  createVariant,
  replaceVariantPrices,
  setDefaultVariant,
  updateVariant,
} from '@/src/services/admin-variants.service'
import type { AdminProduct, StockInput, VariantInput, VariantPriceInput } from '@/src/types/api/admin-products'

const invalidate = [QUERY_KEYS.admin.productLists]

/** Every change to the variants of one product. Each answer is the updated product, stored in the editor's cache. */
export function useVariantMutations(productId: number) {
  const queryClient = useQueryClient()
  const store = (product: AdminProduct): void => {
    queryClient.setQueryData(QUERY_KEYS.admin.product(product.id), product)
  }
  const saved = { invalidate, onSuccess: store }

  return {
    create: useAdminMutation({
      mutationFn: (input: VariantInput & { sku: string }) => createVariant(productId, input),
      successMessage: (_, input) => `Agregaste la variante ${input.sku}.`,
      ...saved,
    }),
    update: useAdminMutation({
      mutationFn: ({ variantId, input }: { variantId: number; input: VariantInput }) =>
        updateVariant(productId, variantId, input),
      successMessage: 'Variante guardada.',
      ...saved,
    }),
    setDefault: useAdminMutation({
      mutationFn: (variantId: number) => setDefaultVariant(productId, variantId),
      successMessage: 'Variante principal actualizada.',
      ...saved,
    }),
    archive: useAdminMutation({
      mutationFn: (variantId: number) => archiveVariant(productId, variantId),
      successMessage: 'Variante archivada.',
      ...saved,
    }),
    replacePrices: useAdminMutation({
      mutationFn: ({ variantId, prices }: { variantId: number; prices: VariantPriceInput[] }) =>
        replaceVariantPrices(productId, variantId, prices),
      successMessage: 'Precios guardados.',
      ...saved,
    }),
    adjustStock: useAdminMutation({
      mutationFn: ({ variantId, input }: { variantId: number; input: StockInput }) =>
        adjustVariantStock(productId, variantId, input),
      successMessage: 'Stock actualizado.',
      ...saved,
    }),
  }
}
