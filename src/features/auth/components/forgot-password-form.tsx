'use client'

import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/src/components/ui/field'
import { Input } from '@/src/components/ui/input'
import { AuthHeading } from '@/src/features/auth/components/auth-heading'
import { FormAlert } from '@/src/features/auth/components/form-alert'
import { SubmitButton } from '@/src/features/auth/components/submit-button'
import { useForgotPassword } from '@/src/features/auth/hooks/use-auth-mutations'
import { getAuthErrorMessage } from '@/src/features/auth/lib/auth-error-message'
import { forgotPasswordSchema, type ForgotPasswordValues } from '@/src/features/auth/lib/auth-schemas'
import { AUTH_INPUT_CLASS } from '@/src/features/auth/lib/field-styles'

export function ForgotPasswordForm() {
  const forgotMutation = useForgotPassword()
  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  })
  const { errors } = form.formState

  const onSubmit = form.handleSubmit(({ email }) => forgotMutation.mutate(email))

  if (forgotMutation.isSuccess) {
    return (
      <>
        <AuthHeading title="Revisá tu correo" />
        <FormAlert tone="success">
          Si <strong>{form.getValues('email')}</strong> tiene una cuenta, te enviamos un enlace para elegir una nueva
          contraseña. Vence en 1 hora.
        </FormAlert>
        <p className="mt-6 text-sm text-muted-foreground">
          ¿No llegó? Revisá la carpeta de spam o{' '}
          <button
            type="button"
            onClick={() => forgotMutation.reset()}
            className="font-semibold text-primary hover:underline"
          >
            probá con otro email
          </button>
          .
        </p>
      </>
    )
  }

  return (
    <>
      <AuthHeading
        title="Recuperá tu contraseña"
        description="Escribí el email de tu cuenta y te mandamos un enlace para elegir una nueva."
      />
      <form onSubmit={onSubmit} noValidate>
        <FieldGroup className="gap-5">
          {forgotMutation.isError && <FormAlert>{getAuthErrorMessage(forgotMutation.error)}</FormAlert>}
          <Field data-invalid={!!errors.email}>
            <FieldLabel htmlFor="forgot-email">Email</FieldLabel>
            <Input
              id="forgot-email"
              type="email"
              autoComplete="email"
              inputMode="email"
              aria-invalid={!!errors.email}
              className={AUTH_INPUT_CLASS}
              {...form.register('email')}
            />
            <FieldError errors={[errors.email]} />
          </Field>
          <SubmitButton isPending={forgotMutation.isPending} pendingLabel="Enviando…">
            Enviar enlace
          </SubmitButton>
          <Link href="/ingresar" className="text-center text-sm font-medium text-primary hover:underline">
            Volver a ingresar
          </Link>
        </FieldGroup>
      </form>
    </>
  )
}
