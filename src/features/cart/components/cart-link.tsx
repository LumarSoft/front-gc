'use client'

import Link from 'next/link'
import { HandbagIcon } from '@phosphor-icons/react'
import { Button } from '@/src/components/ui/button'
import { useCart } from '@/src/features/cart/hooks/use-cart'

export function CartLink() {
  const { data } = useCart()
  const count = data?.itemCount ?? 0
  return (
    <Button asChild size="icon-lg" className="relative rounded-full">
      <Link href="/carrito" aria-label={count ? `Carrito, ${count} ${count === 1 ? 'unidad' : 'unidades'}` : 'Carrito'}>
        <HandbagIcon weight="light" className="size-6" />
        {count > 0 && (
          <span
            aria-hidden="true"
            className="absolute -top-1 -right-1 flex min-w-5 items-center justify-center rounded-full bg-sale px-1 text-xs font-bold text-sale-foreground"
          >
            {count > 99 ? '99+' : count}
          </span>
        )}
      </Link>
    </Button>
  )
}
