// Matches api-gc/docs/endpoints.md → Admin → Taxonomy.

export type AdminCategory = {
  id: number
  parentId: number | null
  name: string
  slug: string
  description: string | null
  imageFileId: number | null
  imageUrl: string | null
  sortOrder: number
  isActive: boolean
  /** Products in any status (not archived) directly in this category. */
  productCount: number
  children: AdminCategory[]
}

export type AdminBrand = {
  id: number
  name: string
  slug: string
  logoFileId: number | null
  logoUrl: string | null
  sortOrder: number
  isActive: boolean
  productCount: number
}

export type AdminTag = {
  id: number
  name: string
  slug: string
  group: string | null
  productCount: number
}
