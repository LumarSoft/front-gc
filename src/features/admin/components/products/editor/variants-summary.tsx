import { Card, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card'
import { StatusBadge } from '@/src/features/admin/components/common/status-badge'
import { StockLabel } from '@/src/features/admin/components/products/stock-label'
import { formatMoneyExact } from '@/src/lib/format'
import type { AdminProduct } from '@/src/types/api/admin-products'

/** Read-only view of the sellable SKUs: price in the retail list and stock. */
export function VariantsSummary({ product }: { product: AdminProduct }) {
  return (
    <Card className="gap-0 pb-0 shadow-xs ring-foreground/8">
      <CardHeader className="border-b">
        <CardTitle>Variantes</CardTitle>
        <CardDescription>Cada variante es un SKU que se vende, con su precio y su stock.</CardDescription>
      </CardHeader>
      <ul className="divide-y">
        {product.variants.map(variant => (
          <li key={variant.id} className="flex flex-wrap items-center gap-x-4 gap-y-1 px-4 py-3">
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">
                {variant.name ?? (variant.isDefault ? 'Variante principal' : variant.sku)}
              </p>
              <p className="truncate font-mono text-xs text-muted-foreground">{variant.sku}</p>
            </div>
            <span className="text-sm tabular-nums">
              {variant.retailPrice ? (
                formatMoneyExact(variant.retailPrice)
              ) : (
                <span className="text-destructive">Sin precio</span>
              )}
            </span>
            <StockLabel available={variant.available} availability={variant.availability} />
            <StatusBadge active={variant.isActive} />
          </li>
        ))}
      </ul>
    </Card>
  )
}
