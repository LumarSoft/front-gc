'use client'

import { StoreIcon, TruckIcon } from 'lucide-react'
import { useFormContext, useWatch } from 'react-hook-form'
import type { Checkout } from '@/src/types/api/checkout'
import type { ShippingQuotesState } from '../hooks/use-shipping-quotes'
import type { CheckoutValues } from '../lib/checkout-schema'
import { groupQuoteOptions } from '../lib/shipping-quote-display'
import { ChoiceGroup, ChoiceOption } from './choice-group'
import { PickupDetails } from './pickup-details'
import { ShippingAddressFields } from './shipping-address-fields'
import { ShippingMethods } from './shipping-methods'

/** Shipping or pickup first; shipping then asks for the address and offers the methods for it. */
export function CheckoutDelivery({ checkout, quotes }: { checkout: Checkout; quotes: ShippingQuotesState }) {
  const { control, setValue, clearErrors } = useFormContext<CheckoutValues>()
  const mode = useWatch({ control, name: 'deliveryMode' })
  const option = (code: string) => checkout.deliveryOptions.find(candidate => candidate.code === code)
  const canShip = Boolean(option('LOCAL_DELIVERY')?.enabled || option('CARRIER')?.enabled)
  const choose = (next: CheckoutValues['deliveryMode']): void => {
    setValue('deliveryMode', next)
    setValue('deliveryMethod', next === 'PICKUP' ? 'STORE_PICKUP' : 'CARRIER')
    setValue('shippingQuoteId', next === 'SHIP' ? (groupQuoteOptions(quotes.options ?? []).home[0]?.id ?? null) : null)
    clearErrors()
  }
  return (
    <section className="space-y-4" aria-labelledby="checkout-delivery">
      <h2 id="checkout-delivery" className="text-xl font-bold">
        Entrega
      </h2>
      <ChoiceGroup label="Cómo recibís tu compra">
        <ChoiceOption
          name="delivery-mode"
          value="SHIP"
          checked={mode === 'SHIP'}
          onSelect={() => choose('SHIP')}
          disabled={!canShip}
          title="Envío"
          description={canShip ? undefined : option('CARRIER')?.unavailableReason}
          aside={<TruckIcon aria-hidden strokeWidth={1.5} className="size-5 text-muted-foreground" />}
        />
        <ChoiceOption
          name="delivery-mode"
          value="PICKUP"
          checked={mode === 'PICKUP'}
          onSelect={() => choose('PICKUP')}
          title="Retiro en el local"
          aside={<StoreIcon aria-hidden strokeWidth={1.5} className="size-5 text-muted-foreground" />}
        />
      </ChoiceGroup>
      {mode === 'SHIP' ? (
        <>
          <ShippingAddressFields />
          <ShippingMethods checkout={checkout} quotes={quotes} />
        </>
      ) : (
        <PickupDetails pickup={option('STORE_PICKUP')} />
      )}
    </section>
  )
}
