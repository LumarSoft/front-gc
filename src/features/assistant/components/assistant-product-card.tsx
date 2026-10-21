'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/src/components/ui/button'
import { ProductImagePlaceholder } from '@/src/features/catalog/components/product-image-placeholder'
import { getAvailabilityLabel } from '@/src/features/catalog/lib/availability'
import { useAddToCart } from '@/src/features/cart/hooks/use-add-to-cart'
import { formatMoney, getDiscountPercent } from '@/src/lib/format'
import { cn } from '@/src/lib/utils'
import type { AssistantProductCard as Card } from '@/src/types/api/assistant'

type AssistantProductCardProps = {
  product: Card
  /** 1-based place in the recommendation, printed like a plate number. */
  position: number
  onNavigate: () => void
}

/** A recommended product inside the chat: what it costs, whether there is stock, and the way to buy it. */
export function AssistantProductCard({ product, position, onNavigate }: AssistantProductCardProps) {
  const href = `/productos/${product.slug}`
  const variant =
    product.variantId !== null
      ? { id: product.variantId, price: product.price, availability: product.availability }
      : undefined
  const cart = useAddToCart(variant, product.id)
  const availability = getAvailabilityLabel(product.availability, product.outOfStockBehavior)
  const discount =
    product.price && product.compareAtPrice ? getDiscountPercent(product.price, product.compareAtPrice) : 0

  return (
    <article className="flex gap-3 rounded-2xl border bg-card p-3">
      <Link
        href={href}
        onClick={onNavigate}
        className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-white"
        tabIndex={-1}
        aria-hidden
      >
        {product.imageUrl ? (
          <Image src={product.imageUrl} alt="" fill sizes="80px" className="object-contain p-1.5" />
        ) : (
          <ProductImagePlaceholder label={product.brand?.name} />
        )}
        <span className="absolute top-1 left-1 rounded-full bg-foreground px-1.5 text-xs leading-4 font-bold text-background tabular-nums">
          {String(position).padStart(2, '0')}
        </span>
      </Link>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <h3 className="line-clamp-2 text-sm leading-snug font-semibold">
          <Link href={href} onClick={onNavigate} className="hover:text-primary">
            {product.name}
          </Link>
        </h3>
        <p className="flex flex-wrap items-baseline gap-x-2">
          <span className="text-base font-extrabold tracking-tight">
            {product.price ? formatMoney(product.price) : 'Consultá el precio'}
          </span>
          {discount > 0 && product.compareAtPrice && (
            <span className="text-xs text-muted-foreground line-through">{formatMoney(product.compareAtPrice)}</span>
          )}
        </p>
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
        <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1.5">
          {cart.canAdd ? (
            <Button
              size="sm"
              onClick={event => cart.add(event.currentTarget)}
              disabled={cart.pending}
              className="h-8 rounded-full px-3.5 text-xs font-bold"
            >
              {cart.pending ? 'Agregando…' : cart.added ? 'Agregar otro' : 'Agregar al carrito'}
            </Button>
          ) : (
            product.variantCount > 1 && (
              <Button asChild size="sm" className="h-8 rounded-full px-3.5 text-xs font-bold">
                <Link href={href} onClick={onNavigate}>
                  Elegir opción
                </Link>
              </Button>
            )
          )}
          <Link
            href={href}
            onClick={onNavigate}
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-navy"
          >
            Ver ficha
            <ArrowRight strokeWidth={2} className="size-3.5" aria-hidden />
          </Link>
        </div>
        {cart.error && (
          <p role="alert" className="text-xs text-destructive">
            {cart.error}
          </p>
        )}
      </div>
    </article>
  )
}
