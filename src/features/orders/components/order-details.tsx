import { formatDateTime, formatMoneyExact } from '@/src/lib/format'
import type { Order } from '@/src/types/api/orders'

export function OrderDetails({ order }: { order: Order }) {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border p-5 sm:p-6">
        <h2 className="text-lg font-bold">Tu compra</h2>
        <ul className="mt-4 divide-y">
          {order.items.map((item, index) => (
            <li key={`${item.sku}-${index}`} className="flex justify-between gap-4 py-4">
              <div className="min-w-0">
                <p className="font-semibold">{item.name}</p>
                {item.variantName && <p className="text-sm text-muted-foreground">{item.variantName}</p>}
                <p className="mt-1 text-sm text-muted-foreground">
                  {item.quantity} × {formatMoneyExact(item.unitPrice)}
                </p>
              </div>
              <p className="shrink-0 text-sm font-semibold">{formatMoneyExact(item.total)}</p>
            </li>
          ))}
        </ul>
        <dl className="space-y-3 border-t pt-4 text-sm">
          <div className="flex justify-between gap-4">
            <dt>Productos</dt>
            <dd>{formatMoneyExact(order.subtotal)}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt>Entrega</dt>
            <dd>{formatMoneyExact(order.shippingTotal)}</dd>
          </div>
          <div className="flex justify-between gap-4 text-lg font-bold">
            <dt>Total</dt>
            <dd>{formatMoneyExact(order.total)}</dd>
          </div>
        </dl>
      </section>
      <section className="rounded-2xl border p-5 sm:p-6">
        <h2 className="text-lg font-bold">Contacto y entrega</h2>
        <p className="mt-3">{order.customer.name}</p>
        <p className="break-all text-sm text-muted-foreground">{order.customer.email}</p>
        {order.customer.phone && <p className="text-sm text-muted-foreground">{order.customer.phone}</p>}
        <p className="mt-4 font-semibold">
          {order.deliveryMethod === 'STORE_PICKUP' ? 'Retiro en el local' : 'Entrega en Rosario'}
        </p>
        {order.shippingAddress && (
          <p className="mt-1 text-sm text-muted-foreground">
            {order.shippingAddress.street} {order.shippingAddress.streetNumber}, {order.shippingAddress.city},{' '}
            {order.shippingAddress.province} · CP {order.shippingAddress.postalCode}
          </p>
        )}
        <p className="mt-4 text-xs text-muted-foreground">Registrado el {formatDateTime(order.placedAt)}</p>
      </section>
    </div>
  )
}
