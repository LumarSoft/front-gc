'use client'

import { Card } from '@/src/components/ui/card'
import { AdminPageHeader } from '@/src/features/admin/components/admin-page-header'
import { UsageCharts } from '@/src/features/admin/components/assistant/usage/usage-charts'
import { UsageKpis } from '@/src/features/admin/components/assistant/usage/usage-kpis'
import { UsageSkeleton } from '@/src/features/admin/components/assistant/usage/usage-skeleton'
import { DateRangePicker } from '@/src/features/admin/components/date-range/date-range-picker'
import { QueryErrorState } from '@/src/features/admin/components/feedback/query-error-state'
import { useAssistantUsage } from '@/src/features/admin/hooks/use-admin-assistant'
import { useDashboardRange } from '@/src/features/admin/hooks/use-dashboard-range'
import { cn } from '@/src/lib/utils'

/** "Consumo": how much the assistant is used, to keep it within the monthly fee. The period lives in the URL. */
export function UsageView() {
  const { range, setRange } = useDashboardRange()
  const query = useAssistantUsage(range)

  return (
    <div className="mx-auto flex max-w-6xl flex-col">
      <AdminPageHeader
        title="Consumo del asesor"
        description="Conversaciones y tokens que usó el asesor IA. Los tokens son lo que cobra el proveedor de IA por cada respuesta; si un día se llega al límite, el asesor se pausa hasta la medianoche."
      />
      <div className="mb-3">
        <DateRangePicker value={range} onChange={setRange} />
      </div>
      {query.isPending ? (
        <UsageSkeleton />
      ) : query.isError ? (
        <Card className="py-0">
          <QueryErrorState message="No pudimos cargar el consumo." onRetry={() => void query.refetch()} />
        </Card>
      ) : (
        <div
          className={cn('flex flex-col gap-4 transition-opacity duration-200', query.isPlaceholderData && 'opacity-50')}
        >
          <UsageKpis usage={query.data} />
          <UsageCharts usage={query.data} />
        </div>
      )}
    </div>
  )
}
