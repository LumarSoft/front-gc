import { Card, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card'
import { formatDateTime, formatMoneyExact } from '@/src/lib/format'
import type { ExchangeRate } from '@/src/types/api/admin-pricing'

type RatesHistoryCardProps = {
  title: string
  description: string
  rates: ExchangeRate[]
  /** Marks the first row as the one in effect. */
  highlightFirst?: boolean
}

/** A list of rates with the date each one starts. */
export function RatesHistoryCard({ title, description, rates, highlightFirst = false }: RatesHistoryCardProps) {
  return (
    <Card className="gap-0 pb-0 shadow-xs ring-foreground/8">
      <CardHeader className="border-b">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <ul className="divide-y">
        {rates.map((rate, index) => (
          <li key={rate.id} className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm">
            <span className="text-muted-foreground tabular-nums">{formatDateTime(rate.effectiveFrom)}</span>
            <span className="flex items-center gap-2">
              {highlightFirst && index === 0 && (
                <span className="rounded-full bg-success/10 px-2 py-0.5 text-xs font-medium text-success">Vigente</span>
              )}
              <span className="font-medium tabular-nums">
                {formatMoneyExact({ amount: rate.rate.slice(0, -2), currency: 'ARS' })}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </Card>
  )
}
