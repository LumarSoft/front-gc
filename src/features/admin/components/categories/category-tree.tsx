import { CategoryRow, type CategoryHandlers } from '@/src/features/admin/components/categories/category-row'
import type { AdminCategory } from '@/src/types/api/admin-catalog'

type CategoryTreeProps = {
  categories: AdminCategory[]
  handlers: CategoryHandlers
}

/** Top-level categories with their subcategories indented under a guide line. */
export function CategoryTree({ categories, handlers }: CategoryTreeProps) {
  return (
    <ul className="divide-y">
      {categories.map((category, index) => (
        <li key={category.id}>
          <ul>
            <CategoryRow category={category} index={index} siblingCount={categories.length} handlers={handlers} />
          </ul>
          {category.children.length > 0 && (
            <ul aria-label={`Subcategorías de ${category.name}`} className="ml-9 border-l pb-1 sm:ml-12">
              {category.children.map((child, childIndex) => (
                <CategoryRow
                  key={child.id}
                  category={child}
                  index={childIndex}
                  siblingCount={category.children.length}
                  handlers={handlers}
                />
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  )
}
