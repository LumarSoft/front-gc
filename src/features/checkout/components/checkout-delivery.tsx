'use client'

import { useFormContext, useWatch } from 'react-hook-form'
import { cn } from '@/src/lib/utils'
import { formatMoneyExact } from '@/src/lib/format'
import type { CheckoutDelivery as DeliveryOption } from '@/src/types/api/checkout'
import type { CheckoutValues } from '../lib/checkout-schema'
import { CheckoutField } from './checkout-field'

export function CheckoutDelivery({ options }: { options: DeliveryOption[] }) {
  const { register, control } = useFormContext<CheckoutValues>()
  const method = useWatch({ control, name: 'deliveryMethod' })
  return (
    <section className="space-y-5">
      <h2 className="text-xl font-extrabold">2. Cómo recibís tu compra</h2>
      <div className="space-y-3">
        {options.map(option => (
          <label
            key={option.code}
            className={cn(
              'flex gap-3 rounded-2xl border p-4',
              method === option.code && 'border-primary bg-primary/5',
              !option.enabled && 'bg-muted/40 text-muted-foreground',
            )}
          >
            <input
              type="radio"
              value={option.code}
              disabled={!option.enabled}
              className="mt-1 size-4 shrink-0 accent-primary"
              {...register('deliveryMethod')}
            />
            <span className="min-w-0 flex-1">
              <span className="flex flex-wrap justify-between gap-2 font-bold">
                <span>{option.name}</span>
                <span>
                  {option.cost
                    ? option.cost.amount === '0.00'
                      ? 'Gratis'
                      : formatMoneyExact(option.cost)
                    : 'A confirmar'}
                </span>
              </span>
              <span className="mt-1 block text-sm text-muted-foreground">{option.description}</span>
              {option.unavailableReason && <span className="mt-2 block text-xs">{option.unavailableReason}</span>}
            </span>
          </label>
        ))}
      </div>
      {method === 'LOCAL_DELIVERY' && (
        <div className="grid gap-4 sm:grid-cols-2">
          <CheckoutField name="shippingAddress.street" label="Calle" autoComplete="address-line1" />
          <CheckoutField name="shippingAddress.streetNumber" label="Altura" autoComplete="address-line2" />
          <CheckoutField name="shippingAddress.city" label="Ciudad" autoComplete="address-level2" />
          <CheckoutField name="shippingAddress.province" label="Provincia" autoComplete="address-level1" />
          <CheckoutField name="shippingAddress.postalCode" label="Código postal" autoComplete="postal-code" />
        </div>
      )}
    </section>
  )
}
