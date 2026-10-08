import { Card } from '@/src/components/ui/card'
import { Skeleton } from '@/src/components/ui/skeleton'

const WIDTHS = ['w-11/12', 'w-3/4', 'w-3/5', 'w-1/2']

/** Same layout as the order page, so nothing jumps when it loads. */
export function OrderDetailSkeleton() {
  return (
    <div aria-busy aria-label="Cargando pedido">
      <div className="mb-5 flex items-center gap-3">
        <Skeleton className="size-8 rounded-lg" />
        <Skeleton className="h-6 w-36" />
        <Skeleton className="h-5 w-24 rounded-md" />
      </div>
      <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="flex flex-col gap-4">
          {[3, 4, 3].map((rows, card) => (
            <Card key={card} className="gap-3 p-4">
              {Array.from({ length: rows }, (_, row) => (
                <Skeleton key={row} className={`h-4 ${WIDTHS[row]}`} />
              ))}
            </Card>
          ))}
        </div>
        <div className="flex flex-col gap-4">
          {[3, 2].map((rows, card) => (
            <Card key={card} className="gap-3 p-4">
              {Array.from({ length: rows }, (_, row) => (
                <Skeleton key={row} className={`h-4 ${WIDTHS[row + 1]}`} />
              ))}
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
