'use client'

import { useAdminMutation } from '@/src/features/admin/hooks/use-admin-mutation'
import { QUERY_KEYS } from '@/src/lib/query-keys'
import { archiveBrand, createBrand, reorderBrands, updateBrand } from '@/src/services/admin-catalog.service'
import type { BrandInput } from '@/src/types/api/admin-catalog'

const invalidate = [QUERY_KEYS.admin.brands]

export function useBrandMutations() {
  return {
    create: useAdminMutation({
      mutationFn: (input: BrandInput) => createBrand(input),
      invalidate,
      successMessage: brand => `Creaste la marca «${brand.name}».`,
    }),
    update: useAdminMutation({
      mutationFn: ({ id, input }: { id: number; input: Partial<BrandInput> }) => updateBrand(id, input),
      invalidate,
      successMessage: brand => `Guardaste «${brand.name}».`,
    }),
    reorder: useAdminMutation({
      mutationFn: (ids: number[]) => reorderBrands(ids),
      invalidate,
      successMessage: 'Orden actualizado.',
    }),
    archive: useAdminMutation({
      mutationFn: ({ id }: { id: number; name: string }) => archiveBrand(id),
      invalidate,
      successMessage: (_, { name }) => `Archivaste «${name}».`,
    }),
  }
}
