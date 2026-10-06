'use client'

import Link from 'next/link'
import { Button } from '@/src/components/ui/button'
import { Checkbox } from '@/src/components/ui/checkbox'
import { ConfirmDialog } from '@/src/components/ui/confirm-dialog'
import { AdminPageHeader } from '../admin-page-header'
import { useAdminOrder } from '../../hooks/use-admin-orders'
import { OrderDetails } from '@/src/features/orders/components/order-details'
import { OrderProgress } from '@/src/features/orders/components/order-progress'
import { ORDER_LABELS } from '@/src/features/orders/lib/order-labels'

export function AdminOrderView({ id }: { id: number }) {
  const { query, mutation, paymentReceived, setPaymentReceived, cancelOpen, setCancelOpen, requestStatus, cancel } =
    useAdminOrder(id)
  if (query.isPending) return <p role="status">Cargando pedido…</p>
  if (query.isError)
    return (
      <div role="alert">
        <p>No pudimos cargar este pedido.</p>
        <Button className="mt-3" onClick={() => void query.refetch()}>
          Reintentar
        </Button>
      </div>
    )
  const order = query.data
  return (
    <div className="space-y-6">
      <Button variant="outline" asChild>
        <Link href="/admin/pedidos">← Volver a pedidos</Link>
      </Button>
      <AdminPageHeader
        title={`Pedido ${order.number}`}
        description="Pago y seguimiento gestionados por el equipo del local."
      />
      <section className="space-y-4 rounded-2xl border bg-card p-5">
        <h2 className="font-bold">Actualizar estado</h2>
        {order.allowedStatuses?.includes('CONFIRMED') && (
          <label className="flex items-start gap-3 text-sm">
            <Checkbox
              checked={paymentReceived}
              onCheckedChange={value => setPaymentReceived(value === true)}
              disabled={mutation.isPending}
            />
            <span>Verifiqué que se recibió el pago completo de este pedido.</span>
          </label>
        )}
        <div className="flex flex-wrap gap-3">
          {order.allowedStatuses?.map(status => (
            <Button
              key={status}
              variant={status === 'CANCELLED' ? 'outline' : 'default'}
              disabled={mutation.isPending || (status === 'CONFIRMED' && !paymentReceived)}
              onClick={() => requestStatus(status)}
            >
              {status === 'CONFIRMED'
                ? 'Confirmar pago y pedido'
                : status === 'CANCELLED'
                  ? 'Cancelar y liberar reserva'
                  : `Marcar: ${ORDER_LABELS[status].label}`}
            </Button>
          ))}
        </div>
        {!order.allowedStatuses?.length && (
          <p className="text-sm text-muted-foreground">Este pedido no tiene cambios de estado disponibles.</p>
        )}
      </section>
      <div className="grid items-start gap-6 lg:grid-cols-3">
        <div className="lg:col-start-3 lg:row-start-1">
          <OrderProgress order={order} staff />
        </div>
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1">
          <OrderDetails order={order} staff />
        </div>
      </div>
      <ConfirmDialog
        open={cancelOpen}
        onOpenChange={setCancelOpen}
        title={`¿Cancelar ${order.number}?`}
        description="Se liberará el stock reservado. El pedido y su historial se conservan, y este pedido no podrá reabrirse."
        confirmLabel="Cancelar pedido"
        destructive
        onConfirm={cancel}
      />
    </div>
  )
}
