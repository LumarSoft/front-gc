'use client'

import { FormProvider } from 'react-hook-form'
import { Button } from '@/src/components/ui/button'
import type { AuthUser } from '@/src/types/api/auth'
import type { CreateWholesaleApplicationRequest, WholesaleApplication } from '@/src/types/api/wholesale'
import { useWholesaleForm } from '../hooks/use-wholesale-form'
import { TaxConditionField } from './tax-condition-field'
import { WholesaleTextField } from './wholesale-text-field'

type Props = {
  user: AuthUser
  previous: WholesaleApplication | null
  pending: boolean
  error: string | null
  onSubmit: (input: CreateWholesaleApplicationRequest) => void
}

export function WholesaleApplicationForm({ user, previous, pending, error, onSubmit }: Props) {
  const { form, submit } = useWholesaleForm(user, previous, onSubmit)
  return (
    <FormProvider {...form}>
      <form onSubmit={submit} noValidate className="space-y-6">
        <fieldset disabled={pending} className="space-y-6">
          <WholesaleTextField name="legalName" label="Razón social" autoComplete="organization" />
          <WholesaleTextField name="tradeName" label="Nombre de fantasía (opcional)" />
          <WholesaleTextField
            name="cuit"
            label="CUIT"
            inputMode="numeric"
            description="Con o sin guiones, por ejemplo 30-71234567-1."
          />
          <TaxConditionField />
          <div className="grid gap-6 sm:grid-cols-2">
            <WholesaleTextField name="email" label="Email de compras" type="email" autoComplete="email" />
            <WholesaleTextField name="phone" label="Teléfono (opcional)" type="tel" autoComplete="tel" />
          </div>
          <WholesaleTextField
            name="message"
            label="Contanos sobre tu negocio (opcional)"
            description="Qué hacen y qué suelen comprar. Nos ayuda a revisar más rápido."
            multiline
          />
          {error && (
            <p role="alert" className="rounded-xl border border-destructive p-4 text-sm text-destructive">
              {error}
            </p>
          )}
          <Button type="submit" className="h-12 w-full rounded-full text-base font-bold sm:w-auto sm:px-8">
            {pending ? 'Enviando…' : 'Enviar solicitud'}
          </Button>
        </fieldset>
      </form>
    </FormProvider>
  )
}
