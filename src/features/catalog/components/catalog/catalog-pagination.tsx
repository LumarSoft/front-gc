import Link from 'next/link'
import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react/dist/ssr'
import { buildCatalogHref, type CatalogParams } from '@/src/features/catalog/lib/catalog-params'
import { cn } from '@/src/lib/utils'

type CatalogPaginationProps = {
  basePath: string
  params: CatalogParams
  totalPages: number
}

/** Current page, its neighbours, first and last: short enough for a phone. */
function visiblePages(current: number, total: number): (number | 'gap')[] {
  const pages = [...new Set([1, current - 1, current, current + 1, total])]
    .filter(page => page >= 1 && page <= total)
    .sort((a, b) => a - b)
  return pages.flatMap((page, index) => (index > 0 && page - pages[index - 1] > 1 ? ['gap' as const, page] : [page]))
}

export function CatalogPagination({ basePath, params, totalPages }: CatalogPaginationProps) {
  if (totalPages <= 1) return null
  const linkClass = 'grid size-11 place-items-center rounded-full text-sm font-semibold transition-colors'

  return (
    <nav aria-label="Páginas" className="mt-12 flex items-center justify-center gap-1">
      {params.page > 1 && (
        <Link
          href={buildCatalogHref(basePath, params, { page: params.page - 1 })}
          aria-label="Página anterior"
          className={cn(linkClass, 'hover:bg-muted')}
        >
          <CaretLeftIcon weight="regular" className="size-5" />
        </Link>
      )}
      {visiblePages(params.page, totalPages).map((page, index) =>
        page === 'gap' ? (
          <span key={`gap-${index}`} className="px-1 text-muted-foreground">
            …
          </span>
        ) : (
          <Link
            key={page}
            href={buildCatalogHref(basePath, params, { page })}
            aria-current={page === params.page ? 'page' : undefined}
            className={cn(linkClass, page === params.page ? 'bg-foreground text-background' : 'hover:bg-muted')}
          >
            {page}
          </Link>
        ),
      )}
      {params.page < totalPages && (
        <Link
          href={buildCatalogHref(basePath, params, { page: params.page + 1 })}
          aria-label="Página siguiente"
          className={cn(linkClass, 'hover:bg-muted')}
        >
          <CaretRightIcon weight="regular" className="size-5" />
        </Link>
      )}
    </nav>
  )
}
