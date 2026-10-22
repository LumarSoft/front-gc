import { adminDestinations } from '@/src/features/admin/lib/admin-nav'
import type { AdminProductListItem } from '@/src/types/api/admin-products'

export type AdminSearchResult = {
  id: string
  kind: 'section' | 'product'
  label: string
  detail?: string
  href: string
  imageUrl?: string | null
}

/** Lowercase without accents, so "categoria" finds "Categorías". */
export function normalizeSearch(value: string): string {
  return value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim()
}

/**
 * Sections whose name contains the term; every section when the term is empty (quick navigation). Developer-only
 * sections only for developers.
 */
export function matchSections(term: string, developer: boolean): AdminSearchResult[] {
  const needle = normalizeSearch(term)
  return adminDestinations(developer)
    .filter(link => normalizeSearch(link.label).includes(needle))
    .map(link => ({
      id: `section:${link.href}`,
      kind: 'section',
      label: link.label,
      href: link.href,
    }))
}

export function productResult(product: AdminProductListItem): AdminSearchResult {
  return {
    id: `product:${product.id}`,
    kind: 'product',
    label: product.name,
    detail: [product.sku, product.category.name].filter(Boolean).join(' · '),
    href: `/admin/productos/${product.id}`,
    imageUrl: product.imageUrl,
  }
}
