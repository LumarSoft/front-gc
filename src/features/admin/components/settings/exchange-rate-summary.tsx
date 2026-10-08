'use client'

import Link from 'next/link'
import { Button } from '@/src/components/ui/button'
import { Card } from '@/src/components/ui/card'
import { Skeleton } from '@/src/components/ui/skeleton'
import { useExchangeRates } from '@/src/features/admin/hooks/use-pricing-data'
import { formatDateTime, formatMoneyExact } from '@/src/lib/format'

/** The dollar rate in effect, with the way to change it (its own page keeps the history and scheduling). */
export function ExchangeRateSummary() {
  const { data, isPending } = useExchangeRates()
  const current = data?.current

  return (
    <Card className="flex-row items-center justify-between gap-4 p-4">
      {isPending ? (
        <Skeleton className="h-10 w-48" />
      ) : current ? (
        <div>
          <p className="text-base font-semibold tabular-nums">
            US$ 1 = {formatMoneyExact({ amount: Number(current.rate).toFixed(2), currency: 'ARS' })}
          </p>
          <p className="text-xs text-muted-foreground">Desde el {formatDateTime(current.effectiveFrom)}</p>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">Todavía no cargaste una cotización.</p>
      )}
      <Button variant="outline" asChild>
        <Link href="/admin/cotizacion">Cambiar</Link>
      </Button>
    </Card>
  )
}
