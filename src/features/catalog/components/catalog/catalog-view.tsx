import Link from 'next/link'
import { MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr'
import { Button } from '@/src/components/ui/button'
import { SessionRefresh } from '@/src/features/auth/components/session-refresh'
import { CatalogFilters } from '@/src/features/catalog/components/catalog/catalog-filters'
import { CatalogPagination } from '@/src/features/catalog/components/catalog/catalog-pagination'
import { MobileFilters } from '@/src/features/catalog/components/catalog/mobile-filters'
import { SortSelect } from '@/src/features/catalog/components/catalog/sort-select'
import { ProductCard } from '@/src/features/catalog/components/product-card'
import { buildCatalogHref, SORT_OPTIONS, type CatalogParams } from '@/src/features/catalog/lib/catalog-params'
import { cn } from '@/src/lib/utils'
import type { CategorySummary, NamedRef, PaginatedProducts, ProductSort } from '@/src/types/api/catalog'

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
}

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
}: CatalogViewProps) {
  const sortHrefs = Object.fromEntries(
    SORT_OPTIONS.map(option => [option.value, buildCatalogHref(basePath, params, { sort: option.value })]),
  ) as Record<ProductSort, string>
  const filters = (
    <CatalogFilters
      basePath={basePath}
      params={params}
      categories={categories}
      activeCategorySlug={activeCategorySlug}
    />
  )
  const hasFilters = params.tag.length > 0 || Boolean(params.q)

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
      <SessionRefresh when={sessionExpired} />

      <nav aria-label="Ruta de navegación" className="text-sm text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="hover:text-foreground">
              Inicio
            </Link>
          </li>
          {breadcrumbs.map(crumb => (
            <li key={crumb.slug} className="flex items-center gap-1.5">
              <span aria-hidden>/</span>
              <Link href={`/categorias/${crumb.slug}`} className="hover:text-foreground">
                {crumb.name}
              </Link>
            </li>
          ))}
        </ol>
      </nav>

      <header className="mt-4 max-w-3xl">
        <h1 className="text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">{title}</h1>
        {description && <p className="mt-3 text-muted-foreground">{description}</p>}
      </header>

      {categories.length > 0 && (
        // Phones: categories as swipeable chips, always in sight (the sidebar is hidden).
        <ul className="no-scrollbar -mx-4 mt-6 flex gap-2 overflow-x-auto px-4 lg:hidden">
          {categories.map(category => (
            <li key={category.slug} className="shrink-0">
              <Link
                href={`/categorias/${category.slug}`}
                aria-current={category.slug === activeCategorySlug ? 'page' : undefined}
                className={cn(
                  'inline-flex rounded-full border px-4 py-2 text-sm font-medium',
                  category.slug === activeCategorySlug &&
                    'border-foreground bg-foreground font-semibold text-background',
                )}
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-8 grid gap-10 lg:grid-cols-4 xl:grid-cols-5">
        <aside className="hidden lg:block" aria-label="Filtros">
          {filters}
        </aside>

        <div className="lg:col-span-3 xl:col-span-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground" role="status">
              {result.total === 1 ? '1 producto' : `${result.total} productos`}
            </p>
            <div className="flex items-center gap-2">
              <MobileFilters activeCount={params.tag.length}>{filters}</MobileFilters>
              <SortSelect value={params.sort} hrefs={sortHrefs} />
            </div>
          </div>

          {result.items.length > 0 ? (
            <ul className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
              {result.items.map((product, index) => (
                <li key={product.id}>
                  <ProductCard product={product} priority={index < 4} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-6 flex flex-col items-center gap-4 rounded-3xl bg-surface px-6 py-16 text-center">
              <MagnifyingGlassIcon weight="light" className="size-10 text-muted-foreground" aria-hidden />
              <div>
                <p className="font-bold">No encontramos productos con esos filtros</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Probá con menos filtros o preguntale a nuestro asesor qué te conviene.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {hasFilters && (
                  <Button asChild variant="outline" className="h-10 rounded-full bg-background px-5">
                    <Link href={basePath}>Quitar filtros</Link>
                  </Button>
                )}
                <Button asChild className="h-10 rounded-full px-5">
                  <Link href="/asistente">Hablar con el asesor</Link>
                </Button>
              </div>
            </div>
          )}

          <CatalogPagination basePath={basePath} params={params} totalPages={result.totalPages} />
        </div>
      </div>
    </div>
  )
}
