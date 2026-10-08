import { BarList, type BarListRow } from '@/src/features/admin/components/analytics/bar-list'
import { AdminCard } from '@/src/features/admin/components/common/admin-card'
import { share } from '@/src/features/admin/lib/analytics-display'
import type { Funnel } from '@/src/types/api/admin-behavior'

const STEPS: { key: keyof Funnel; label: string }[] = [
  { key: 'visited', label: 'Entraron a la tienda' },
  { key: 'viewedProduct', label: 'Vieron un producto' },
  { key: 'addedToCart', label: 'Agregaron al carrito' },
  { key: 'startedCheckout', label: 'Empezaron la compra' },
  { key: 'placedOrder', label: 'Hicieron el pedido' },
]

/** How far visitors got in the purchase: each step against the visitors and against the step before. */
export function FunnelCard({ funnel }: { funnel: Funnel }) {
  const rows: BarListRow[] =
    funnel.visited === 0
      ? []
      : STEPS.map(({ key, label }, index) => {
          const before = index > 0 ? funnel[STEPS[index - 1].key] : null
          return {
            key,
            label,
            value: funnel[key],
            display: `${new Intl.NumberFormat('es-AR').format(funnel[key])} · ${share(funnel[key], funnel.visited)} %`,
            detail: before !== null ? `${share(funnel[key], before)} % del paso anterior` : undefined,
          }
        })

  return (
    <AdminCard
      title="Recorrido de compra"
      aside={<span className="text-xs text-muted-foreground">Visitantes únicos</span>}
    >
      <BarList rows={rows} empty="Todavía no hay visitas en este período." />
    </AdminCard>
  )
}
