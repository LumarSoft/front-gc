import { ChevronRightIcon, PackageIcon } from 'lucide-react'
import Link from 'next/link'
import { RowCheckbox } from '@/src/features/admin/components/common/row-checkbox'
import type { RowSelection } from '@/src/features/admin/hooks/use-row-selection'
import { ItemThumb } from '@/src/features/admin/components/common/item-thumb'
import { ProductIssueChips } from '@/src/features/admin/components/products/product-issue-chips'
import { ProductStatusBadge } from '@/src/features/admin/components/products/product-status-badge'
import { StockLabel } from '@/src/features/admin/components/products/stock-label'
import { formatMoneyExact } from '@/src/lib/format'
import type { AdminProductListItem } from '@/src/types/api/admin-products'

type ProductsMobileListProps = {
  products: AdminProductListItem[]
  selection: RowSelection
}

/** Phone list (below md): each product is one tappable row with its status, price and stock, and a box to select it. */
export function ProductsMobileList({ products, selection }: ProductsMobileListProps) {
  return (
    <ul className="divide-y md:hidden">
      {products.map(product => (
        <li
          key={product.id}
          className="flex items-start data-[state=selected]:bg-tone-neutral/50"
          data-state={selection.isSelected(product.id) ? 'selected' : undefined}
        >
          <RowCheckbox
            className="mt-6 ml-4"
            checked={selection.isSelected(product.id)}
            onCheckedChange={checked => selection.toggle(product.id, checked)}
            label={`Seleccionar ${product.name}`}
          />
          <Link
            href={`/admin/productos/${product.id}`}
            className="flex min-w-0 flex-1 items-start gap-3 py-3 pr-4 pl-3 transition-colors active:bg-table-head"
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
            <ChevronRightIcon className="mt-3 size-4 shrink-0 text-muted-foreground" />
          </Link>
        </li>
      ))}
    </ul>
  )
}
