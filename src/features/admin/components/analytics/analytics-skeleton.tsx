import { Card } from '@/src/components/ui/card'
import { Skeleton } from '@/src/components/ui/skeleton'

/** Same layout as the stats page, so nothing jumps when the numbers arrive. */
export function AnalyticsSkeleton() {
  return (
    <div aria-busy aria-label="Cargando las estadísticas" className="flex flex-col gap-4">
      <Card className="grid grid-cols-2 gap-0 py-0 lg:grid-cols-4">
        {[0, 1, 2, 3].map(item => (
          <div key={item} className="flex flex-col gap-2 p-4">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-6 w-28" />
            <Skeleton className="h-3 w-24" />
          </div>
        ))}
      </Card>
      <Card className="h-80" />
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="h-64" />
        <Card className="h-64" />
      </div>
    </div>
  )
}
