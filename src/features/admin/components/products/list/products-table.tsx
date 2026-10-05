import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/src/components/ui/table'
import { ProductIssueChips } from '@/src/features/admin/components/products/product-issue-chips'
import { ProductStatusBadge } from '@/src/features/admin/components/products/product-status-badge'
import { ProductNameCell } from '@/src/features/admin/components/products/list/product-name-cell'
import { StockLabel } from '@/src/features/admin/components/products/stock-label'
import { formatMoneyExact } from '@/src/lib/format'
import type { AdminProductListItem } from '@/src/types/api/admin-products'

/** Desktop list (md and up): one product per row, issues under the name. */
export function ProductsTable({ products }: { products: AdminProductListItem[] }) {
  return (
    <Table className="hidden md:table">
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="pl-4">Producto</TableHead>
          <TableHead>Categoría</TableHead>
          <TableHead className="text-right">Precio minorista</TableHead>
          <TableHead className="text-right">Stock</TableHead>
          <TableHead className="pr-4">Estado</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map(product => (
          <TableRow key={product.id}>
            <TableCell className="max-w-md py-3 pl-4 whitespace-normal">
              <ProductNameCell product={product} />
              {product.issues.length > 0 && (
                <div className="mt-2 pl-13">
                  <ProductIssueChips issues={product.issues} />
                </div>
              )}
            </TableCell>
            <TableCell className="text-sm text-muted-foreground">
              {product.category.name}
              {product.brand && <span className="block text-xs">{product.brand.name}</span>}
            </TableCell>
            <TableCell className="text-right text-sm tabular-nums">
              {product.retailPrice ? (
                formatMoneyExact(product.retailPrice)
              ) : (
                <span className="text-muted-foreground">—</span>
              )}
            </TableCell>
            <TableCell className="text-right">
              <StockLabel available={product.available} availability={product.availability} />
            </TableCell>
            <TableCell className="pr-4">
              <ProductStatusBadge status={product.status} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
