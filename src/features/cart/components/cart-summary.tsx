import Link from 'next/link'
import { Button } from '@/src/components/ui/button'
import { formatMoneyExact } from '@/src/lib/format'
import type { Cart } from '@/src/types/api/cart'
import { cn } from '@/src/lib/utils'

export function CartSummary({
  cart,
  drawer = false,
  onContinue,
}: {
  cart: Cart
  drawer?: boolean
  onContinue?: () => void
}) {
  return (
    <aside
      className={cn('bg-surface p-6', drawer ? 'pb-safe-4 shrink-0 border-t' : 'h-fit rounded-3xl lg:sticky lg:top-44')}
      aria-label="Resumen del carrito"
    >
      {!drawer && <h2 className="text-lg font-extrabold">Tu selección</h2>}
      <div className={cn('flex items-center justify-between gap-4', !drawer && 'mt-6')}>
        <span className="text-sm">Subtotal</span>
        <span className="text-xl font-extrabold">
          {cart.subtotal ? formatMoneyExact(cart.subtotal) : 'A confirmar'}
        </span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">El envío se calculará al finalizar la compra.</p>
      {cart.hasIssues && (
        <p className="mt-4 text-sm text-destructive">Revisá los productos con avisos para continuar.</p>
      )}
      <div className={cn(drawer ? 'mt-3' : 'mt-6 border-t pt-5')}>
        <p className="text-sm font-semibold">Prepará tus datos y la entrega en el siguiente paso.</p>
        {!drawer && (
          <p className="mt-2 text-sm text-muted-foreground">
            Tu carrito queda guardado. Los precios y el stock se actualizan al consultarlo; agregar productos no reserva
            unidades.
          </p>
        )}
      </div>
      {cart.hasIssues ? (
        <Button disabled className="mt-4 h-11 w-full rounded-full font-bold">
          Continuar con mi compra
        </Button>
      ) : (
        <Button asChild className="mt-4 h-11 w-full rounded-full font-bold">
          <Link href="/finalizar-compra" onClick={onContinue}>
            Continuar con mi compra
          </Link>
        </Button>
      )}
      {drawer ? (
        <Button variant="outline" className="mt-4 h-11 w-full rounded-full" onClick={onContinue}>
          Seguir eligiendo
        </Button>
      ) : (
        <Button asChild variant="outline" className="mt-6 h-11 w-full rounded-full">
          <Link href="/productos">Seguir eligiendo</Link>
        </Button>
      )}
    </aside>
  )
}
