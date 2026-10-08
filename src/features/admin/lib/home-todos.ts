import type { AdminDashboard } from '@/src/types/api/admin-dashboard'
import type { OrderCounts } from '@/src/types/api/orders'

export type HomeTodo = { label: string; count: number; href: string }

/** What is waiting, in the order staff usually handle it; only the ones with something to do. */
export function homeTodos(orders: OrderCounts | undefined, todo: AdminDashboard['todo'] | undefined): HomeTodo[] {
  const items: HomeTodo[] = [
    { label: 'Verificar pagos', count: orders?.PENDING_PAYMENT ?? 0, href: '/admin/pedidos?stage=PENDING_PAYMENT' },
    { label: 'Preparar pedidos', count: orders?.TO_FULFILL ?? 0, href: '/admin/pedidos?stage=TO_FULFILL' },
    { label: 'Entregar pedidos', count: orders?.READY ?? 0, href: '/admin/pedidos?stage=READY' },
    {
      label: 'Revisar solicitudes',
      count: todo?.wholesalePending ?? 0,
      href: '/admin/clientes-frecuentes?status=PENDING',
    },
    {
      label: 'Reponer stock',
      count: todo?.publishedOutOfStock ?? 0,
      href: '/admin/productos?status=PUBLISHED&stock=out',
    },
    { label: 'Terminar borradores', count: todo?.drafts ?? 0, href: '/admin/productos?status=DRAFT' },
  ]
  return items.filter(item => item.count > 0)
}
