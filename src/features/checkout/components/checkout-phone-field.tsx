'use client'

import { useFormContext, useWatch } from 'react-hook-form'
import type { CheckoutValues } from '../lib/checkout-schema'
import { CheckoutField } from './checkout-field'

/** Optional, except for shipping to the rest of the country: carriers call the recipient. */
export function CheckoutPhoneField() {
  const { control } = useFormContext<CheckoutValues>()
  const carrier = useWatch({ control, name: 'deliveryMethod' }) === 'CARRIER'
  return (
    <CheckoutField
      name="phone"
      label={carrier ? 'Teléfono' : 'Teléfono (opcional)'}
      type="tel"
      autoComplete="tel"
      description={carrier ? 'El transporte lo usa para coordinar la entrega.' : 'Para coordinar el envío o el retiro.'}
    />
  )
}
