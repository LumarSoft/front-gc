'use client'

import Link from 'next/link'
import { CartIcon, cartLabel } from '@/src/features/cart/components/cart-icon'
import { useCart } from '@/src/features/cart/hooks/use-cart'

/** Back to the cart page, with the same icon and count as the store header. */
export function CheckoutCartLink() {
  const { data } = useCart()
  const count = data?.itemCount ?? 0
  return (
    <Link
      href="/carrito"
      aria-label={`Volver al ${cartLabel(count).toLowerCase()}`}
      className="flex h-10 items-center rounded-md px-2 text-foreground hover:bg-accent"
    >
      <CartIcon count={count} />
    </Link>
  )
}
