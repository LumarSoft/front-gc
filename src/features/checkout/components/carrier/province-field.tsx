'use client'

import { ChevronDownIcon } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { FormField } from '@/src/components/ui/form-field'
import { ARGENTINE_PROVINCES } from '../../lib/argentine-provinces'
import type { CheckoutValues } from '../../lib/checkout-schema'

const ID = 'checkout-shippingAddress-province'

/** Native select: opens the system picker on phones and avoids misspelled provinces the carrier would reject. */
export function ProvinceField() {
  const { register, getFieldState, formState } = useFormContext<CheckoutValues>()
  const { error } = getFieldState('shippingAddress.province', formState)
  return (
    <FormField id={ID} label="Provincia" error={error}>
      <div className="relative">
        <select
          id={ID}
          autoComplete="address-level1"
          aria-invalid={Boolean(error)}
          className="h-12 w-full appearance-none rounded-xl border border-input bg-transparent pr-10 pl-4 text-base outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive md:text-sm"
          {...register('shippingAddress.province')}
        >
          <option value="">Elegí la provincia</option>
          {ARGENTINE_PROVINCES.map(province => (
            <option key={province} value={province}>
              {province}
            </option>
          ))}
        </select>
        <ChevronDownIcon
          className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
      </div>
    </FormField>
  )
}
