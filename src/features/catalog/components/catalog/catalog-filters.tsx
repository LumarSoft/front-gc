import Link from 'next/link'
import { CheckIcon } from '@phosphor-icons/react/dist/ssr'
import { buildCatalogHref, toggleTag, type CatalogParams } from '@/src/features/catalog/lib/catalog-params'
import { cn } from '@/src/lib/utils'
import type { CategorySummary, Tag } from '@/src/types/api/catalog'

type CatalogFiltersProps = {
  basePath: string
  params: CatalogParams
  /** Categories to browse into (subcategories, or every category on the all-products page). */
  categories: CategorySummary[]
  activeCategorySlug?: string
  /** "Uso" filters, from the API. The section is hidden when there are none. */
  useTags: Tag[]
}

/** Filters are plain links: they work without JavaScript and every result page has its own URL. */
export function CatalogFilters({ basePath, params, categories, activeCategorySlug, useTags }: CatalogFiltersProps) {
  return (
    <div className="flex flex-col gap-8">
      {categories.length > 0 && (
        <section>
          <h2 className="text-sm font-bold">Categorías</h2>
          <ul className="mt-3 flex flex-col gap-1">
            {categories.map(category => (
              <li key={category.slug}>
                <Link
                  href={`/categorias/${category.slug}`}
                  aria-current={category.slug === activeCategorySlug ? 'page' : undefined}
                  className={cn(
                    'block rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted',
                    category.slug === activeCategorySlug && 'bg-accent font-semibold text-primary',
                  )}
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {useTags.length > 0 && (
        <section>
          <h2 className="text-sm font-bold">Uso</h2>
          <ul className="mt-3 flex flex-col gap-1">
            {useTags.map(filter => {
              const isActive = params.tag.includes(filter.slug)
              return (
                <li key={filter.slug}>
                  <Link
                    href={buildCatalogHref(basePath, params, { tag: toggleTag(params.tag, filter.slug) })}
                    aria-pressed={isActive}
                    scroll={false}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted"
                  >
                    <span
                      aria-hidden
                      className={cn(
                        'grid size-5 place-items-center rounded-md border',
                        isActive && 'border-primary bg-primary text-primary-foreground',
                      )}
                    >
                      {isActive && <CheckIcon weight="bold" className="size-3.5" />}
                    </span>
                    {filter.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </section>
      )}
    </div>
  )
}
