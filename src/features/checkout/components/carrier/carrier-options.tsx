'use client'

import { useController, useFormContext } from 'react-hook-form'
import { cn } from '@/src/lib/utils'
import type { ShippingQuoteOption } from '@/src/types/api/checkout'
import type { CheckoutValues } from '../../lib/checkout-schema'
import { groupQuoteOptions } from '../../lib/shipping-quote-display'
import { PickupQuoteGroup } from './pickup-quote-group'
import { QuoteOptionHeading } from './quote-option-heading'
import { QuoteRadio } from './quote-radio'

const ERROR_ID = 'checkout-shipping-quote-error'

/** Home delivery and branch pickup for the quoted destination; branches are grouped under their carrier. */
export function CarrierOptions({ options }: { options: ShippingQuoteOption[] }) {
  const { control } = useFormContext<CheckoutValues>()
  const { field, fieldState } = useController({ control, name: 'shippingQuoteId' })
  const { home, pickup } = groupQuoteOptions(options)
  const select = (id: number): void => field.onChange(id)
  return (
    <fieldset className="space-y-3" aria-describedby={fieldState.error ? ERROR_ID : undefined}>
      <legend className="mb-3 font-bold">Elegí cómo te llega</legend>
      {home.map((option, index) => (
        <QuoteRadio
          key={option.id}
          inputRef={index === 0 ? field.ref : undefined}
          checked={field.value === option.id}
          onSelect={() => select(option.id)}
          className={cn('rounded-2xl border p-4', field.value === option.id && 'border-primary bg-primary/5')}
        >
          <QuoteOptionHeading
            title="Envío a domicilio"
            carrier={option.carrier}
            minDays={option.minDays}
            maxDays={option.maxDays}
            cost={option.cost}
          />
        </QuoteRadio>
      ))}
      {pickup.map(group => (
        <PickupQuoteGroup key={group.key} group={group} selectedId={field.value} onSelect={select} />
      ))}
      {fieldState.error && (
        <p id={ERROR_ID} role="alert" className="text-sm text-destructive">
          {fieldState.error.message}
        </p>
      )}
    </fieldset>
  )
}
