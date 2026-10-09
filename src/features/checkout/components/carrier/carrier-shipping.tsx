'use client'

import { useFormContext, useWatch } from 'react-hook-form'
import type { ShippingQuotesState } from '../../hooks/use-shipping-quotes'
import type { CheckoutValues } from '../../lib/checkout-schema'
import { CarrierDestination } from './carrier-destination'
import { CarrierOptions } from './carrier-options'
import { CarrierRecipient } from './carrier-recipient'

/** Shipping to the rest of the country: quote the destination, pick an option, then complete the address. */
export function CarrierShipping({ quotes }: { quotes: ShippingQuotesState }) {
  const { control, getFieldState, formState } = useFormContext<CheckoutValues>()
  const selectedId = useWatch({ control, name: 'shippingQuoteId' })
  const selected = quotes.options?.find(option => option.id === selectedId)
  const { error } = getFieldState('shippingQuoteId', formState)
  return (
    <div className="space-y-6 border-t pt-5">
      <div>
        <h3 className="font-bold">¿A dónde lo enviamos?</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Con el código postal te mostramos las opciones de envío y su costo.
        </p>
      </div>
      <CarrierDestination quotes={quotes} />
      {!quotes.options && error && (
        <p role="alert" className="text-sm text-destructive">
          {error.message}
        </p>
      )}
      {quotes.options && (
        <>
          <CarrierOptions options={quotes.options} />
          <CarrierRecipient pickup={selected?.kind === 'PICKUP_POINT'} />
        </>
      )}
    </div>
  )
}
