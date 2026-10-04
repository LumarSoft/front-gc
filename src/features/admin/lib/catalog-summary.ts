import type { AdminBrand, AdminCategory, AdminTag } from '@/src/types/api/admin-catalog'

export type CatalogSummary = {
  products: number
  categories: number
  subcategories: number
  brands: number
  tags: number
}

/** Counts for the admin home. Every product belongs to exactly one category, so their counts add up to the total. */
export function summarizeCatalog(categories: AdminCategory[], brands: AdminBrand[], tags: AdminTag[]): CatalogSummary {
  const subcategories = categories.flatMap(category => category.children)
  const products = [...categories, ...subcategories].reduce((total, category) => total + category.productCount, 0)
  return {
    products,
    categories: categories.length,
    subcategories: subcategories.length,
    brands: brands.length,
    tags: tags.length,
  }
}

export type CategoryShare = {
  id: number
  name: string
  /** Products in the category and its subcategories. */
  products: number
  /** 0–100, relative to the category with the most products (for the bar). */
  percent: number
}

/** Top-level categories by product count, largest first. */
export function productsByTopCategory(categories: AdminCategory[]): CategoryShare[] {
  const totals = categories.map(category => ({
    id: category.id,
    name: category.name,
    products: category.productCount + category.children.reduce((sum, child) => sum + child.productCount, 0),
  }))
  const max = Math.max(1, ...totals.map(total => total.products))
  return totals
    .sort((a, b) => b.products - a.products || a.name.localeCompare(b.name, 'es'))
    .map(total => ({ ...total, percent: Math.round((total.products / max) * 100) }))
}
