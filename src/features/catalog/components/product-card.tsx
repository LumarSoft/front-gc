import Image from 'next/image'
import Link from 'next/link'
import { ArrowRightIcon } from '@phosphor-icons/react/dist/ssr'
import { ProductBadge } from '@/src/features/catalog/components/product-badge'
import { ProductImagePlaceholder } from '@/src/features/catalog/components/product-image-placeholder'
import { getAvailabilityLabel } from '@/src/features/catalog/lib/availability'
import { formatMoney, getDiscountPercent } from '@/src/lib/format'
import { cn } from '@/src/lib/utils'
import type { ProductSummary } from '@/src/types/api/catalog'

type ProductCardProps = {
  product: ProductSummary
  /** Pass true for the first cards of a page so the browser loads them early. */
  priority?: boolean
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const href = `/productos/${product.slug}`
  const discount =
    product.price && product.compareAtPrice ? getDiscountPercent(product.price, product.compareAtPrice) : 0
  const availability = getAvailabilityLabel(product.availability, product.outOfStockBehavior)
  const isUnavailable = product.availability === 'OUT_OF_STOCK'

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10">
      <div className={cn('relative aspect-square bg-white', isUnavailable && 'opacity-60')}>
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            loading={priority ? 'eager' : 'lazy'}
            sizes="(min-width: 1280px) 280px, (min-width: 768px) 30vw, 50vw"
            className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <ProductImagePlaceholder label={product.brand?.name} />
        )}
        <div className="absolute top-3 left-3 flex flex-col items-start gap-1.5">
          {product.badge && <ProductBadge badge={product.badge} />}
          {discount > 0 && (
            <span className="rounded-full bg-foreground px-2 py-0.5 text-xs font-bold text-background">
              -{discount}%
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2 border-t p-3 sm:p-4">
        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">{product.category.name}</p>
        <h3 className="line-clamp-2 text-sm leading-snug font-semibold">
          <Link href={href} className="after:absolute after:inset-0">
            {product.name}
          </Link>
        </h3>
        {product.variantCount > 1 && (
          <p className="text-xs text-muted-foreground">{product.variantCount} opciones disponibles</p>
        )}
        <div className="mt-auto flex flex-col gap-0.5 pt-2">
          {product.compareAtPrice && discount > 0 && (
            <p className="text-xs text-muted-foreground line-through">{formatMoney(product.compareAtPrice)}</p>
          )}
          {product.price ? (
            <p className="text-lg font-extrabold tracking-tight sm:text-xl">
              {product.variantCount > 1 && (
                <span className="mr-1 text-xs font-medium text-muted-foreground">desde</span>
              )}
              {formatMoney(product.price)}
            </p>
          ) : (
            <p className="text-sm font-semibold">Consultá el precio</p>
          )}
          {availability && (
            <p
              className={cn(
                'text-xs font-semibold',
                availability.tone === 'warning' ? 'text-sale' : 'text-muted-foreground',
              )}
            >
              {availability.text}
            </p>
          )}
        </div>
        <span className="mt-2 hidden h-10 items-center justify-center gap-2 rounded-full bg-primary text-sm font-semibold text-primary-foreground transition-colors group-hover:bg-navy sm:flex">
          Ver producto
          <ArrowRightIcon
            weight="regular"
            className="size-4 transition-transform group-hover:translate-x-0.5"
            aria-hidden
          />
        </span>
      </div>
    </article>
  )
}
