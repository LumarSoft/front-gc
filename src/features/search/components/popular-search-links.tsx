'use client'

import { SearchChipLinks } from '@/src/features/search/components/search-chip-links'
import { usePopularSearches } from '@/src/features/search/hooks/use-popular-searches'
import { searchHref } from '@/src/features/search/lib/search-view'

type PopularSearchLinksProps = {
  className?: string
}

/** What other visitors search for and find; nothing while it loads or when there is too little data. */
export function PopularSearchLinks({ className }: PopularSearchLinksProps) {
  const popular = usePopularSearches(true)
  return (
    <SearchChipLinks
      title="Lo más buscado"
      links={(popular.data ?? []).map(text => ({ label: text, href: searchHref(text) }))}
      className={className}
    />
  )
}
