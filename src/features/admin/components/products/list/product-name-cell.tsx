import Link from 'next/link'
import { PackageIcon } from '@phosphor-icons/react/dist/ssr'
import { ItemThumb } from '@/src/features/admin/components/common/item-thumb'
import type { AdminProductListItem } from '@/src/types/api/admin-products'

/** Thumb, name (link to the editor) and SKU / variant count. */
export function ProductNameCell({ product }: { product: AdminProductListItem }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <ItemThumb url={product.imageUrl} fallbackIcon={PackageIcon} />
      <div className="min-w-0">
        <Link
          href={`/admin/productos/${product.id}`}
          className="line-clamp-2 text-sm font-medium hover:underline focus-visible:underline focus-visible:outline-none"
        >
          {product.name}
        </Link>
        <p className="truncate text-xs text-muted-foreground">
          {product.sku ?? 'Sin SKU'}
          {product.variantCount > 1 && ` · ${product.variantCount} variantes`}
        </p>
      </div>
    </div>
  )
}
