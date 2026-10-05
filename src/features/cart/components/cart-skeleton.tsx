import { Skeleton } from '@/src/components/ui/skeleton'

export function CartSkeleton() {
  return (
    <div className="grid gap-6 lg:grid-cols-3" role="status" aria-label="Cargando carrito">
      <div className="space-y-4 lg:col-span-2">
        {[1, 2].map(item => (
          <Skeleton key={item} className="h-40 rounded-3xl" />
        ))}
      </div>
      <Skeleton className="h-64 rounded-3xl" />
    </div>
  )
}
