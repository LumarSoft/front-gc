'use client'

import { cn } from '@/src/lib/utils'
import type { CheckoutPaymentMethod, CheckoutPaymentOption } from '@/src/types/api/checkout'
import { PAYMENT_OPTION_COPY, formatReservation, sortPaymentOptions } from '../lib/payment-options'

type CheckoutPaymentProps = {
  options: CheckoutPaymentOption[]
  value: CheckoutPaymentMethod
  onChange: (method: CheckoutPaymentMethod) => void
  disabled: boolean
}

/** How the buyer pays, with how long each way holds their products. */
export function CheckoutPayment({ options, value, onChange, disabled }: CheckoutPaymentProps) {
  return (
    <fieldset className="rounded-2xl border p-5">
      <legend className="px-1 font-bold">Cómo pagás</legend>
      <div className="mt-2 space-y-3">
        {sortPaymentOptions(options).map(option => {
          const copy = PAYMENT_OPTION_COPY[option.method]
          return (
            <label
              key={option.method}
              className={cn(
                'flex cursor-pointer gap-3 rounded-xl border p-4',
                value === option.method && 'border-primary bg-primary/5',
              )}
            >
              <input
                type="radio"
                name="paymentMethod"
                value={option.method}
                checked={value === option.method}
                disabled={disabled}
                onChange={() => onChange(option.method)}
                className="mt-1 size-4 shrink-0 accent-primary"
              />
              <span className="min-w-0 flex-1">
                <span className="block font-bold">{copy.name}</span>
                <span className="mt-1 block text-sm text-muted-foreground">{copy.description}</span>
                <span className="mt-2 block text-xs">
                  Reservamos tus productos durante {formatReservation(option.reservationMinutes)}.
                </span>
              </span>
            </label>
          )
        })}
      </div>
      <p className="mt-4 text-sm text-muted-foreground">
        Podés consultar los avances de tu pedido con un enlace privado, sin crear una cuenta.
      </p>
    </fieldset>
  )
}
