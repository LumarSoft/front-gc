'use client'

import { Button } from '@/src/components/ui/button'
import { SummaryFigure } from '@/src/features/admin/components/dashboard/summary-figure'
import { useCatalogSummary } from '@/src/features/admin/hooks/use-catalog-summary'

/** "Your catalog in numbers" block of the admin home. */
export function CatalogSummaryPanel() {
  const { summary, isError, retry } = useCatalogSummary()

  return (
    <section aria-labelledby="catalog-summary-title">
      <h2
        id="catalog-summary-title"
        className="mb-3 text-sm font-semibold tracking-wider text-muted-foreground uppercase"
      >
        Catálogo
      </h2>
      {isError ? (
        <div className="rounded-xl border bg-background p-5 text-sm">
          <p>No pudimos cargar los números del catálogo.</p>
          <Button variant="outline" size="sm" className="mt-3" onClick={retry}>
            Reintentar
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border bg-border lg:grid-cols-5">
          {/* Full row on phones: five figures in two columns would leave an empty cell. */}
          <SummaryFigure
            label="Productos"
            value={summary?.products ?? null}
            tone="key"
            className="col-span-2 lg:col-span-1"
          />
          <SummaryFigure label="Categorías" value={summary?.categories ?? null} tone="cyan" />
          <SummaryFigure label="Subcategorías" value={summary?.subcategories ?? null} tone="cyan" />
          <SummaryFigure label="Marcas" value={summary?.brands ?? null} tone="magenta" />
          <SummaryFigure label="Etiquetas" value={summary?.tags ?? null} tone="yellow" />
        </div>
      )}
    </section>
  )
}
