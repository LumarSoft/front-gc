import { Skeleton } from '@/src/components/ui/skeleton'
import type { SearchView } from '@/src/features/search/lib/search-view'

type SearchStatusProps = {
  view: SearchView
}

/** The message above the options: loading, nothing found, a corrected word or a partial match. */
export function SearchStatus({ view }: SearchStatusProps) {
  return (
    <>
      <p role="status" className="sr-only">
        {spokenStatus(view)}
      </p>
      {view.status === 'loading' && <SuggestionsSkeleton />}
      {view.status === 'error' && (
        <p className="px-4 pt-4 pb-2 text-sm text-muted-foreground">
          No pudimos cargar sugerencias. Podés ver todos los resultados igual.
        </p>
      )}
      {view.status === 'empty' && (
        <div className="px-4 pt-4 pb-3">
          <p className="text-base font-semibold text-balance">No encontramos «{view.term}»</p>
          <p className="mt-1 text-sm text-muted-foreground">Revisá cómo está escrito o probá con otras palabras.</p>
        </div>
      )}
      {view.notice && (
        <p className="mx-4 mt-3 rounded-lg bg-muted px-3 py-2 text-xs text-muted-foreground">
          {view.notice.correctedQuery && (
            <>
              Mostramos resultados para{' '}
              <span className="font-semibold text-foreground">«{view.notice.correctedQuery}»</span>.{' '}
            </>
          )}
          {view.notice.partial && 'Ningún producto tiene todas las palabras: estos son los más parecidos.'}
        </p>
      )}
    </>
  )
}

function SuggestionsSkeleton() {
  return (
    <div aria-hidden className="flex flex-col gap-1 px-4 py-3">
      {[0, 1, 2].map(row => (
        <div key={row} className="flex items-center gap-3 py-1.5">
          <Skeleton className="size-14 rounded-lg" />
          <div className="flex flex-1 flex-col gap-2">
            <Skeleton className="h-3.5 w-3/4" />
            <Skeleton className="h-3 w-1/3" />
          </div>
        </div>
      ))}
    </div>
  )
}

/** Read by screen readers when it changes, since the focus stays in the text field. */
function spokenStatus(view: SearchView): string {
  if (view.status === 'empty') return `No encontramos ${view.term}`
  if (view.status !== 'results') return ''
  const all = view.sections.flatMap(section => section.options).find(option => option.kind === 'all')
  return all?.kind === 'all' && all.total !== null ? `${all.total} resultados` : ''
}
