'use client'

import { HandbagIcon } from '@phosphor-icons/react'
import { Button } from '@/src/components/ui/button'
import { useCart } from '@/src/features/cart/hooks/use-cart'
import { useCartDrawer } from '@/src/features/cart/hooks/use-cart-drawer'

export function CartLink() {
  const { data } = useCart()
  const { openCart } = useCartDrawer()
  const count = data?.itemCount ?? 0
  return (
    <Button
      size="icon-lg"
      className="relative rounded-full"
      onClick={event => openCart(event.currentTarget)}
      aria-haspopup="dialog"
      aria-label={count ? `Carrito, ${count} ${count === 1 ? 'unidad' : 'unidades'}` : 'Carrito'}
    >
      <HandbagIcon weight="light" className="size-6" />
      {count > 0 && (
        <span
          aria-hidden="true"
          className="absolute -top-1 -right-1 flex min-w-5 items-center justify-center rounded-full bg-sale px-1 text-xs font-bold text-sale-foreground"
        >
          {count > 99 ? '99+' : count}
        </span>
      )}
    </Button>
  )
}
