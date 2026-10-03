'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FieldGroup } from '@/src/components/ui/field'
import { FormField } from '@/src/components/ui/form-field'
import { Input } from '@/src/components/ui/input'
import { AuthHeading } from '@/src/features/auth/components/auth-heading'
import { FormAlert } from '@/src/features/auth/components/form-alert'
import { PasswordInput } from '@/src/features/auth/components/password-input'
import { SubmitButton } from '@/src/features/auth/components/submit-button'
import { useLogin } from '@/src/features/auth/hooks/use-auth-mutations'
import { getAuthErrorMessage } from '@/src/features/auth/lib/auth-error-message'
import { loginSchema, type LoginValues } from '@/src/features/auth/lib/auth-schemas'
import { AUTH_INPUT_CLASS } from '@/src/features/auth/lib/field-styles'

type LoginFormProps = {
  redirectTo: string
}

export function LoginForm({ redirectTo }: LoginFormProps) {
  const router = useRouter()
  const loginMutation = useLogin()
  const form = useForm<LoginValues>({ resolver: zodResolver(loginSchema), defaultValues: { email: '', password: '' } })
  const { errors } = form.formState

  const onSubmit = form.handleSubmit(values =>
    loginMutation.mutate(values, { onSuccess: () => router.replace(redirectTo) }),
  )

  const registerHref = `/registro${redirectTo === '/' ? '' : `?redirect=${encodeURIComponent(redirectTo)}`}`

  return (
    <>
      <AuthHeading
        title="Ingresá a tu cuenta"
        description={
          <>
            ¿Primera vez?{' '}
            <Link href={registerHref} className="font-semibold text-primary hover:underline">
              Creá tu cuenta
            </Link>
          </>
        }
      />
      <form onSubmit={onSubmit} noValidate>
        <FieldGroup className="gap-5">
          {loginMutation.isError && <FormAlert>{getAuthErrorMessage(loginMutation.error, 'login')}</FormAlert>}

          <FormField id="login-email" label="Email" error={errors.email}>
            <Input
              id="login-email"
              type="email"
              autoComplete="email"
              inputMode="email"
              aria-invalid={!!errors.email}
              className={AUTH_INPUT_CLASS}
              {...form.register('email')}
            />
          </FormField>

          <FormField
            id="login-password"
            label="Contraseña"
            error={errors.password}
            labelAction={
              <Link href="/recuperar-contrasena" className="text-sm font-medium text-primary hover:underline">
                ¿La olvidaste?
              </Link>
            }
          >
            <PasswordInput
              id="login-password"
              autoComplete="current-password"
              aria-invalid={!!errors.password}
              className={AUTH_INPUT_CLASS}
              {...form.register('password')}
            />
          </FormField>

          <SubmitButton isPending={loginMutation.isPending} pendingLabel="Ingresando…">
            Ingresar
          </SubmitButton>
        </FieldGroup>
      </form>
    </>
  )
}
