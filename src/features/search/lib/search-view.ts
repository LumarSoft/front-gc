import { CATEGORY_LINKS } from '@/src/lib/navigation'
import type { ProductSummary, SearchInfo } from '@/src/types/api/catalog'
import type { CategorySuggestion, ProductSuggestions } from '@/src/types/api/search'

/** Shorter text is not looked up while typing: the box shows recent and popular searches instead. */
export const MIN_SEARCH_LENGTH = 2

/** Something the customer can pick in the search box, with the arrow keys or the mouse. */
export type SearchOption =
  | { id: string; kind: 'recent' | 'popular'; text: string; href: string }
  | { id: string; kind: 'category-link'; label: string; href: string }
  | { id: string; kind: 'product'; product: ProductSummary; href: string }
  | { id: string; kind: 'category'; category: CategorySuggestion; href: string }
  | { id: string; kind: 'all'; total: number | null; href: string }
  | { id: string; kind: 'assistant' }

export type SearchSection = {
  id: 'recent' | 'popular' | 'categories' | 'products' | 'actions'
  /** Heading above the options; none for the closing actions. */
  label: string | null
  /** Short texts (popular searches, categories to browse) wrap as chips; the rest go one per row. */
  layout: 'rows' | 'chips'
  options: SearchOption[]
}

/** What the box shows: `start` before typing, then the state of the suggestions for the typed text. */
export type SearchView = {
  status: 'start' | 'loading' | 'results' | 'empty' | 'error'
  term: string
  /** The words to highlight in the results: the corrected text when a word was misspelled. */
  highlight: string
  notice: SearchInfo | null
  sections: SearchSection[]
}

type SearchViewInput = {
  term: string
  suggestions: ProductSuggestions | undefined
  failed: boolean
  recent: string[]
  popular: string[]
}

export const searchHref = (text: string): string => `/productos?q=${encodeURIComponent(text)}`

export function buildSearchView({ term, suggestions, failed, recent, popular }: SearchViewInput): SearchView {
  const text = term.trim()
  const base = { term: text, highlight: text, notice: null }
  if (text.length < MIN_SEARCH_LENGTH) return { ...base, status: 'start', sections: startSections(recent, popular) }

  // The previous results stay on screen while the next ones load; only results for this text can say "none".
  const current = suggestions?.query === text ? suggestions : undefined
  const shown = current ?? (suggestions?.total ? suggestions : undefined)
  if (!shown) {
    return failed
      ? { ...base, status: 'error', sections: [section('actions', null, 'rows', [allOption(text, null)])] }
      : { ...base, status: 'loading', sections: [] }
  }
  if (shown.total === 0) {
    return {
      ...base,
      status: 'empty',
      sections: [section('actions', null, 'rows', [ASSISTANT_OPTION]), ...chipSection('popular', popular)],
    }
  }
  return {
    ...base,
    status: 'results',
    highlight: current?.correctedQuery ?? text,
    notice:
      current && (current.correctedQuery || current.partial)
        ? { correctedQuery: current.correctedQuery, partial: current.partial }
        : null,
    sections: [
      section('products', 'Productos', 'rows', shown.products.map(productOption)),
      section(
        'categories',
        'Categorías',
        'rows',
        shown.categories.map(category => categoryOption(category, text)),
      ),
      section('actions', null, 'rows', [allOption(text, current?.total ?? null), ASSISTANT_OPTION]),
    ].filter(item => item.options.length > 0),
  }
}

/** Next option for the arrow keys; past either end it goes back to the text field (null). */
export function stepOption(options: SearchOption[], current: SearchOption | null, step: 1 | -1): SearchOption | null {
  const index = current ? options.indexOf(current) : -1
  if (index === -1) return (step === 1 ? options[0] : options.at(-1)) ?? null
  return options[index + step] ?? null
}

function startSections(recent: string[], popular: string[]): SearchSection[] {
  return [
    section(
      'recent',
      'Búsquedas recientes',
      'rows',
      recent.map((text, index) => ({ id: `recent-${index}`, kind: 'recent', text, href: searchHref(text) })),
    ),
    ...chipSection('popular', popular),
    section(
      'categories',
      'Categorías',
      'chips',
      CATEGORY_LINKS.map(link => ({
        id: `go-${link.href}`,
        kind: 'category-link',
        label: link.label,
        href: link.href,
      })),
    ),
  ].filter(item => item.options.length > 0)
}

function chipSection(id: 'popular', popular: string[]): SearchSection[] {
  const options: SearchOption[] = popular.map((text, index) => ({
    id: `popular-${index}`,
    kind: 'popular',
    text,
    href: searchHref(text),
  }))
  return options.length ? [section(id, 'Lo más buscado', 'chips', options)] : []
}

const ASSISTANT_OPTION: SearchOption = { id: 'assistant', kind: 'assistant' }

/** `total` is null while it is not known for this exact text. */
const allOption = (text: string, total: number | null): SearchOption => ({
  id: 'all',
  kind: 'all',
  total,
  href: searchHref(text),
})

const productOption = (product: ProductSummary): SearchOption => ({
  id: `product-${product.id}`,
  kind: 'product',
  product,
  href: `/productos/${product.slug}`,
})

const categoryOption = (category: CategorySuggestion, text: string): SearchOption => ({
  id: `category-${category.slug}`,
  kind: 'category',
  category,
  href: `/categorias/${category.slug}?q=${encodeURIComponent(text)}`,
})

const section = (
  id: SearchSection['id'],
  label: string | null,
  layout: SearchSection['layout'],
  options: SearchOption[],
): SearchSection => ({ id, label, layout, options })
