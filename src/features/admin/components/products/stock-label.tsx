import { cn } from '@/src/lib/utils'
import type { Availability } from '@/src/types/api/catalog'

type StockLabelProps = {
  available: number | null
  availability: Availability
}

/** "12 u.", "Pocas: 2 u." or "Sin stock", colored by availability. */
export function StockLabel({ available, availability }: StockLabelProps) {
  if (availability === 'OUT_OF_STOCK') return <span className="text-sm text-destructive">Sin stock</span>
  return (
    <span className={cn('text-sm tabular-nums', availability === 'LOW_STOCK' && 'font-medium text-warning')}>
      {availability === 'LOW_STOCK' && 'Pocas: '}
      {available ?? 0} u.
    </span>
  )
}
