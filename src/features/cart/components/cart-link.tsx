'use client'

import { Button } from '@/src/components/ui/button'
import { useCart } from '@/src/features/cart/hooks/use-cart'
import { useCartDrawer } from '@/src/features/cart/hooks/use-cart-drawer'
import { CartIcon, cartLabel } from './cart-icon'

export function CartLink() {
  const { data } = useCart()
  const { openCart } = useCartDrawer()
  const count = data?.itemCount ?? 0
  return (
    <Button
      variant="ghost"
      className="h-10 gap-2 px-2 text-sm font-medium sm:px-2.5"
      onClick={event => openCart(event.currentTarget)}
      aria-haspopup="dialog"
      aria-label={cartLabel(count)}
    >
      <CartIcon count={count} />
      <span className="hidden pl-1 xl:inline">Carrito</span>
    </Button>
  )
}
