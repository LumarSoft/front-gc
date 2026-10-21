'use client'

import { useRouter } from 'next/navigation'
import { useAssistant } from '@/src/features/assistant/hooks/use-assistant'
import { useRecentSearches } from '@/src/features/search/hooks/use-recent-searches'
import { searchHref, type SearchOption } from '@/src/features/search/lib/search-view'

/**
 * What picking something in the search box does. Searches the customer completes (Enter, a recent or popular one,
 * all the results, a category) are remembered; a product picked while typing is not, since the text may be half a
 * word. The results page reports the search to the stats.
 */
export function useSearchActions() {
  const router = useRouter()
  const assistant = useAssistant()
  const { remember } = useRecentSearches()

  const search = (text: string): void => {
    if (text) remember(text)
    router.push(text ? searchHref(text) : '/productos')
  }

  /** `navigate` is false when a link was clicked: the link itself navigates. */
  const choose = (option: SearchOption, term: string, navigate: boolean): void => {
    if (option.kind === 'assistant') {
      assistant.open({ question: `Busco ${term}` })
      return
    }
    if (option.kind === 'recent' || option.kind === 'popular') remember(option.text)
    if (option.kind === 'all' || option.kind === 'category') remember(term)
    if (navigate) router.push(option.href)
  }

  return { search, choose }
}
