'use client'

import { CircleNotchIcon } from '@phosphor-icons/react'
import { Controller } from 'react-hook-form'
import { Button } from '@/src/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card'
import { FormField } from '@/src/components/ui/form-field'
import { Input } from '@/src/components/ui/input'
import { useExchangeRateForm } from '@/src/features/admin/hooks/use-exchange-rate-form'
import { cn } from '@/src/lib/utils'

const WHEN_OPTIONS = [
  { value: 'now', label: 'Desde ahora' },
  { value: 'scheduled', label: 'Programar' },
] as const

/** Load a new rate. The history is never edited: a new rate always adds a row. */
export function NewRateForm() {
  const { form, onSubmit, isSaving } = useExchangeRateForm()
  const { errors } = form.formState
  const scheduled = form.watch('when') === 'scheduled'

  return (
    <Card className="shadow-xs ring-foreground/8">
      <CardHeader>
        <CardTitle>Nueva cotización</CardTitle>
        <CardDescription>Los precios cargados en USD se recalculan en pesos con este valor.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
          <FormField id="rate-value" label="Pesos por dólar" error={errors.rate}>
            <Input
              id="rate-value"
              inputMode="decimal"
              placeholder="1.475,50"
              className="text-right tabular-nums"
              aria-invalid={!!errors.rate}
              {...form.register('rate')}
            />
          </FormField>
          <Controller
            control={form.control}
            name="when"
            render={({ field }) => (
              <div
                role="radiogroup"
                aria-label="Cuándo empieza"
                className="grid grid-cols-2 gap-1 rounded-lg bg-muted p-1"
              >
                {WHEN_OPTIONS.map(option => (
                  <button
                    key={option.value}
                    type="button"
                    role="radio"
                    aria-checked={field.value === option.value}
                    onClick={() => field.onChange(option.value)}
                    className={cn(
                      'rounded-md py-1.5 text-sm text-muted-foreground',
                      field.value === option.value && 'bg-background font-medium text-foreground shadow-xs',
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          />
          {scheduled && (
            <FormField id="rate-from" label="Empieza a regir" error={errors.effectiveFrom}>
              <Input
                id="rate-from"
                type="datetime-local"
                aria-invalid={!!errors.effectiveFrom}
                {...form.register('effectiveFrom')}
              />
            </FormField>
          )}
          <Button type="submit" disabled={isSaving}>
            {isSaving && <CircleNotchIcon className="animate-spin" />}
            {scheduled ? 'Programar cotización' : 'Cargar cotización'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
