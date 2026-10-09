import { formatMoneyExact } from '@/src/lib/format'
import type { Money } from '@/src/types/api/money'
import { formatDeliveryDays } from '../../lib/shipping-quote-display'

type QuoteOptionHeadingProps = {
  title: string
  carrier: string
  minDays: number | null
  maxDays: number | null
  cost: Money
  /** Branch prices differ: the heading shows the lowest one. */
  fromPrice?: boolean
}

/** Mode, carrier, estimated days and price of a shipping option. */
export function QuoteOptionHeading({
  title,
  carrier,
  minDays,
  maxDays,
  cost,
  fromPrice = false,
}: QuoteOptionHeadingProps) {
  const days = formatDeliveryDays(minDays, maxDays)
  return (
    <>
      <span className="flex flex-wrap justify-between gap-x-3 gap-y-1 font-bold">
        <span>{title}</span>
        <span className="tabular-nums">
          {fromPrice && <span className="font-normal text-muted-foreground">desde </span>}
          {formatMoneyExact(cost)}
        </span>
      </span>
      <span className="mt-1 block text-sm text-muted-foreground">
        {carrier}
        {days && ` · llega en ${days}`}
      </span>
    </>
  )
}
