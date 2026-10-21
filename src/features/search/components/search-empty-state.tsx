import Link from 'next/link'
import { CmykStripe } from '@/src/components/layout/cmyk-stripe'
import { Button } from '@/src/components/ui/button'
import { AssistantTrigger } from '@/src/features/assistant/components/assistant-trigger'
import { PopularSearchLinks } from '@/src/features/search/components/popular-search-links'
import { SearchChipLinks } from '@/src/features/search/components/search-chip-links'
import { CATEGORY_LINKS } from '@/src/lib/navigation'

type SearchEmptyStateProps = {
  query: string
  /** Outside `/productos`: the same search in the whole store. */
  wholeStoreHref?: string
}

/** A search that found nothing: what to try next, the assistant with the search already asked, and where to browse. */
export function SearchEmptyState({ query, wholeStoreHref }: SearchEmptyStateProps) {
  return (
    <div className="overflow-hidden rounded-3xl bg-surface">
      <CmykStripe />
      <div className="px-6 py-10 sm:px-10 sm:py-12">
        <h2 className="text-2xl font-extrabold tracking-tight text-balance sm:text-3xl">No encontramos «{query}»</h2>
        <p className="mt-2 max-w-xl text-muted-foreground">
          Revisá cómo está escrito, probá con menos palabras o con el modelo (por ejemplo, L3250). También podés
          contarle al asesor qué necesitás: conoce todo el catálogo.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Button asChild className="h-11 rounded-full px-6">
            <AssistantTrigger question={`Busco ${query}`}>Preguntale al asesor</AssistantTrigger>
          </Button>
          {wholeStoreHref && (
            <Button asChild variant="outline" className="h-11 rounded-full bg-background px-6">
              <Link href={wholeStoreHref}>Buscar en toda la tienda</Link>
            </Button>
          )}
        </div>
        <PopularSearchLinks className="mt-10" />
        <SearchChipLinks
          title="Categorías"
          links={CATEGORY_LINKS.map(link => ({ label: link.label, href: link.href }))}
          className="mt-8"
        />
      </div>
    </div>
  )
}
