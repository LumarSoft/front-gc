// Matches api-gc/docs/endpoints.md → Admin → Products (admin).
import type { Availability, OutOfStockBehavior } from '@/src/types/api/catalog'
import type { Money } from '@/src/types/api/money'

export type ProductStatus = 'DRAFT' | 'PUBLISHED' | 'HIDDEN'
/** What a product still needs. The first two block publishing; NO_IMAGE only warns. */
export type ProductIssue = 'NO_ACTIVE_VARIANT' | 'NO_RETAIL_PRICE' | 'NO_SHIPPING_DATA' | 'NO_IMAGE'
export type AdminProductSort = 'updated' | 'name' | 'newest'

export type IdName = { id: number; name: string }

export type AdminProductListItem = {
  id: number
  name: string
  slug: string
  status: ProductStatus
  imageUrl: string | null
  category: IdName
  brand: IdName | null
  sku: string | null
  variantCount: number
  /** As stored (not converted). */
  retailPrice: Money | null
  available: number
  availability: Availability
  isFeatured: boolean
  outOfStockBehavior: OutOfStockBehavior
  issues: ProductIssue[]
  publishedAt: string | null
  updatedAt: string
}

export type PaginatedAdminProducts = {
  items: AdminProductListItem[]
  page: number
  pageSize: number
  total: number
  totalPages: number
}

export type AdminProductsQuery = {
  page?: number
  pageSize?: number
  q?: string
  status?: ProductStatus
  categoryId?: number
  brandId?: number
  stock?: 'out'
  /** Products with an active variant missing weight or a measurement. */
  shipping?: 'missing'
  sort?: AdminProductSort
}

export type AdminProductImage = {
  id: number
  fileId: number
  url: string
  altText: string | null
  variantId: number | null
}
export type AdminSpecification = { id: number; groupName: string | null; name: string; value: string }
export type AdminProductTag = { id: number; name: string; slug: string; group: string | null }

export type AdminVariantSummary = {
  id: number
  sku: string
  name: string | null
  isDefault: boolean
  isActive: boolean
  retailPrice: Money | null
  available: number | null
  availability: Availability
  /** Weight and the three measurements are loaded (needed to publish and to quote shipping). */
  hasShippingData: boolean
}

export type Currency = 'ARS' | 'USD'
export type DataSource = 'TANGO' | 'MANUAL'
export type SaleUnit = 'UNIT' | 'BOX' | 'PACK' | 'ROLL' | 'METER' | 'SQUARE_METER' | 'LITER' | 'KIT'

export type VariantPrice = {
  priceListId: number
  amount: string
  currency: Currency
  compareAtAmount: string | null
  source: DataSource
}

export type VariantStock = { onHand: number; reserved: number; lowStockThreshold: number | null }

/** A variant with everything the admin can edit (GET /admin/products/:id). */
export type AdminVariant = AdminVariantSummary & {
  optionValues: Record<string, string> | null
  barcode: string | null
  source: DataSource
  tangoCode: string | null
  saleUnit: SaleUnit
  unitsPerSaleUnit: number
  weightGrams: number | null
  lengthMm: number | null
  widthMm: number | null
  heightMm: number | null
  prices: VariantPrice[]
  /** Null when stock was never loaded. */
  stock: VariantStock | null
}

export type AdminProduct = {
  id: number
  type: 'STANDARD' | 'BUNDLE'
  status: ProductStatus
  name: string
  slug: string
  categoryId: number
  brandId: number | null
  shortDescription: string | null
  description: string | null
  isFeatured: boolean
  outOfStockBehavior: OutOfStockBehavior
  warrantyMonths: number | null
  seoTitle: string | null
  seoDescription: string | null
  images: AdminProductImage[]
  specifications: AdminSpecification[]
  tags: AdminProductTag[]
  variants: AdminVariant[]
  issues: ProductIssue[]
  publishedAt: string | null
  createdAt: string
  updatedAt: string
}

export type CreateProductInput = {
  name: string
  slug?: string
  categoryId: number
  brandId?: number | null
  sku: string
  shortDescription?: string | null
}

export type UpdateProductInput = Partial<{
  name: string
  slug: string
  categoryId: number
  brandId: number | null
  shortDescription: string | null
  description: string | null
  isFeatured: boolean
  outOfStockBehavior: OutOfStockBehavior
  warrantyMonths: number | null
  seoTitle: string | null
  seoDescription: string | null
}>

export type ProductImageInput = { id?: number; fileId: number; altText?: string | null; variantId?: number | null }
export type SpecificationInput = { id?: number; groupName?: string | null; name: string; value: string }

export type VariantInput = Partial<{
  sku: string
  name: string | null
  optionValues: Record<string, string> | null
  barcode: string | null
  isActive: boolean
  saleUnit: SaleUnit
  unitsPerSaleUnit: number
  weightGrams: number | null
  lengthMm: number | null
  widthMm: number | null
  heightMm: number | null
}>

export type VariantPriceInput = {
  priceListId: number
  amount: string
  currency: Currency
  compareAtAmount?: string | null
}

export type StockInput = { onHand: number; lowStockThreshold?: number | null; note?: string | null }

/** Matches POST /admin/products/bulk. */
export type BulkProductAction = 'PUBLISH' | 'HIDE' | 'DRAFT' | 'ARCHIVE'
export type BulkProductsResult = {
  updated: number[]
  unchanged: number[]
  skipped: { id: number; reason: 'NOT_FOUND' | 'CANNOT_PUBLISH'; issues?: ProductIssue[] }[]
}
