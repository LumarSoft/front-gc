'use client'

import type { BrandHandlers } from '@/src/features/admin/components/brands/brand-row'
import { useBrandMutations } from '@/src/features/admin/hooks/use-brand-mutations'
import { moveId } from '@/src/features/admin/lib/reorder'
import type { AdminBrand } from '@/src/types/api/admin-catalog'

type UseBrandHandlersOptions = {
  brands: AdminBrand[]
  edit: (brand: AdminBrand) => void
  askArchive: (brand: AdminBrand) => void
}

/** Row actions of the brand list, wired to the API. */
export function useBrandHandlers({ brands, edit, askArchive }: UseBrandHandlersOptions) {
  const mutations = useBrandMutations()

  const handlers: BrandHandlers = {
    edit,
    archive: askArchive,
    move: (brand, direction) => {
      const ids = moveId(
        brands.map(item => item.id),
        brand.id,
        direction,
      )
      if (ids) mutations.reorder.mutate(ids)
    },
    toggleActive: brand => mutations.update.mutate({ id: brand.id, input: { isActive: !brand.isActive } }),
  }

  return { handlers, archive: (brand: AdminBrand) => mutations.archive.mutate(brand) }
}
