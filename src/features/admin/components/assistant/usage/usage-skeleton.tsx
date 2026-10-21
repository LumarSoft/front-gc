import { Card } from '@/src/components/ui/card'
import { KpiTilesSkeleton } from '@/src/features/admin/components/analytics/analytics-skeleton'

/** Same layout as the usage page (numbers, then two charts), so nothing jumps when they arrive. */
export function UsageSkeleton() {
  return (
    <div aria-busy aria-label="Cargando el consumo" className="flex flex-col gap-4">
      <KpiTilesSkeleton />
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="h-72" />
        <Card className="h-72" />
      </div>
    </div>
  )
}
