'use client'

import type { CategoryHandlers } from '@/src/features/admin/components/categories/category-row'
import { useCategoryMutations } from '@/src/features/admin/hooks/use-category-mutations'
import { moveId } from '@/src/features/admin/lib/reorder'
import type { AdminCategory } from '@/src/types/api/admin-catalog'

type UseCategoryHandlersOptions = {
  categories: AdminCategory[]
  edit: (category: AdminCategory) => void
  addChild: (parent: AdminCategory) => void
  askArchive: (category: AdminCategory) => void
}

/** Row actions of the category list, wired to the API. */
export function useCategoryHandlers({ categories, edit, addChild, askArchive }: UseCategoryHandlersOptions) {
  const mutations = useCategoryMutations()

  const siblingsOf = (category: AdminCategory): AdminCategory[] =>
    category.parentId === null
      ? categories
      : (categories.find(parent => parent.id === category.parentId)?.children ?? [])

  const handlers: CategoryHandlers = {
    edit,
    addChild,
    archive: askArchive,
    move: (category, direction) => {
      const ids = moveId(
        siblingsOf(category).map(sibling => sibling.id),
        category.id,
        direction,
      )
      if (ids) mutations.reorder.mutate(ids)
    },
    toggleActive: category => mutations.update.mutate({ id: category.id, input: { isActive: !category.isActive } }),
  }

  return { handlers, archive: (category: AdminCategory) => mutations.archive.mutate(category) }
}
