'use client'

import Link from 'next/link'
import { FormProvider } from 'react-hook-form'
import { Button } from '@/src/components/ui/button'
import type { AuthUser } from '@/src/types/api/auth'
import type { Checkout } from '@/src/types/api/checkout'
import { useCheckoutForm, type PreviewHandler } from '../hooks/use-checkout-form'
import { CarrierShipping } from './carrier/carrier-shipping'
import { CheckoutField } from './checkout-field'
import { CheckoutDelivery } from './checkout-delivery'
import { CheckoutPhoneField } from './checkout-phone-field'

type Props = {
  checkout: Checkout
  user: AuthUser | null | undefined
  pending: boolean
  error: string | null
  onPreview: PreviewHandler
}

export function CheckoutForm({ checkout, user, pending, error, onPreview }: Props) {
  const { form, quotes, submit } = useCheckoutForm(user, onPreview)
  return (
    <FormProvider {...form}>
      <form onSubmit={submit} noValidate className="space-y-8">
        <fieldset disabled={pending} className="space-y-8">
          <section className="space-y-5">
            <h2 className="text-xl font-extrabold">1. Tus datos</h2>
            {!user && (
              <p className="text-sm text-muted-foreground">
                ¿Ya tenés una cuenta?{' '}
                <Link href="/ingresar?redirect=%2Ffinalizar-compra" className="font-semibold text-primary underline">
                  Ingresá para usar tus datos
                </Link>
                .
              </p>
            )}
            <CheckoutField name="name" label="Nombre y apellido" autoComplete="name" />
            <CheckoutField
              name="email"
              label="Email"
              type="email"
              autoComplete="email"
              description="Queda como contacto del pedido. Por ahora, las novedades se consultan con tu enlace privado."
            />
            <CheckoutPhoneField />
          </section>
          <CheckoutDelivery options={checkout.deliveryOptions}>
            <CarrierShipping quotes={quotes} />
          </CheckoutDelivery>
          {error && (
            <p role="alert" className="rounded-xl border border-destructive p-4 text-sm text-destructive">
              {error}
            </p>
          )}
          <Button type="submit" disabled={!checkout.canReview} className="h-12 w-full rounded-full text-base font-bold">
            {pending ? 'Revisando…' : 'Revisar mi compra'}
          </Button>
        </fieldset>
        <p className="text-xs text-muted-foreground">
          Este paso no confirma tu compra. Podés revisar los datos y el total antes de pagar.
        </p>
      </form>
    </FormProvider>
  )
}
