'use client'

import { ArchiveIcon, PencilSimpleIcon, StarIcon } from '@phosphor-icons/react'
import { RowActions } from '@/src/features/admin/components/common/row-actions'
import { StockLabel } from '@/src/features/admin/components/products/stock-label'
import { variantTitle } from '@/src/features/admin/lib/product-labels'
import { formatMoney, formatMoneyExact } from '@/src/lib/format'
import { convertToArs } from '@/src/lib/money-input'
import { cn } from '@/src/lib/utils'
import type { AdminVariant } from '@/src/types/api/admin-products'
import type { PriceList } from '@/src/types/api/admin-pricing'

type VariantRowProps = {
  variant: AdminVariant
  priceLists: PriceList[]
  /** ARS per USD in effect, to show what USD prices cost in pesos. */
  usdRate: string | null
  onEdit: () => void
  onMakeDefault: () => void
  onArchive: () => void
}

/** One sellable SKU: name, SKU, price per list and stock. The whole row opens the editor (Shopify-style). */
export function VariantRow({ variant, priceLists, usdRate, onEdit, onMakeDefault, onArchive }: VariantRowProps) {
  return (
    <li
      className={cn(
        'flex items-center gap-2 pr-2 transition-colors hover:bg-muted/40',
        !variant.isActive && 'text-muted-foreground',
      )}
    >
      <button
        type="button"
        onClick={onEdit}
        className="flex min-w-0 flex-1 flex-col gap-2 px-4 py-3 text-left focus-visible:bg-muted/60 focus-visible:outline-none sm:flex-row sm:items-center sm:gap-4"
      >
        <span className="min-w-0 sm:flex-1">
          <span className="flex items-center gap-2">
            <span className="truncate text-sm font-medium">{variantTitle(variant)}</span>
            {variant.isDefault && (
              <span className="rounded-full bg-accent px-1.5 py-0.5 text-xs text-primary">Principal</span>
            )}
            {!variant.isActive && <span className="rounded-full bg-muted px-1.5 py-0.5 text-xs">Inactiva</span>}
          </span>
          <span className="block truncate font-mono text-xs text-muted-foreground">{variant.sku}</span>
        </span>
        <span className="flex flex-wrap gap-x-4 gap-y-1 sm:contents">
          {priceLists.map(list => {
            const price = variant.prices.find(item => item.priceListId === list.id)
            return (
              <span key={list.id} className="flex flex-col text-sm tabular-nums sm:w-32 sm:text-right">
                <span className="text-xs text-muted-foreground sm:hidden">
                  {list.audience === 'RETAIL' ? 'Minorista' : 'Clientes frec.'}
                </span>
                {price ? (
                  formatMoneyExact({ amount: price.amount, currency: price.currency })
                ) : (
                  <span className="text-muted-foreground">—</span>
                )}
                {price?.currency === 'USD' && usdRate && (
                  <span className="text-xs text-muted-foreground">
                    ≈ {formatMoney({ amount: convertToArs(price.amount, usdRate), currency: 'ARS' })}
                  </span>
                )}
              </span>
            )
          })}
          <span className="flex flex-col sm:w-24 sm:text-right">
            <span className="text-xs text-muted-foreground sm:hidden">Stock</span>
            <StockLabel available={variant.available} availability={variant.availability} />
          </span>
        </span>
      </button>
      <RowActions
        itemName={variantTitle(variant)}
        actions={[
          { label: 'Editar', icon: PencilSimpleIcon, onSelect: onEdit },
          {
            label: 'Hacer principal',
            icon: StarIcon,
            onSelect: onMakeDefault,
            disabled: variant.isDefault || !variant.isActive,
          },
          { label: 'Archivar…', icon: ArchiveIcon, onSelect: onArchive, destructive: true },
        ]}
      />
    </li>
  )
}
