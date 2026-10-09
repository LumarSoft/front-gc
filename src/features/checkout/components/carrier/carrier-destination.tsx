'use client'

import type { KeyboardEvent } from 'react'
import { Button } from '@/src/components/ui/button'
import type { ShippingQuotesState } from '../../hooks/use-shipping-quotes'
import { CheckoutField } from '../checkout-field'
import { ProvinceField } from './province-field'

/** Postal code, city and province: enough to quote before asking for the street. */
export function CarrierDestination({ quotes }: { quotes: ShippingQuotesState }) {
  const quoteOnEnter = (event: KeyboardEvent<HTMLDivElement>): void => {
    if (event.key !== 'Enter' || !(event.target instanceof HTMLInputElement)) return
    // Enter here means "quote", not "review the purchase".
    event.preventDefault()
    if (!quotes.options && !quotes.pending) void quotes.quote()
  }
  return (
    <div className="space-y-4">
      <div onKeyDown={quoteOnEnter} className="grid gap-4 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)_minmax(0,1.2fr)]">
        <CheckoutField name="shippingAddress.postalCode" label="Código postal" autoComplete="postal-code" />
        <CheckoutField name="shippingAddress.city" label="Localidad" autoComplete="address-level2" />
        <ProvinceField />
      </div>
      {quotes.stale && (
        <p className="text-sm text-muted-foreground">Cambiaste el destino. Cotizá de nuevo para ver las opciones.</p>
      )}
      {quotes.error && (
        <p role="alert" className="rounded-xl border border-destructive p-4 text-sm text-destructive">
          {quotes.error}
        </p>
      )}
      {!quotes.options && (
        <Button
          type="button"
          variant="outline"
          className="h-12 w-full rounded-full font-bold sm:w-auto sm:px-8"
          disabled={quotes.pending}
          onClick={() => void quotes.quote()}
        >
          {quotes.pending ? 'Cotizando…' : 'Ver opciones de envío'}
        </Button>
      )}
    </div>
  )
}
