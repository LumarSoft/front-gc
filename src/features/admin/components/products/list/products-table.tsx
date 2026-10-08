import {
  IndexTable,
  IndexTableBody,
  IndexTableCell,
  IndexTableHead,
  IndexTableHeader,
  IndexTableRow,
} from '@/src/features/admin/components/common/index-table'
import { ProductIssuesHint } from '@/src/features/admin/components/products/list/product-issues-hint'
import { ProductNameCell } from '@/src/features/admin/components/products/list/product-name-cell'
import { ProductStatusBadge } from '@/src/features/admin/components/products/product-status-badge'
import { StockLabel } from '@/src/features/admin/components/products/stock-label'
import { formatMoneyExact } from '@/src/lib/format'
import type { AdminProductListItem } from '@/src/types/api/admin-products'

/** Desktop list (md and up): one dense row per product; any cell opens the editor. */
export function ProductsTable({ products }: { products: AdminProductListItem[] }) {
  return (
    <IndexTable className="hidden md:table">
      <IndexTableHeader>
        <IndexTableHead className="w-full">Producto</IndexTableHead>
        <IndexTableHead>Estado</IndexTableHead>
        <IndexTableHead>Inventario</IndexTableHead>
        <IndexTableHead>Categoría</IndexTableHead>
        <IndexTableHead className="text-right">Precio minorista</IndexTableHead>
      </IndexTableHeader>
      <IndexTableBody>
        {products.map(product => (
          <IndexTableRow key={product.id}>
            <IndexTableCell className="max-w-0 min-w-64">
              <ProductNameCell product={product} />
            </IndexTableCell>
            <IndexTableCell>
              <span className="flex items-center gap-1">
                <ProductStatusBadge status={product.status} />
                <ProductIssuesHint issues={product.issues} />
              </span>
            </IndexTableCell>
            <IndexTableCell>
              <StockLabel available={product.available} availability={product.availability} />
            </IndexTableCell>
            <IndexTableCell className="text-muted-foreground">
              {product.category.name}
              {product.brand && <span className="block text-xs">{product.brand.name}</span>}
            </IndexTableCell>
            <IndexTableCell className="text-right tabular-nums">
              {product.retailPrice ? (
                formatMoneyExact(product.retailPrice)
              ) : (
                <span className="text-muted-foreground">Sin precio</span>
              )}
            </IndexTableCell>
          </IndexTableRow>
        ))}
      </IndexTableBody>
    </IndexTable>
  )
}
