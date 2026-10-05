import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card'
import { formatDateTime, formatMoneyExact } from '@/src/lib/format'
import type { ExchangeRate } from '@/src/types/api/admin-pricing'

const pesos = (rate: string): string => formatMoneyExact({ amount: rate.slice(0, -2), currency: 'ARS' })

/** The rate the store uses right now, and the next scheduled one if any. */
export function CurrentRateCard({ current, next }: { current: ExchangeRate | null; next: ExchangeRate | undefined }) {
  return (
    <Card className="shadow-xs ring-foreground/8">
      <CardHeader>
        <CardTitle className="text-sm font-normal text-muted-foreground">Dólar vigente en la tienda</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {current ? (
          <>
            <p className="text-3xl font-semibold tracking-tight tabular-nums">
              <span className="text-lg font-normal text-muted-foreground">US$ 1 = </span>
              {pesos(current.rate)}
            </p>
            <p className="text-sm text-muted-foreground">Desde el {formatDateTime(current.effectiveFrom)}</p>
          </>
        ) : (
          <p className="text-sm text-destructive">
            Todavía no hay cotización: los precios en USD se muestran en dólares hasta que cargues una.
          </p>
        )}
        {next && (
          <p className="mt-2 rounded-md bg-accent px-3 py-2 text-sm text-primary">
            Programado: {pesos(next.rate)} desde el {formatDateTime(next.effectiveFrom)}.
          </p>
        )}
      </CardContent>
    </Card>
  )
}
