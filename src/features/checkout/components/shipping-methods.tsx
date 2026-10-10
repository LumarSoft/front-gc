'use client'

import { useEffect } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { Button } from '@/src/components/ui/button'
import { Skeleton } from '@/src/components/ui/skeleton'
import type { Checkout } from '@/src/types/api/checkout'
import type { ShippingQuotesState } from '../hooks/use-shipping-quotes'
import { isRosario } from '../lib/checkout-input'
import type { CheckoutValues } from '../lib/checkout-schema'
import { deliveryPrice } from '../lib/delivery-price'
import { groupQuoteOptions, quoteDescription } from '../lib/shipping-quote-display'
import { PickupQuoteGroup } from './carrier/pickup-quote-group'
import { CheckoutFieldErrors, CheckoutInput } from './checkout-input'
import { ChoiceGroup, ChoiceOption } from './choice-group'

const Note = ({ children }: { children: React.ReactNode }) => (
  <p className="rounded-lg bg-surface px-4 py-5 text-center text-sm text-muted-foreground">{children}</p>
)

/** Rosario delivery (for Rosario addresses) and the carrier options quoted for the address, once it is complete. */
export function ShippingMethods({ checkout, quotes }: { checkout: Checkout; quotes: ShippingQuotesState }) {
  const { control, setValue, clearErrors } = useFormContext<CheckoutValues>()
  const [method, quoteId, city, province] = useWatch({
    control,
    name: ['deliveryMethod', 'shippingQuoteId', 'shippingAddress.city', 'shippingAddress.province'],
  })
  const local = checkout.deliveryOptions.find(option => option.code === 'LOCAL_DELIVERY')
  const carrier = checkout.deliveryOptions.find(option => option.code === 'CARRIER')
  const showLocal = Boolean(local?.enabled && isRosario(city, province))
  const { home, pickup } = groupQuoteOptions(quotes.options ?? [])
  const choose = (next: CheckoutValues['deliveryMethod'], id: number | null): void => {
    setValue('deliveryMethod', next)
    setValue('shippingQuoteId', id)
    clearErrors('shippingQuoteId')
  }
  // Rosario delivery chosen, then the address moved out of Rosario: the choice no longer exists.
  useEffect(() => {
    if (method !== 'LOCAL_DELIVERY' || showLocal) return
    setValue('deliveryMethod', 'CARRIER')
    setValue('shippingQuoteId', null)
  }, [method, showLocal, setValue])
  const hasOptions = showLocal || home.length > 0 || pickup.length > 0
  return (
    <section className="space-y-3" aria-label="Métodos de envío">
      <h3 className="font-semibold">Métodos de envío</h3>
      {!quotes.ready && !showLocal && <Note>Ingresá tu dirección de envío para ver los métodos disponibles.</Note>}
      {hasOptions && (
        <ChoiceGroup label="Métodos de envío">
          {showLocal && local && (
            <ChoiceOption
              name="shipping-method"
              value="LOCAL_DELIVERY"
              checked={method === 'LOCAL_DELIVERY'}
              onSelect={() => choose('LOCAL_DELIVERY', null)}
              title={local.name}
              description={local.description}
              aside={deliveryPrice(local.cost)}
            />
          )}
          {home.map(option => (
            <ChoiceOption
              key={option.id}
              name="shipping-method"
              value={String(option.id)}
              checked={method === 'CARRIER' && quoteId === option.id}
              onSelect={() => choose('CARRIER', option.id)}
              title="Envío a domicilio"
              description={quoteDescription(option.carrier, option.minDays, option.maxDays)}
              aside={deliveryPrice(option.cost)}
            />
          ))}
          {pickup.map(group => (
            <PickupQuoteGroup
              key={group.key}
              group={group}
              selectedId={method === 'CARRIER' ? quoteId : null}
              onSelect={id => choose('CARRIER', id)}
            />
          ))}
        </ChoiceGroup>
      )}
      {quotes.pending && <Skeleton className="h-16 rounded-lg" aria-label="Buscando opciones de envío" />}
      {quotes.error && (
        <div role="alert" className="flex flex-wrap items-center justify-between gap-3 text-sm text-destructive">
          <span>{quotes.error}</span>
          <Button type="button" variant="outline" size="sm" onClick={quotes.retry}>
            Reintentar
          </Button>
        </div>
      )}
      {quotes.ready && !carrier?.enabled && carrier?.unavailableReason && <Note>{carrier.unavailableReason}</Note>}
      <CheckoutFieldErrors names={['shippingQuoteId']} />
      {method === 'CARRIER' && quoteId && (
        <div className="space-y-2 pt-2">
          <CheckoutInput
            name="shippingAddress.taxId"
            label="DNI o CUIT de quien recibe"
            autoComplete="off"
            inputMode="numeric"
            grouped={false}
          />
          <p className="text-xs text-muted-foreground">Solo números. El transporte lo pide para entregar.</p>
          <CheckoutFieldErrors names={['shippingAddress.taxId']} />
        </div>
      )}
    </section>
  )
}
