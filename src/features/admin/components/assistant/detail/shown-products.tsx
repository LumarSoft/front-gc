import { PackageIcon } from 'lucide-react'
import Link from 'next/link'
import { ItemThumb } from '@/src/features/admin/components/common/item-thumb'
import { ToneBadge } from '@/src/features/admin/components/common/tone-badge'
import { ProductStatusBadge } from '@/src/features/admin/components/products/product-status-badge'
import type { AdminShownProduct } from '@/src/types/api/admin-assistant'

/**
 * The cards an answer showed, as the products are now: a link to edit each one, and a badge when it is no longer
 * published (archived products have no page to open).
 */
export function ShownProducts({ products }: { products: AdminShownProduct[] }) {
  return (
    <ul aria-label="Productos que mostró" className="divide-y rounded-lg border">
      {products.map(product => (
        <li key={product.id} className="flex items-center gap-3 px-3 py-2">
          <ItemThumb url={product.imageUrl} fallbackIcon={PackageIcon} size="sm" />
          {product.archived ? (
            <span className="line-clamp-2 min-w-0 flex-1 text-sm text-muted-foreground">{product.name}</span>
          ) : (
            <Link
              href={`/admin/productos/${product.id}`}
              className="line-clamp-2 min-w-0 flex-1 text-sm font-medium hover:underline"
            >
              {product.name}
            </Link>
          )}
          {product.archived ? (
            <ToneBadge tone="neutral">Archivado</ToneBadge>
          ) : (
            product.status !== 'PUBLISHED' && <ProductStatusBadge status={product.status} />
          )}
        </li>
      ))}
    </ul>
  )
}
