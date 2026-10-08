import { Card } from '@/src/components/ui/card'
import { Skeleton } from '@/src/components/ui/skeleton'

/** Same layout as the home, so nothing jumps when the numbers arrive. */
export function HomeSkeleton() {
  return (
    <div aria-busy aria-label="Cargando el resumen" className="mx-auto flex max-w-5xl flex-col items-center">
      <div className="flex w-full justify-center gap-10 py-2">
        {[0, 1, 2].map(item => (
          <Skeleton key={item} className="h-12 w-28" />
        ))}
      </div>
      <Skeleton className="mt-10 h-7 w-24" />
      <Skeleton className="mt-2 h-7 w-80 max-w-full" />
      <Skeleton className="mt-6 h-9 w-72 max-w-full rounded-xl" />
      <div className="mt-10 grid w-full gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <Card className="h-80" />
        <Card className="h-80" />
      </div>
    </div>
  )
}
