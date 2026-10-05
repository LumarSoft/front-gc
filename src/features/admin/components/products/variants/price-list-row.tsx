'use client'

import { Controller, type UseFormReturn } from 'react-hook-form'
import { Input } from '@/src/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/src/components/ui/select'
import { Switch } from '@/src/components/ui/switch'
import { formatMoneyExact } from '@/src/lib/format'
import { convertToArs, parseMoneyInput } from '@/src/lib/money-input'
import type { VariantPricesValues } from '@/src/features/admin/lib/variant-prices-form'
import type { PriceList } from '@/src/types/api/admin-pricing'

type PriceListRowProps = {
  form: UseFormReturn<VariantPricesValues>
  index: number
  list: PriceList
  /** ARS per USD in effect, to preview USD prices in pesos. */
  usdRate: string | null
}

const AUDIENCE_LABELS = { RETAIL: 'Minorista', WHOLESALE: 'Clientes frecuentes' } as const

/** Price of the variant in one list: on/off, amount + currency, crossed-out price and the ARS preview for USD. */
export function PriceListRow({ form, index, list, usdRate }: PriceListRowProps) {
  const row = form.watch(`rows.${index}`)
  const errors = form.formState.errors.rows?.[index]
  const amount = parseMoneyInput(row.amount)
  const preview = row.currency === 'USD' && amount && usdRate ? convertToArs(amount, usdRate) : null
  const id = `price-${list.id}`

  return (
    <div className="rounded-lg border p-3">
      <div className="flex items-center justify-between gap-3">
        <label htmlFor={`${id}-enabled`} className="flex flex-col">
          <span className="text-sm font-medium">{AUDIENCE_LABELS[list.audience]}</span>
          {list.name !== AUDIENCE_LABELS[list.audience] && (
            <span className="text-xs text-muted-foreground">{list.name}</span>
          )}
        </label>
        <Controller
          control={form.control}
          name={`rows.${index}.enabled`}
          render={({ field }) => <Switch id={`${id}-enabled`} checked={field.value} onCheckedChange={field.onChange} />}
        />
      </div>
      {row.enabled ? (
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor={`${id}-amount`} className="text-xs text-muted-foreground">
              Precio
            </label>
            <div className="mt-1 flex gap-2">
              <Controller
                control={form.control}
                name={`rows.${index}.currency`}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger aria-label="Moneda" className="w-24 shrink-0">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ARS">ARS $</SelectItem>
                      <SelectItem value="USD">USD</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              <Input
                id={`${id}-amount`}
                inputMode="decimal"
                placeholder="0,00"
                aria-invalid={!!errors?.amount}
                className="text-right tabular-nums"
                {...form.register(`rows.${index}.amount`)}
              />
            </div>
            {errors?.amount && <p className="mt-1 text-xs text-destructive">{errors.amount.message}</p>}
            {preview && (
              <p className="mt-1 text-xs text-muted-foreground">
                En la tienda: {formatMoneyExact({ amount: preview, currency: 'ARS' })} con el dólar vigente.
              </p>
            )}
          </div>
          <div>
            <label htmlFor={`${id}-compare`} className="text-xs text-muted-foreground">
              Precio anterior (tachado)
            </label>
            <Input
              id={`${id}-compare`}
              inputMode="decimal"
              placeholder="Opcional"
              aria-invalid={!!errors?.compareAtAmount}
              className="mt-1 text-right tabular-nums"
              {...form.register(`rows.${index}.compareAtAmount`)}
            />
            {errors?.compareAtAmount && (
              <p className="mt-1 text-xs text-destructive">{errors.compareAtAmount.message}</p>
            )}
          </div>
        </div>
      ) : (
        <p className="mt-2 text-xs text-muted-foreground">
          {list.audience === 'WHOLESALE'
            ? 'Sin precio propio: los clientes frecuentes pagan el minorista.'
            : 'Sin precio minorista el producto no se puede publicar.'}
        </p>
      )}
    </div>
  )
}
