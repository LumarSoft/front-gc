'use client'

import { AdminPageHeader } from '@/src/features/admin/components/admin-page-header'
import { AnalyticsPanel, type AnalyticsParams } from '@/src/features/admin/components/analytics/analytics-panel'
import { AnalyticsReport } from '@/src/features/admin/components/analytics/analytics-report'
import { BehaviorReport } from '@/src/features/admin/components/analytics/behavior/behavior-report'
import { ViewTabs } from '@/src/features/admin/components/common/view-tabs'
import { useAdminAnalytics, useAdminBehavior } from '@/src/features/admin/hooks/use-admin-analytics'
import { useAnalyticsParams } from '@/src/features/admin/hooks/use-analytics-params'
import type { AnalyticsView as View } from '@/src/features/admin/lib/analytics-display'

const VIEWS: { value: View; label: string }[] = [
  { value: 'sales', label: 'Ventas' },
  { value: 'visits', label: 'Visitas' },
]

const DESCRIPTION: Record<View, string> = {
  sales: 'Cómo vendió la tienda en el período elegido, comparado con el anterior de la misma duración.',
  visits: 'Qué hicieron los visitantes en la tienda: qué miraron, qué buscaron y dónde dejaron la compra.',
}

/** "Estadísticas": sales and store visits of a period, against the previous one. */
export function AnalyticsView() {
  const params = useAnalyticsParams()

  return (
    <div className="mx-auto flex max-w-6xl flex-col">
      <AdminPageHeader title="Estadísticas" description={DESCRIPTION[params.view]} />
      <div className="mb-3">
        <ViewTabs label="Qué ver" options={VIEWS} value={params.view} onChange={params.setView} />
      </div>
      {params.view === 'sales' ? <SalesTab params={params} /> : <VisitsTab params={params} />}
    </div>
  )
}

function SalesTab({ params }: { params: AnalyticsParams }) {
  const query = useAdminAnalytics({ ...params.range, groupBy: params.groupBy })
  return (
    <AnalyticsPanel params={params} query={query} errorMessage="No pudimos cargar las ventas.">
      {data => <AnalyticsReport analytics={data} />}
    </AnalyticsPanel>
  )
}

function VisitsTab({ params }: { params: AnalyticsParams }) {
  const query = useAdminBehavior({ ...params.range, groupBy: params.groupBy })
  return (
    <AnalyticsPanel params={params} query={query} errorMessage="No pudimos cargar las visitas.">
      {data => <BehaviorReport behavior={data} />}
    </AnalyticsPanel>
  )
}
