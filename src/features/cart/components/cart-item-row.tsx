'use client'

import Image from 'next/image'
import Link from 'next/link'
import { MinusIcon, PlusIcon, TrashIcon } from '@phosphor-icons/react'
import { Button } from '@/src/components/ui/button'
import { ProductImagePlaceholder } from '@/src/features/catalog/components/product-image-placeholder'
import { cartItemMessage } from '@/src/features/cart/lib/cart-messages'
import { formatMoneyExact } from '@/src/lib/format'
import type { CartItem } from '@/src/types/api/cart'

type CartItemRowProps = {
  item: CartItem
  pending: boolean
  onQuantity: (variantId: number, quantity: number) => void
  onRemove: (variantId: number) => void
}

export function CartItemRow({ item, pending, onQuantity, onRemove }: CartItemRowProps) {
  const message = cartItemMessage(item)
  const href = `/productos/${item.productSlug}`
  return (
    <li className="rounded-3xl border bg-card p-4 sm:p-6" aria-busy={pending}>
      <div className="flex gap-4">
        <Link
          href={href}
          className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-surface sm:size-28"
          aria-label={`Ver ${item.name}`}
        >
          {item.imageUrl ? (
            <Image src={item.imageUrl} alt={item.name} fill sizes="112px" className="object-contain p-2" />
          ) : (
            <ProductImagePlaceholder />
          )}
        </Link>
        <div className="min-w-0 flex-1">
          <Link href={href} className="text-base font-bold hover:text-primary">
            {item.name}
          </Link>
          {item.variantName && <p className="mt-1 text-sm text-muted-foreground">{item.variantName}</p>}
          <p className="mt-1 text-xs text-muted-foreground">SKU: {item.sku}</p>
          <p className="mt-2 text-sm">
            {item.unitPrice ? `${formatMoneyExact(item.unitPrice)} por unidad de venta` : 'Precio no disponible'}
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          disabled={pending}
          onClick={() => onRemove(item.variantId)}
          aria-label={`Quitar ${item.name}`}
        >
          <TrashIcon className="size-5" />
        </Button>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2" role="group" aria-label={`Cantidad de ${item.name}`}>
          <Button
            variant="outline"
            size="icon"
            disabled={pending || item.quantity <= 1}
            onClick={() => onQuantity(item.variantId, item.quantity - 1)}
            aria-label={`Reducir cantidad de ${item.name}`}
          >
            <MinusIcon />
          </Button>
          <span className="min-w-8 text-center text-sm font-semibold" aria-live="polite">
            {item.quantity}
          </span>
          <Button
            variant="outline"
            size="icon"
            disabled={pending || Boolean(item.issue) || item.quantity >= item.availableQuantity}
            onClick={() => onQuantity(item.variantId, item.quantity + 1)}
            aria-label={`Aumentar cantidad de ${item.name}`}
          >
            <PlusIcon />
          </Button>
          {item.issue === 'INSUFFICIENT_STOCK' && item.availableQuantity > 0 && (
            <Button
              variant="ghost"
              size="sm"
              disabled={pending}
              onClick={() => onQuantity(item.variantId, item.availableQuantity)}
            >
              Usar {item.availableQuantity}
            </Button>
          )}
        </div>
        <p className="text-lg font-extrabold">{item.total ? formatMoneyExact(item.total) : 'Sin subtotal'}</p>
      </div>
      {message && (
        <p className="mt-3 text-sm text-destructive" role="status">
          {message}
        </p>
      )}
    </li>
  )
}
