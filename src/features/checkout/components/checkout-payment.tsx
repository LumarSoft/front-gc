'use client'

import { useFormContext, useWatch } from 'react-hook-form'
import type { CheckoutPaymentOption } from '@/src/types/api/checkout'
import type { CheckoutValues } from '../lib/checkout-schema'
import { PAYMENT_OPTION_COPY, formatReservation, sortPaymentOptions } from '../lib/payment-options'
import { ChoiceGroup, ChoiceOption } from './choice-group'

/** How the buyer pays; the chosen option explains what happens next and how long the products are held. */
export function CheckoutPayment({ options }: { options: CheckoutPaymentOption[] }) {
  const { control, setValue } = useFormContext<CheckoutValues>()
  const method = useWatch({ control, name: 'paymentMethod' })
  return (
    <section className="space-y-3" aria-labelledby="checkout-payment">
      <div>
        <h2 id="checkout-payment" className="text-xl font-bold">
          Pago
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">Los datos de tu tarjeta nunca pasan por nuestra tienda.</p>
      </div>
      <ChoiceGroup label="Medio de pago">
        {sortPaymentOptions(options).map(option => {
          const copy = PAYMENT_OPTION_COPY[option.method]
          return (
            <ChoiceOption
              key={option.method}
              name="payment-method"
              value={option.method}
              checked={method === option.method}
              onSelect={() => setValue('paymentMethod', option.method)}
              title={copy.name}
              description={copy.hint}
            >
              <p className="text-sm text-muted-foreground">
                {copy.details} Reservamos tus productos durante {formatReservation(option.reservationMinutes)}.
              </p>
            </ChoiceOption>
          )
        })}
      </ChoiceGroup>
    </section>
  )
}
