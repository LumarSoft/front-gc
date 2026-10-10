'use client'

import { useFormContext, useWatch } from 'react-hook-form'
import { FieldGroup, FieldRow } from '@/src/components/ui/floating-field'
import type { CheckoutValues } from '../lib/checkout-schema'
import { CheckoutFieldErrors, CheckoutInput, ProvinceInput } from './checkout-input'

const FIELDS = [
  'firstName',
  'lastName',
  'shippingAddress.street',
  'shippingAddress.streetNumber',
  'shippingAddress.postalCode',
  'shippingAddress.city',
  'shippingAddress.province',
  'phone',
] as const

/** Who receives it and where, in one joined box. The phone is required only for carriers (they call). */
export function ShippingAddressFields() {
  const { control } = useFormContext<CheckoutValues>()
  const carrier = useWatch({ control, name: 'deliveryMethod' }) === 'CARRIER'
  return (
    <div>
      <FieldGroup>
        <FieldRow>
          <CheckoutInput name="firstName" label="Nombre" autoComplete="given-name" />
          <CheckoutInput name="lastName" label="Apellido" autoComplete="family-name" />
        </FieldRow>
        <FieldRow stack className="sm:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <CheckoutInput name="shippingAddress.street" label="Calle" autoComplete="address-line1" />
          <CheckoutInput
            name="shippingAddress.streetNumber"
            label="Número, piso y depto."
            autoComplete="address-line2"
          />
        </FieldRow>
        <FieldRow stack>
          <CheckoutInput
            name="shippingAddress.postalCode"
            label="Código postal"
            autoComplete="postal-code"
            inputMode="numeric"
          />
          <CheckoutInput name="shippingAddress.city" label="Localidad" autoComplete="address-level2" />
          <ProvinceInput />
        </FieldRow>
        <CheckoutInput
          name="phone"
          label={carrier ? 'Teléfono' : 'Teléfono (opcional)'}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
        />
      </FieldGroup>
      <CheckoutFieldErrors names={[...FIELDS]} />
    </div>
  )
}
