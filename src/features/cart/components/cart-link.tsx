'use client'

import { ShoppingCart } from 'lucide-react'
import { Button } from '@/src/components/ui/button'
import { useCart } from '@/src/features/cart/hooks/use-cart'
import { useCartDrawer } from '@/src/features/cart/hooks/use-cart-drawer'

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
      aria-label={count ? `Carrito, ${count} ${count === 1 ? 'unidad' : 'unidades'}` : 'Carrito'}
    >
      <span className="relative">
        <ShoppingCart strokeWidth={1.5} className="size-6" />
        {count > 0 && (
          <span
            aria-hidden="true"
            className="absolute -top-1.5 -right-2 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-highlight px-1 text-xs leading-none font-bold text-highlight-foreground"
          >
            {count > 99 ? '99+' : count}
          </span>
        )}
      </span>
      <span className="hidden pl-1 lg:inline">Carrito</span>
    </Button>
  )
}
