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
