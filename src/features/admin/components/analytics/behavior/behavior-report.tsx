import { AbandonedCartsCard } from '@/src/features/admin/components/analytics/behavior/abandoned-carts-card'
import { BehaviorKpis } from '@/src/features/admin/components/analytics/behavior/behavior-kpis'
import { FunnelCard } from '@/src/features/admin/components/analytics/behavior/funnel-card'
import { SearchesCard } from '@/src/features/admin/components/analytics/behavior/searches-card'
import { TrackingNotice } from '@/src/features/admin/components/analytics/behavior/tracking-notice'
import { ViewedProductsCard } from '@/src/features/admin/components/analytics/behavior/viewed-products-card'
import { VisitorsCard } from '@/src/features/admin/components/analytics/behavior/visitors-card'
import { pluralize, share } from '@/src/features/admin/lib/analytics-display'
import type { AdminBehavior } from '@/src/types/api/admin-behavior'

/** Every card of the "Visitas" tab: visitors, the purchase funnel, interest per product, searches and carts. */
export function BehaviorReport({ behavior }: { behavior: AdminBehavior }) {
  const { searches } = behavior
  return (
    <div className="flex flex-col gap-4">
      <TrackingNotice behavior={behavior} />
      <BehaviorKpis behavior={behavior} />
      <VisitorsCard behavior={behavior} />
      <div className="grid items-start gap-4 lg:grid-cols-2">
        <FunnelCard funnel={behavior.funnel.current} />
        <AbandonedCartsCard carts={behavior.carts} />
      </div>
      <ViewedProductsCard products={behavior.products} />
      <div className="grid items-start gap-4 lg:grid-cols-2">
        <SearchesCard
          title="Lo más buscado"
          note={pluralize(searches.total.current, 'búsqueda', 'búsquedas')}
          rows={searches.top}
          empty="Nadie buscó en este período."
        />
        <SearchesCard
          title="Búsquedas sin resultados"
          note={`${share(searches.withoutResults.current, searches.total.current)} % de las búsquedas`}
          rows={searches.unanswered}
          empty="Todas las búsquedas encontraron algo."
          hint="Lo que la gente busca y no encuentra: productos para sumar al catálogo, o nombres y etiquetas para revisar."
        />
      </div>
    </div>
  )
}
