import { cn } from '@/src/lib/utils'
import type { Availability } from '@/src/types/api/catalog'

type StockLabelProps = {
  available: number | null
  availability: Availability
}

/** "12 en stock" or "Sin stock", colored when it needs attention. */
export function StockLabel({ available, availability }: StockLabelProps) {
  if (availability === 'OUT_OF_STOCK') return <span className="text-sm font-medium text-destructive">Sin stock</span>
  return (
    <span className={cn('text-sm tabular-nums', availability === 'LOW_STOCK' && 'font-medium text-warning')}>
      {available ?? 0} en stock
    </span>
  )
}
