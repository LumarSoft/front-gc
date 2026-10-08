import Link from 'next/link'
import { CaretRightIcon, PackageIcon } from '@phosphor-icons/react/dist/ssr'
import { ItemThumb } from '@/src/features/admin/components/common/item-thumb'
import { ProductIssueChips } from '@/src/features/admin/components/products/product-issue-chips'
import { ProductStatusBadge } from '@/src/features/admin/components/products/product-status-badge'
import { StockLabel } from '@/src/features/admin/components/products/stock-label'
import { formatMoneyExact } from '@/src/lib/format'
import type { AdminProductListItem } from '@/src/types/api/admin-products'

/** Phone list (below md): each product is one tappable row with its status, price and stock. */
export function ProductsMobileList({ products }: { products: AdminProductListItem[] }) {
  return (
    <ul className="divide-y md:hidden">
      {products.map(product => (
        <li key={product.id}>
          <Link
            href={`/admin/productos/${product.id}`}
            className="flex items-start gap-3 px-4 py-3 transition-colors active:bg-table-head"
          >
            <ItemThumb url={product.imageUrl} fallbackIcon={PackageIcon} />
            <div className="flex min-w-0 flex-1 flex-col gap-1.5">
              <div>
                <p className="line-clamp-2 text-sm font-medium">{product.name}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {product.retailPrice ? formatMoneyExact(product.retailPrice) : 'Sin precio'} · {product.category.name}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                <ProductStatusBadge status={product.status} />
                <StockLabel available={product.available} availability={product.availability} />
              </div>
              <ProductIssueChips issues={product.issues} />
            </div>
            <CaretRightIcon className="mt-3 size-4 shrink-0 text-muted-foreground" />
          </Link>
        </li>
      ))}
    </ul>
  )
}
