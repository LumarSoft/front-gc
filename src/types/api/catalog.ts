import type { Money } from '@/src/types/api/money'

// Matches api-gc/docs/endpoints.md → Catalog.

export type Availability = 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK'
export type OutOfStockBehavior = 'SHOW_UNAVAILABLE' | 'HIDE' | 'ALLOW_INQUIRY'
export type ProductBadge = 'OFFER' | 'NEW'
export type ProductSort = 'relevance' | 'newest' | 'price-asc' | 'price-desc' | 'name'
export type SaleUnit = 'UNIT' | 'BOX' | 'PACK' | 'ROLL' | 'METER' | 'SQUARE_METER' | 'LITER' | 'KIT'

export type NamedRef = {
  name: string
  slug: string
}

export type CategorySummary = NamedRef & { id: number }

export type Category = CategorySummary & {
  description: string | null
  imageUrl: string | null
  parent: CategorySummary | null
  children: CategorySummary[]
}

export type ProductSummary = {
  id: number
  slug: string
  name: string
  shortDescription: string | null
  brand: NamedRef | null
  category: NamedRef
  imageUrl: string | null
  price: Money | null
  compareAtPrice: Money | null
  badge: ProductBadge | null
  isFeatured: boolean
  availability: Availability
  outOfStockBehavior: OutOfStockBehavior
  variantCount: number
}

export type ProductVariant = {
  id: number
  sku: string
  name: string | null
  optionValues: Record<string, string> | null
  isDefault: boolean
  saleUnit: SaleUnit
  unitsPerSaleUnit: number
  price: Money | null
  compareAtPrice: Money | null
  availability: Availability
}

export type ProductImage = {
  url: string
  alt: string
  variantId: number | null
}

export type SpecificationGroup = {
  group: string | null
  items: { name: string; value: string }[]
}

export type ProductDetail = ProductSummary & {
  description: string | null
  warrantyMonths: number | null
  seoTitle: string | null
  seoDescription: string | null
  parentCategory: NamedRef | null
  images: ProductImage[]
  variants: ProductVariant[]
  specifications: SpecificationGroup[]
  tags: (NamedRef & { group: string | null })[]
  compatibleWith: ProductSummary[]
  compatibleConsumables: ProductSummary[]
}

export type ProductListQuery = {
  page?: number
  pageSize?: number
  category?: string
  brand?: string[]
  tag?: string[]
  q?: string
  featured?: boolean
  sort?: ProductSort
}

export type PaginatedProducts = {
  items: ProductSummary[]
  page: number
  pageSize: number
  total: number
  totalPages: number
}
