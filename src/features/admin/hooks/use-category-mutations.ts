'use client'

import { useAdminMutation } from '@/src/features/admin/hooks/use-admin-mutation'
import { QUERY_KEYS } from '@/src/lib/query-keys'
import {
  archiveCategory,
  createCategory,
  reorderCategories,
  updateCategory,
} from '@/src/services/admin-catalog.service'
import type { CategoryInput } from '@/src/types/api/admin-catalog'

const invalidate = [QUERY_KEYS.admin.categories]

export function useCategoryMutations() {
  return {
    create: useAdminMutation({
      mutationFn: (input: CategoryInput) => createCategory(input),
      invalidate,
      successMessage: category => `Creaste «${category.name}».`,
    }),
    update: useAdminMutation({
      mutationFn: ({ id, input }: { id: number; input: Partial<CategoryInput> }) => updateCategory(id, input),
      invalidate,
      successMessage: category => `Guardaste «${category.name}».`,
    }),
    reorder: useAdminMutation({
      mutationFn: (ids: number[]) => reorderCategories(ids),
      invalidate,
      successMessage: 'Orden actualizado.',
    }),
    archive: useAdminMutation({
      mutationFn: ({ id }: { id: number; name: string }) => archiveCategory(id),
      invalidate,
      successMessage: (_, { name }) => `Archivaste «${name}».`,
    }),
  }
}
