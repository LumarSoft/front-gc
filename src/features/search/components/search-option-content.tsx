import { ArrowRight, History } from 'lucide-react'
import { SearchProductRow } from '@/src/features/search/components/search-product-row'
import type { SearchOption, SearchView } from '@/src/features/search/lib/search-view'

type SearchOptionContentProps = {
  option: SearchOption
  view: SearchView
}

/** What one option shows, by kind. The row or chip around it comes from `SearchOptionItem`. */
export function SearchOptionContent({ option, view }: SearchOptionContentProps) {
  switch (option.kind) {
    case 'recent':
      return (
        <>
          <History className="size-4 shrink-0 text-muted-foreground" aria-hidden />
          <span className="truncate">{option.text}</span>
        </>
      )
    case 'popular':
      return option.text
    case 'category-link':
      return option.label
    case 'product':
      return <SearchProductRow product={option.product} highlight={view.highlight} />
    case 'category':
      return (
        <>
          <span className="min-w-0 flex-1 truncate">
            <span className="text-muted-foreground">{view.term} en </span>
            <span className="font-semibold">{option.category.name}</span>
          </span>
          <span className="text-xs text-muted-foreground tabular-nums">{option.category.count}</span>
        </>
      )
    case 'all':
      return (
        <>
          <span className="flex-1 font-semibold text-primary">{allResultsLabel(option.total)}</span>
          <ArrowRight className="size-4 text-primary" aria-hidden />
        </>
      )
    case 'assistant':
      return view.status === 'empty' ? (
        <>
          <span className="flex flex-1 flex-col gap-0.5">
            <span className="font-semibold">Preguntale al asesor</span>
            <span className="text-xs text-muted-foreground">
              Contale qué necesitás y te recomienda productos del catálogo.
            </span>
          </span>
          <ArrowRight className="size-4 text-primary" aria-hidden />
        </>
      ) : (
        <>
          <span className="flex-1 text-muted-foreground">
            ¿No es lo que buscás? <span className="font-semibold text-foreground">Preguntale al asesor</span>
          </span>
          <ArrowRight className="size-4 text-muted-foreground" aria-hidden />
        </>
      )
  }
}

function allResultsLabel(total: number | null): string {
  if (total === null) return 'Ver todos los resultados'
  return total === 1 ? 'Ver el resultado' : `Ver los ${total} resultados`
}
