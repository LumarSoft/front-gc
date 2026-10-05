'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useAdminMutation } from '@/src/features/admin/hooks/use-admin-mutation'
import {
  EXCHANGE_RATE_DEFAULTS,
  exchangeRateSchema,
  type ExchangeRateValues,
  toExchangeRateInput,
} from '@/src/features/admin/lib/exchange-rate-form'
import { formatMoneyExact } from '@/src/lib/format'
import { QUERY_KEYS } from '@/src/lib/query-keys'
import { createExchangeRate } from '@/src/services/admin-pricing.service'

/** "Nueva cotización": now or scheduled. The answer replaces the rates on screen. */
export function useExchangeRateForm() {
  const queryClient = useQueryClient()
  const form = useForm<ExchangeRateValues>({
    resolver: zodResolver(exchangeRateSchema),
    defaultValues: EXCHANGE_RATE_DEFAULTS,
  })
  const create = useAdminMutation({
    mutationFn: createExchangeRate,
    invalidate: [QUERY_KEYS.admin.productLists],
    successMessage: (_, input) =>
      `${input.effectiveFrom ? 'Programaste' : 'Cargaste'} el dólar a ${formatMoneyExact({ amount: input.rate.slice(0, -2), currency: 'ARS' })}.`,
    onSuccess: rates => {
      queryClient.setQueryData(QUERY_KEYS.admin.exchangeRates, rates)
      form.reset(EXCHANGE_RATE_DEFAULTS)
    },
  })

  return {
    form,
    onSubmit: form.handleSubmit(values => create.mutate(toExchangeRateInput(values))),
    isSaving: create.isPending,
  }
}
