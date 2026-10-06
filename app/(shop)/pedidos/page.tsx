import type { Metadata } from 'next'
import { OpenOrderLink } from '@/src/features/orders/components/open-order-link'

export const metadata: Metadata = {
  title: 'Seguí tu pedido',
  robots: { index: false, follow: false },
  referrer: 'no-referrer',
}
export default function OrdersPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-extrabold">Seguí tu pedido</h1>
      <p className="mt-4 text-muted-foreground">
        No necesitás una cuenta. Abrí el enlace privado que guardaste al confirmar tu compra o pegalo acá para consultar
        el estado.
      </p>
      <OpenOrderLink />
      <p className="mt-6 text-sm text-muted-foreground">
        Si perdiste el enlace, contactá al local con tu número de pedido para que el equipo pueda ayudarte. Por
        seguridad, el número y el email por sí solos no dan acceso a los datos de la compra.
      </p>
    </div>
  )
}
