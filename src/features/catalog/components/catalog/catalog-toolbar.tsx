import { MobileFilters } from '@/src/features/catalog/components/catalog/mobile-filters'
import { SortSelect } from '@/src/features/catalog/components/catalog/sort-select'
import { buildCatalogHref, SORT_OPTIONS, type CatalogParams } from '@/src/features/catalog/lib/catalog-params'
import type { ProductSort } from '@/src/types/api/catalog'

type CatalogToolbarProps = {
  basePath: string
  params: CatalogParams
  total: number
  /** Filters shown in the phone sheet (the same element as the desktop sidebar). */
  filters: React.ReactNode
}

export function CatalogToolbar({ basePath, params, total, filters }: CatalogToolbarProps) {
  const sortHrefs = Object.fromEntries(
    SORT_OPTIONS.map(option => [option.value, buildCatalogHref(basePath, params, { sort: option.value })]),
  ) as Record<ProductSort, string>

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="text-sm text-muted-foreground" role="status">
        {total === 1 ? '1 producto' : `${total} productos`}
      </p>
      <div className="flex items-center gap-2">
        <MobileFilters activeCount={params.tag.length}>{filters}</MobileFilters>
        <SortSelect value={params.sort} hrefs={sortHrefs} />
      </div>
    </div>
  )
}
