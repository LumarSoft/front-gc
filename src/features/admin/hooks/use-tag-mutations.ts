'use client'

import { useAdminMutation } from '@/src/features/admin/hooks/use-admin-mutation'
import { QUERY_KEYS } from '@/src/lib/query-keys'
import { archiveTag, createTag, updateTag } from '@/src/services/admin-catalog.service'
import type { TagInput } from '@/src/types/api/admin-catalog'

const invalidate = [QUERY_KEYS.admin.tags]

export function useTagMutations() {
  return {
    create: useAdminMutation({
      mutationFn: (input: TagInput) => createTag(input),
      invalidate,
      successMessage: tag => `Creaste la etiqueta «${tag.name}».`,
    }),
    update: useAdminMutation({
      mutationFn: ({ id, input }: { id: number; input: Partial<TagInput> }) => updateTag(id, input),
      invalidate,
      successMessage: tag => `Guardaste «${tag.name}».`,
    }),
    archive: useAdminMutation({
      mutationFn: ({ id }: { id: number; name: string }) => archiveTag(id),
      invalidate,
      successMessage: (_, { name }) => `Archivaste «${name}» y la quitamos de sus productos.`,
    }),
  }
}
