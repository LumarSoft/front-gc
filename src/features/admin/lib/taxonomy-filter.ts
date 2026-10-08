import type { AdminCategory } from '@/src/types/api/admin-catalog'

/** "Todas", only the visible ones, or only the hidden ones. */
export type VisibilityView = 'active' | 'inactive' | undefined

type Filterable = { name: string; slug: string; isActive: boolean }

const normalize = (value: string): string => value.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

/** Name or slug contains the term, ignoring case and accents ("fotografica" finds "Fotográficas"). */
export function matchesTerm(term: string, ...values: string[]): boolean {
  const needle = normalize(term.trim())
  return !needle || values.some(value => normalize(value).includes(needle))
}

function passes(item: Filterable, view: VisibilityView, term: string): boolean {
  const visible = view === undefined || item.isActive === (view === 'active')
  return visible && matchesTerm(term, item.name, item.slug)
}

export function filterByVisibility<T extends Filterable>(items: T[], view: VisibilityView, term: string): T[] {
  return items.filter(item => passes(item, view, term))
}

/** Keeps a category when it or one of its subcategories matches; its subcategories are narrowed the same way. */
export function filterCategoryTree(categories: AdminCategory[], view: VisibilityView, term: string): AdminCategory[] {
  return categories.flatMap(category => {
    const children = filterByVisibility(category.children, view, term)
    return passes(category, view, term) || children.length ? [{ ...category, children }] : []
  })
}

/** How many items are visible and hidden, for the view tabs (subcategories included). */
export function visibilityCounts(items: Filterable[]): Record<'active' | 'inactive', number> {
  const active = items.filter(item => item.isActive).length
  return { active, inactive: items.length - active }
}

/** Tag groups narrowed to one group (`''` is "Sin grupo") and to the tags matching the term; empty groups drop out. */
export function filterTagGroups<G extends { group: string | null; tags: { name: string; slug: string }[] }>(
  groups: G[],
  group: string | undefined,
  term: string,
): G[] {
  return groups
    .filter(item => group === undefined || (item.group ?? '') === group)
    .map(item => ({ ...item, tags: item.tags.filter(tag => matchesTerm(term, tag.name, tag.slug)) }))
    .filter(item => item.tags.length > 0)
}
