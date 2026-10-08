import { PackageIcon } from 'lucide-react'
import { IndexTableRowLink } from '@/src/features/admin/components/common/index-table'
import { ItemThumb } from '@/src/features/admin/components/common/item-thumb'
import type { AdminProductListItem } from '@/src/types/api/admin-products'

/** Thumb, name (the row's link to the editor) and SKU / variant count. */
export function ProductNameCell({ product }: { product: AdminProductListItem }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <ItemThumb url={product.imageUrl} fallbackIcon={PackageIcon} size="sm" />
      <div className="min-w-0">
        <IndexTableRowLink href={`/admin/productos/${product.id}`} className="block truncate">
          {product.name}
        </IndexTableRowLink>
        <p className="truncate text-xs text-muted-foreground">
          {product.sku ?? 'Sin SKU'}
          {product.variantCount > 1 && ` · ${product.variantCount} variantes`}
        </p>
      </div>
    </div>
  )
}
