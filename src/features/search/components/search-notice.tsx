import Link from 'next/link'
import type { SearchInfo } from '@/src/types/api/catalog'

type SearchNoticeProps = {
  /** What the customer typed. */
  query: string
  search: SearchInfo | undefined
  /** Outside `/productos` (a category, the offers): the same search in the whole store. */
  wholeStoreHref?: string
}

/** Above the results of a search: a corrected word, a partial match, or a search limited to this page's products. */
export function SearchNotice({ query, search, wholeStoreHref }: SearchNoticeProps) {
  if (!search?.correctedQuery && !search?.partial && !wholeStoreHref) return null
  return (
    <div className="mb-5 flex flex-col gap-2 rounded-xl bg-muted px-4 py-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:gap-6">
      <p>
        {search?.correctedQuery && (
          <>
            Buscaste «{query}». Mostramos resultados para{' '}
            <span className="font-semibold text-foreground">«{search.correctedQuery}»</span>.{' '}
          </>
        )}
        {search?.partial && 'Ningún producto tiene todas las palabras: estos son los que tienen más coincidencias. '}
        {wholeStoreHref && !search?.correctedQuery && !search?.partial && `Resultados de «${query}» en esta sección.`}
      </p>
      {wholeStoreHref && (
        <Link href={wholeStoreHref} className="shrink-0 font-semibold text-primary underline-offset-2 hover:underline">
          Buscar en toda la tienda
        </Link>
      )}
    </div>
  )
}
