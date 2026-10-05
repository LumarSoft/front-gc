import { z } from 'zod'
import { parseMoneyInput } from '@/src/lib/money-input'
import type { ExchangeRateInput } from '@/src/types/api/admin-pricing'

export const exchangeRateSchema = z
  .object({
    rate: z.string().refine(value => {
      const parsed = parseMoneyInput(value, 4)
      return parsed !== null && Number(parsed) > 0
    }, 'Escribí cuántos pesos vale un dólar (ej.: 1.475,50).'),
    when: z.enum(['now', 'scheduled']),
    /** datetime-local value, in the admin's time zone. */
    effectiveFrom: z.string(),
  })
  .refine(
    values => values.when === 'now' || (values.effectiveFrom !== '' && new Date(values.effectiveFrom) > new Date()),
    {
      path: ['effectiveFrom'],
      message: 'Elegí una fecha y hora futura.',
    },
  )

export type ExchangeRateValues = z.infer<typeof exchangeRateSchema>

export const EXCHANGE_RATE_DEFAULTS: ExchangeRateValues = { rate: '', when: 'now', effectiveFrom: '' }

export function toExchangeRateInput(values: ExchangeRateValues): ExchangeRateInput {
  return {
    rate: parseMoneyInput(values.rate, 4) ?? '0',
    ...(values.when === 'scheduled' ? { effectiveFrom: new Date(values.effectiveFrom).toISOString() } : {}),
  }
}
