import Link from 'next/link'
import { MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr'
import { Button } from '@/src/components/ui/button'

type CatalogEmptyStateProps = {
  /** Link that removes the active filters. Omitted when there are none. */
  clearFiltersHref?: string
}

export function CatalogEmptyState({ clearFiltersHref }: CatalogEmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-3xl bg-surface px-6 py-16 text-center">
      <MagnifyingGlassIcon weight="light" className="size-10 text-muted-foreground" aria-hidden />
      <div>
        <p className="font-bold">No encontramos productos con esos filtros</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Probá con menos filtros o preguntale a nuestro asesor qué te conviene.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {clearFiltersHref && (
          <Button asChild variant="outline" className="h-10 rounded-full bg-background px-5">
            <Link href={clearFiltersHref}>Quitar filtros</Link>
          </Button>
        )}
        <Button asChild className="h-10 rounded-full px-5">
          <Link href="/asistente">Hablar con el asesor</Link>
        </Button>
      </div>
    </div>
  )
}
