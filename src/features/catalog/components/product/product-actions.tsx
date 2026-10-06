import Link from 'next/link'
import { Button } from '@/src/components/ui/button'
import type { AddToCartState } from '@/src/features/cart/hooks/use-add-to-cart'

type ProductActionsProps = {
  inquiryHref: string
  cart: AddToCartState
}

export function ProductActions({ inquiryHref, cart }: ProductActionsProps) {
  return (
    <div className="flex flex-col gap-3">
      <Button
        size="lg"
        disabled={!cart.canAdd || cart.pending}
        onClick={event => cart.add(event.currentTarget)}
        className="h-12 rounded-full text-base font-bold"
      >
        {cart.pending ? 'Agregando…' : 'Agregar al carrito'}
      </Button>
      {cart.added && (
        <p role="status" className="text-center text-sm text-success">
          Agregaste el producto.{' '}
          <button
            type="button"
            onClick={event => cart.openCart(event.currentTarget)}
            className="font-semibold underline"
          >
            Ver carrito
          </button>
        </p>
      )}
      {cart.error && (
        <p role="alert" className="text-center text-sm text-destructive">
          {cart.error}
        </p>
      )}
      {!cart.canAdd && (
        <p className="text-center text-xs text-muted-foreground">
          Consultanos para conocer el precio o la disponibilidad.
        </p>
      )}
      <Button asChild size="lg" variant="outline" className="h-12 rounded-full text-base font-semibold">
        <Link href={inquiryHref}>Consultar por este producto</Link>
      </Button>
    </div>
  )
}
