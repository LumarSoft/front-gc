import Link from 'next/link'
import { cn } from '@/src/lib/utils'
import type { CategorySummary } from '@/src/types/api/catalog'

type CategoryChipsProps = {
  categories: CategorySummary[]
  activeSlug?: string
}

/** Phones: categories as swipeable chips, always in sight (the desktop sidebar is hidden). */
export function CategoryChips({ categories, activeSlug }: CategoryChipsProps) {
  if (categories.length === 0) return null

  return (
    <ul className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 lg:hidden">
      {categories.map(category => (
        <li key={category.slug} className="shrink-0">
          <Link
            href={`/categorias/${category.slug}`}
            aria-current={category.slug === activeSlug ? 'page' : undefined}
            className={cn(
              'inline-flex rounded-full border px-4 py-2 text-sm font-medium',
              category.slug === activeSlug && 'border-foreground bg-foreground font-semibold text-background',
            )}
          >
            {category.name}
          </Link>
        </li>
      ))}
    </ul>
  )
}
