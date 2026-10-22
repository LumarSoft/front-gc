import Link from 'next/link'
import { AdminCard } from '@/src/features/admin/components/common/admin-card'
import { SystemFact, SystemFacts } from '@/src/features/admin/components/system/system-fact'
import { formatFromNow } from '@/src/features/admin/lib/relative-date'
import { formatMoneyExact } from '@/src/lib/format'
import type { SystemStatus } from '@/src/types/api/admin-system'

/** Store data that, when off, breaks prices or how products look. */
export function SystemStoreCard({ store }: { store: SystemStatus['store'] }) {
  return (
    <AdminCard title="Datos de la tienda">
      <SystemFacts>
        <SystemFact label="Cotización del dólar">
          {store.exchangeRate ? (
            <>
              {formatMoneyExact({ amount: store.exchangeRate.rate, currency: 'ARS' })}
              <span className="block text-xs font-normal text-muted-foreground">
                cargada {formatFromNow(store.exchangeRate.effectiveFrom)}
              </span>
            </>
          ) : (
            'Sin cargar'
          )}
        </SystemFact>
        <SystemFact label="Publicados sin foto">{store.publishedWithoutImages}</SystemFact>
        <SystemFact label="Publicados sin stock">
          {store.publishedOutOfStock > 0 ? (
            <Link href="/admin/productos?status=PUBLISHED&stock=out" className="text-primary hover:underline">
              {store.publishedOutOfStock}
            </Link>
          ) : (
            0
          )}
        </SystemFact>
        <SystemFact label="Pedidos esperando pago">
          {store.awaitingPayment > 0 ? (
            <Link href="/admin/pedidos" className="text-primary hover:underline">
              {store.awaitingPayment}
            </Link>
          ) : (
            0
          )}
        </SystemFact>
      </SystemFacts>
    </AdminCard>
  )
}
