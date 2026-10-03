'use client'

import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/src/components/ui/button'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/src/components/ui/field'
import { AuthHeading } from '@/src/features/auth/components/auth-heading'
import { FormAlert } from '@/src/features/auth/components/form-alert'
import { PasswordInput } from '@/src/features/auth/components/password-input'
import { SubmitButton } from '@/src/features/auth/components/submit-button'
import { useResetPassword } from '@/src/features/auth/hooks/use-auth-mutations'
import { getAuthErrorMessage } from '@/src/features/auth/lib/auth-error-message'
import { resetPasswordSchema, type ResetPasswordValues } from '@/src/features/auth/lib/auth-schemas'
import { AUTH_INPUT_CLASS } from '@/src/features/auth/lib/field-styles'

type ResetPasswordFormProps = {
  token: string | undefined
}

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const resetMutation = useResetPassword()
  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  })
  const { errors } = form.formState

  if (!token) {
    return (
      <>
        <AuthHeading title="Enlace incompleto" />
        <FormAlert>El enlace no es válido. Pedí uno nuevo desde “¿Olvidaste tu contraseña?”.</FormAlert>
        <Button asChild size="lg" className="mt-6 h-12 w-full rounded-full text-base font-bold">
          <Link href="/recuperar-contrasena">Pedir un enlace nuevo</Link>
        </Button>
      </>
    )
  }

  if (resetMutation.isSuccess) {
    return (
      <>
        <AuthHeading title="Listo, ya tenés tu nueva contraseña" />
        <FormAlert tone="success">Por seguridad cerramos la sesión en todos tus dispositivos.</FormAlert>
        <Button asChild size="lg" className="mt-6 h-12 w-full rounded-full text-base font-bold">
          <Link href="/ingresar">Ingresar</Link>
        </Button>
      </>
    )
  }

  const onSubmit = form.handleSubmit(({ password }) => resetMutation.mutate({ token, password }))

  return (
    <>
      <AuthHeading title="Elegí una nueva contraseña" />
      <form onSubmit={onSubmit} noValidate>
        <FieldGroup className="gap-5">
          {resetMutation.isError && <FormAlert>{getAuthErrorMessage(resetMutation.error, 'reset')}</FormAlert>}
          <Field data-invalid={!!errors.password}>
            <FieldLabel htmlFor="reset-password">Nueva contraseña</FieldLabel>
            <PasswordInput
              id="reset-password"
              autoComplete="new-password"
              aria-invalid={!!errors.password}
              className={AUTH_INPUT_CLASS}
              {...form.register('password')}
            />
            <FieldDescription>Mínimo 8 caracteres, con al menos una letra y un número.</FieldDescription>
            <FieldError errors={[errors.password]} />
          </Field>
          <Field data-invalid={!!errors.confirmPassword}>
            <FieldLabel htmlFor="reset-confirm-password">Repetí la contraseña</FieldLabel>
            <PasswordInput
              id="reset-confirm-password"
              autoComplete="new-password"
              aria-invalid={!!errors.confirmPassword}
              className={AUTH_INPUT_CLASS}
              {...form.register('confirmPassword')}
            />
            <FieldError errors={[errors.confirmPassword]} />
          </Field>
          <SubmitButton isPending={resetMutation.isPending} pendingLabel="Guardando…">
            Guardar contraseña
          </SubmitButton>
        </FieldGroup>
      </form>
    </>
  )
}
