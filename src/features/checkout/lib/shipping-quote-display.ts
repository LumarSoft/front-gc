import type { ShippingDestination, ShippingQuoteOption } from '@/src/types/api/checkout'

/** Branches of one carrier service, shown as a single choice with its list of branches. */
export type PickupGroup = { key: string; carrier: string; service: string; options: ShippingQuoteOption[] }

export function groupQuoteOptions(options: ShippingQuoteOption[]): {
  home: ShippingQuoteOption[]
  pickup: PickupGroup[]
} {
  const pickup = new Map<string, PickupGroup>()
  for (const option of options) {
    if (option.kind !== 'PICKUP_POINT') continue
    const key = `${option.carrier}|${option.service}`
    const group = pickup.get(key) ?? { key, carrier: option.carrier, service: option.service, options: [] }
    group.options.push(option)
    pickup.set(key, group)
  }
  return { home: options.filter(option => option.kind === 'HOME'), pickup: [...pickup.values()] }
}

/** "5 a 6 días", "3 días" or "hasta 6 días"; null when the carrier gives no estimate. */
export function formatDeliveryDays(minDays: number | null, maxDays: number | null): string | null {
  const days = (count: number): string => (count === 1 ? '1 día' : `${count} días`)
  if (minDays !== null && maxDays !== null) return minDays === maxDays ? days(maxDays) : `${minDays} a ${days(maxDays)}`
  if (maxDays !== null) return `hasta ${days(maxDays)}`
  if (minDays !== null) return `desde ${days(minDays)}`
  return null
}

/** The API sends a branch as "Name — Street 123, City, Province". */
export function splitPickupPoint(pickupPoint: string): { name: string; address: string | null } {
  const [name, ...rest] = pickupPoint.split(' — ')
  return { name, address: rest.join(' — ') || null }
}

const normalize = (value: string): string => value.trim().replace(/\s+/g, ' ').toLowerCase()

/** A quote only holds for the destination it was made for. */
export function sameDestination(a: ShippingDestination, b: ShippingDestination): boolean {
  return (
    normalize(a.postalCode) === normalize(b.postalCode) &&
    normalize(a.city) === normalize(b.city) &&
    normalize(a.province) === normalize(b.province)
  )
}
