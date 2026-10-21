import { Breadcrumbs } from '@/src/components/ui/breadcrumbs'
import { SessionRefresh } from '@/src/features/auth/components/session-refresh'
import { CatalogEmptyState } from '@/src/features/catalog/components/catalog/catalog-empty-state'
import { CatalogFilters } from '@/src/features/catalog/components/catalog/catalog-filters'
import { CatalogPagination } from '@/src/features/catalog/components/catalog/catalog-pagination'
import { CatalogToolbar } from '@/src/features/catalog/components/catalog/catalog-toolbar'
import { CategoryChips } from '@/src/features/catalog/components/catalog/category-chips'
import { ProductGrid } from '@/src/features/catalog/components/product-grid'
import { buildCatalogHref, type CatalogParams } from '@/src/features/catalog/lib/catalog-params'
import { SearchEmptyState } from '@/src/features/search/components/search-empty-state'
import { SearchNotice } from '@/src/features/search/components/search-notice'
import { searchHref } from '@/src/features/search/lib/search-view'
import type { CategorySummary, NamedRef, PaginatedProducts, Tag } from '@/src/types/api/catalog'

type CatalogViewProps = {
  title: string
  description?: string | null
  breadcrumbs: NamedRef[]
  basePath: string
  params: CatalogParams
  result: PaginatedProducts
  sessionExpired: boolean
  categories: CategorySummary[]
  activeCategorySlug?: string
  useTags: Tag[]
  /** Shown instead of the generic empty state when the page has no products and no filters are active. */
  emptyState?: React.ReactNode
}

/** Product listing page: header, category chips, filters, toolbar, grid and pagination. */
export function CatalogView({
  title,
  description,
  breadcrumbs,
  basePath,
  params,
  result,
  sessionExpired,
  categories,
  activeCategorySlug,
  useTags,
  emptyState,
}: CatalogViewProps) {
  const filters = (
    <CatalogFilters
      basePath={basePath}
      params={params}
      categories={categories}
      activeCategorySlug={activeCategorySlug}
      useTags={useTags}
    />
  )
  // Outside the full catalog a search only covers this page's products: offer the same search everywhere.
  const wholeStoreHref = params.q && basePath !== '/productos' ? searchHref(params.q) : undefined

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
      <SessionRefresh when={sessionExpired} />
      <Breadcrumbs items={breadcrumbs.map(crumb => ({ label: crumb.name, href: `/categorias/${crumb.slug}` }))} />

      <header className="mt-4 max-w-3xl">
        <h1 className="text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">{title}</h1>
        {description && <p className="mt-3 text-muted-foreground">{description}</p>}
      </header>

      <div className="mt-6">
        <CategoryChips categories={categories} activeSlug={activeCategorySlug} />
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-4 xl:grid-cols-5">
        <aside className="hidden lg:block" aria-label="Filtros">
          {filters}
        </aside>

        <div className="lg:col-span-3 xl:col-span-4">
          {params.q && result.items.length > 0 && (
            <SearchNotice query={params.q} search={result.search} wholeStoreHref={wholeStoreHref} />
          )}
          <CatalogToolbar basePath={basePath} params={params} total={result.total} filters={filters} />
          <div className="mt-6">
            {result.items.length > 0 ? (
              <ProductGrid products={result.items} eagerCount={4} />
            ) : params.tag.length > 0 ? (
              <CatalogEmptyState clearFiltersHref={buildCatalogHref(basePath, params, { tag: [] })} />
            ) : params.q && result.total === 0 ? (
              <SearchEmptyState query={params.q} wholeStoreHref={wholeStoreHref} />
            ) : (
              (emptyState ?? <CatalogEmptyState />)
            )}
          </div>
          <CatalogPagination basePath={basePath} params={params} totalPages={result.totalPages} />
        </div>
      </div>
    </div>
  )
}
