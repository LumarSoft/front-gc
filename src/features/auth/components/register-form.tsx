'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Checkbox } from '@/src/components/ui/checkbox'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/src/components/ui/field'
import { Input } from '@/src/components/ui/input'
import { AuthHeading } from '@/src/features/auth/components/auth-heading'
import { FormAlert } from '@/src/features/auth/components/form-alert'
import { PasswordInput } from '@/src/features/auth/components/password-input'
import { SubmitButton } from '@/src/features/auth/components/submit-button'
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
            <Field data-invalid={!!errors.firstName}>
              <FieldLabel htmlFor="register-first-name">Nombre</FieldLabel>
              <Input
                id="register-first-name"
                autoComplete="given-name"
                aria-invalid={!!errors.firstName}
                className={AUTH_INPUT_CLASS}
                {...form.register('firstName')}
              />
              <FieldError errors={[errors.firstName]} />
            </Field>
            <Field data-invalid={!!errors.lastName}>
              <FieldLabel htmlFor="register-last-name">Apellido</FieldLabel>
              <Input
                id="register-last-name"
                autoComplete="family-name"
                aria-invalid={!!errors.lastName}
                className={AUTH_INPUT_CLASS}
                {...form.register('lastName')}
              />
              <FieldError errors={[errors.lastName]} />
            </Field>
          </div>

          <Field data-invalid={!!errors.email}>
            <FieldLabel htmlFor="register-email">Email</FieldLabel>
            <Input
              id="register-email"
              type="email"
              autoComplete="email"
              inputMode="email"
              aria-invalid={!!errors.email}
              className={AUTH_INPUT_CLASS}
              {...form.register('email')}
            />
            <FieldError errors={[errors.email]} />
          </Field>

          <Field data-invalid={!!errors.phone}>
            <FieldLabel htmlFor="register-phone">
              Teléfono <span className="font-normal text-muted-foreground">(opcional)</span>
            </FieldLabel>
            <Input
              id="register-phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              aria-invalid={!!errors.phone}
              className={AUTH_INPUT_CLASS}
              {...form.register('phone')}
            />
            <FieldDescription>Lo usamos solo para coordinar envíos y retiros.</FieldDescription>
            <FieldError errors={[errors.phone]} />
          </Field>

          <Field data-invalid={!!errors.password}>
            <FieldLabel htmlFor="register-password">Contraseña</FieldLabel>
            <PasswordInput
              id="register-password"
              autoComplete="new-password"
              aria-invalid={!!errors.password}
              className={AUTH_INPUT_CLASS}
              {...form.register('password')}
            />
            <FieldDescription>Mínimo 8 caracteres, con al menos una letra y un número.</FieldDescription>
            <FieldError errors={[errors.password]} />
          </Field>

          <Controller
            control={form.control}
            name="marketingOptIn"
            render={({ field }) => (
              <Field orientation="horizontal">
                <Checkbox
                  id="register-marketing"
                  checked={field.value}
                  onCheckedChange={checked => field.onChange(checked === true)}
                />
                <FieldLabel htmlFor="register-marketing" className="font-normal">
                  Quiero recibir ofertas y novedades por email
                </FieldLabel>
              </Field>
            )}
          />

          <SubmitButton isPending={registerMutation.isPending} pendingLabel="Creando tu cuenta…">
            Crear cuenta
          </SubmitButton>

          {/* TODO(legal): these pages do not exist yet; their text must come from the client. */}
          <p className="text-center text-xs text-muted-foreground">
            Al crear tu cuenta aceptás los{' '}
            <Link href="/legales/terminos" className="underline">
              Términos y condiciones
            </Link>{' '}
            y la{' '}
            <Link href="/legales/privacidad" className="underline">
              Política de privacidad
            </Link>
            .
          </p>
        </FieldGroup>
      </form>
    </>
  )
}
