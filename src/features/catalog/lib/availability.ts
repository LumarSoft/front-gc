import type { Availability, OutOfStockBehavior } from '@/src/types/api/catalog'

export type AvailabilityLabel = {
  text: string
  tone: 'positive' | 'warning' | 'muted'
}

/** Customer-facing stock message. Null when there is nothing worth saying (plenty of stock). */
export function getAvailabilityLabel(
  availability: Availability,
  outOfStockBehavior: OutOfStockBehavior,
): AvailabilityLabel | null {
  if (availability === 'LOW_STOCK') return { text: 'Quedan pocas unidades', tone: 'warning' }
  if (availability === 'OUT_OF_STOCK') {
    return outOfStockBehavior === 'ALLOW_INQUIRY'
      ? { text: 'Consultá disponibilidad', tone: 'muted' }
      : { text: 'Sin stock', tone: 'muted' }
  }
  return null
}
