import type { AdminCategory } from '@/src/types/api/admin-catalog'

export type CategoryOption = { id: number; label: string; isChild: boolean }

/** The category tree as a flat list for pickers: each category followed by its subcategories. */
export function categoryOptions(categories: AdminCategory[]): CategoryOption[] {
  return categories.flatMap(category => [
    { id: category.id, label: category.name, isChild: false },
    ...category.children.map(child => ({ id: child.id, label: child.name, isChild: true })),
  ])
}
