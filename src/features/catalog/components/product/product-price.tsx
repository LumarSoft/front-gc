import { formatMoney, getDiscountPercent } from '@/src/lib/format'
import { cn } from '@/src/lib/utils'
import type { AvailabilityLabel } from '@/src/features/catalog/lib/availability'
import type { Money } from '@/src/types/api/money'
import type { ProductVariant, SaleUnit } from '@/src/types/api/catalog'

const SALE_UNIT_LABEL: Record<SaleUnit, string> = {
  UNIT: 'unidad',
  BOX: 'caja',
  PACK: 'pack',
  ROLL: 'rollo',
  METER: 'metro',
  SQUARE_METER: 'm²',
  LITER: 'litro',
  KIT: 'kit',
}

type ProductPriceProps = {
  price: Money | null
  compareAtPrice: Money | null
  availability: AvailabilityLabel | null
  variant: ProductVariant | undefined
}

export function ProductPrice({ price, compareAtPrice, availability, variant }: ProductPriceProps) {
  const discount = price && compareAtPrice ? getDiscountPercent(price, compareAtPrice) : 0

  return (
    <div className="rounded-3xl bg-surface p-5">
      {compareAtPrice && discount > 0 && (
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="line-through">{formatMoney(compareAtPrice)}</span>
          <span className="rounded-full bg-sale px-2 py-0.5 text-xs font-bold text-sale-foreground">-{discount}%</span>
        </p>
      )}
      <p className="text-3xl font-extrabold tracking-tight">{price ? formatMoney(price) : 'Consultá el precio'}</p>
      {variant && variant.saleUnit !== 'UNIT' && (
        <p className="text-sm text-muted-foreground">
          Precio por {SALE_UNIT_LABEL[variant.saleUnit]}
          {variant.unitsPerSaleUnit > 1 && ` (${variant.unitsPerSaleUnit} unidades)`}
        </p>
      )}
      <p
        className={cn(
          'mt-2 text-sm font-semibold',
          availability?.tone === 'warning' ? 'text-sale' : availability ? 'text-muted-foreground' : 'text-success',
        )}
      >
        {availability?.text ?? 'En stock'}
      </p>
    </div>
  )
}
