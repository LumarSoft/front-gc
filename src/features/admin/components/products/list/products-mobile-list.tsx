import { ProductIssueChips } from '@/src/features/admin/components/products/product-issue-chips'
import { ProductStatusBadge } from '@/src/features/admin/components/products/product-status-badge'
import { ProductNameCell } from '@/src/features/admin/components/products/list/product-name-cell'
import { StockLabel } from '@/src/features/admin/components/products/stock-label'
import { formatMoneyExact } from '@/src/lib/format'
import type { AdminProductListItem } from '@/src/types/api/admin-products'

/** Phone list (below md): the same data as the table, stacked in one card row per product. */
export function ProductsMobileList({ products }: { products: AdminProductListItem[] }) {
  return (
    <ul className="divide-y md:hidden">
      {products.map(product => (
        <li key={product.id} className="flex flex-col gap-2 px-4 py-3">
          <ProductNameCell product={product} />
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pl-13">
            <ProductStatusBadge status={product.status} />
            <span className="text-sm tabular-nums">
              {product.retailPrice ? formatMoneyExact(product.retailPrice) : 'Sin precio'}
            </span>
            <StockLabel available={product.available} availability={product.availability} />
          </div>
          {product.issues.length > 0 && (
            <div className="pl-13">
              <ProductIssueChips issues={product.issues} />
            </div>
          )}
        </li>
      ))}
    </ul>
  )
}
