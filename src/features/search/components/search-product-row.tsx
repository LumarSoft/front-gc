import Image from 'next/image'
import { ProductImagePlaceholder } from '@/src/features/catalog/components/product-image-placeholder'
import { getAvailabilityLabel } from '@/src/features/catalog/lib/availability'
import { HighlightedText } from '@/src/features/search/components/highlighted-text'
import { formatMoney } from '@/src/lib/format'
import { cn } from '@/src/lib/utils'
import type { ProductSummary } from '@/src/types/api/catalog'

type SearchProductRowProps = {
  product: ProductSummary
  highlight: string
}

/** A product suggested while typing: photo, name with the matching words, category, stock and price. */
export function SearchProductRow({ product, highlight }: SearchProductRowProps) {
  const availability = getAvailabilityLabel(product.availability, product.outOfStockBehavior)
  return (
    <>
      <span className="relative size-14 shrink-0 overflow-hidden rounded-lg border bg-white">
        {product.imageUrl ? (
          <Image src={product.imageUrl} alt="" fill sizes="56px" className="object-contain p-1" />
        ) : (
          <ProductImagePlaceholder />
        )}
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="line-clamp-2 text-sm leading-snug">
          <HighlightedText text={product.name} query={highlight} />
        </span>
        <span className="truncate text-xs text-muted-foreground">
          {product.category.name}
          {availability && (
            <span className={cn(availability.tone === 'warning' && 'font-semibold text-sale')}>
              {' · '}
              {availability.text}
            </span>
          )}
        </span>
      </span>
      <span className="shrink-0 text-right text-sm font-bold tracking-tight tabular-nums">
        {product.price ? (
          <>
            {product.variantCount > 1 && <span className="block text-xs font-medium text-muted-foreground">desde</span>}
            {formatMoney(product.price)}
          </>
        ) : (
          <span className="text-xs font-semibold text-muted-foreground">Consultá</span>
        )}
      </span>
    </>
  )
}
