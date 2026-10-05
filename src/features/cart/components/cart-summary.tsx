import Link from 'next/link'
import { Button } from '@/src/components/ui/button'
import { formatMoneyExact } from '@/src/lib/format'
import type { Cart } from '@/src/types/api/cart'

export function CartSummary({ cart }: { cart: Cart }) {
  return (
    <aside className="h-fit rounded-3xl bg-surface p-6 lg:sticky lg:top-44" aria-label="Resumen del carrito">
      <h2 className="text-lg font-extrabold">Tu selección</h2>
      <div className="mt-6 flex items-center justify-between gap-4">
        <span className="text-sm">Subtotal</span>
        <span className="text-xl font-extrabold">
          {cart.subtotal ? formatMoneyExact(cart.subtotal) : 'A confirmar'}
        </span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">El envío se calculará al finalizar la compra.</p>
      {cart.hasIssues && (
        <p className="mt-4 text-sm text-destructive">Revisá los productos con avisos para continuar.</p>
      )}
      <div className="mt-6 border-t pt-5">
        <p className="text-sm font-semibold">La compra online estará disponible próximamente.</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Tu carrito queda guardado. Los precios y el stock se actualizan al consultarlo; agregar productos no reserva
          unidades.
        </p>
      </div>
      <Button asChild variant="outline" className="mt-6 h-11 w-full rounded-full">
        <Link href="/productos">Seguir eligiendo</Link>
      </Button>
    </aside>
  )
}
