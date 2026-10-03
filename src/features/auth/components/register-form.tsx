'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckboxField } from '@/src/components/ui/checkbox-field'
import { FieldGroup } from '@/src/components/ui/field'
import { FormField } from '@/src/components/ui/form-field'
import { Input } from '@/src/components/ui/input'
import { AuthHeading } from '@/src/features/auth/components/auth-heading'
import { FormAlert } from '@/src/features/auth/components/form-alert'
import { PasswordInput } from '@/src/features/auth/components/password-input'
import { SubmitButton } from '@/src/features/auth/components/submit-button'
import { TermsNotice } from '@/src/features/auth/components/terms-notice'
import { useRegister } from '@/src/features/auth/hooks/use-auth-mutations'
import { getAuthErrorMessage } from '@/src/features/auth/lib/auth-error-message'
import { registerSchema, type RegisterValues } from '@/src/features/auth/lib/auth-schemas'
import { AUTH_INPUT_CLASS } from '@/src/features/auth/lib/field-styles'

type RegisterFormProps = {
  redirectTo: string
}

export function RegisterForm({ redirectTo }: RegisterFormProps) {
  const router = useRouter()
  const registerMutation = useRegister()
  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { firstName: '', lastName: '', email: '', phone: '', password: '', marketingOptIn: false },
  })
  const { errors } = form.formState

  const onSubmit = form.handleSubmit(({ phone, ...values }) =>
    registerMutation.mutate({ ...values, phone: phone || undefined }, { onSuccess: () => router.replace(redirectTo) }),
  )

  const loginHref = `/ingresar${redirectTo === '/mi-cuenta' ? '' : `?redirect=${encodeURIComponent(redirectTo)}`}`

  return (
    <>
      <AuthHeading
        title="Creá tu cuenta"
        description={
          <>
            ¿Ya tenés una?{' '}
            <Link href={loginHref} className="font-semibold text-primary hover:underline">
              Ingresá
            </Link>
          </>
        }
      />
      <form onSubmit={onSubmit} noValidate>
        <FieldGroup className="gap-5">
          {registerMutation.isError && <FormAlert>{getAuthErrorMessage(registerMutation.error, 'register')}</FormAlert>}

          <div className="grid gap-5 sm:grid-cols-2">
            <FormField id="register-first-name" label="Nombre" error={errors.firstName}>
              <Input
                id="register-first-name"
                autoComplete="given-name"
                aria-invalid={!!errors.firstName}
                className={AUTH_INPUT_CLASS}
                {...form.register('firstName')}
              />
            </FormField>
            <FormField id="register-last-name" label="Apellido" error={errors.lastName}>
              <Input
                id="register-last-name"
                autoComplete="family-name"
                aria-invalid={!!errors.lastName}
                className={AUTH_INPUT_CLASS}
                {...form.register('lastName')}
              />
            </FormField>
          </div>

          <FormField id="register-email" label="Email" error={errors.email}>
            <Input
              id="register-email"
              type="email"
              autoComplete="email"
              inputMode="email"
              aria-invalid={!!errors.email}
              className={AUTH_INPUT_CLASS}
              {...form.register('email')}
            />
          </FormField>

          <FormField
            id="register-phone"
            label={
              <>
                Teléfono <span className="font-normal text-muted-foreground">(opcional)</span>
              </>
            }
            error={errors.phone}
            description="Lo usamos solo para coordinar envíos y retiros."
          >
            <Input
              id="register-phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              aria-invalid={!!errors.phone}
              className={AUTH_INPUT_CLASS}
              {...form.register('phone')}
            />
          </FormField>

          <FormField
            id="register-password"
            label="Contraseña"
            error={errors.password}
            description="Mínimo 8 caracteres, con al menos una letra y un número."
          >
            <PasswordInput
              id="register-password"
              autoComplete="new-password"
              aria-invalid={!!errors.password}
              className={AUTH_INPUT_CLASS}
              {...form.register('password')}
            />
          </FormField>

          <Controller
            control={form.control}
            name="marketingOptIn"
            render={({ field }) => (
              <CheckboxField
                id="register-marketing"
                label="Quiero recibir ofertas y novedades por email"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />

          <SubmitButton isPending={registerMutation.isPending} pendingLabel="Creando tu cuenta…">
            Crear cuenta
          </SubmitButton>

          <TermsNotice />
        </FieldGroup>
      </form>
    </>
  )
}
