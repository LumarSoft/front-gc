'use client'

import Link from 'next/link'
import { FormProvider } from 'react-hook-form'
import { Button } from '@/src/components/ui/button'
import type { AuthUser } from '@/src/types/api/auth'
import type { Checkout, PreviewCheckoutRequest } from '@/src/types/api/checkout'
import { useCheckoutForm } from '../hooks/use-checkout-form'
import { CheckoutField } from './checkout-field'
import { CheckoutDelivery } from './checkout-delivery'

type Props = {
  checkout: Checkout
  user: AuthUser | null | undefined
  pending: boolean
  error: string | null
  onPreview: (input: PreviewCheckoutRequest) => void
}

export function CheckoutForm({ checkout, user, pending, error, onPreview }: Props) {
  const { form, submit } = useCheckoutForm(user, onPreview)
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
              description="Lo usaremos para enviarte las novedades de tu pedido."
            />
            <CheckoutField
              name="phone"
              label="Teléfono (opcional)"
              type="tel"
              autoComplete="tel"
              description="Para coordinar el envío o el retiro."
            />
          </section>
          <CheckoutDelivery options={checkout.deliveryOptions} />
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
