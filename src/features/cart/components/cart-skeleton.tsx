import { Skeleton } from '@/src/components/ui/skeleton'
import { cn } from '@/src/lib/utils'

export function CartSkeleton({ drawer = false }: { drawer?: boolean }) {
  return (
    <div
      className={cn('grid gap-6', drawer ? 'overflow-y-auto p-5' : 'lg:grid-cols-3')}
      role="status"
      aria-label="Cargando carrito"
    >
      <div className={cn('space-y-4', !drawer && 'lg:col-span-2')}>
        {[1, 2].map(item => (
          <Skeleton key={item} className="h-40 rounded-3xl" />
        ))}
      </div>
      <Skeleton className="h-64 rounded-3xl" />
    </div>
  )
}
