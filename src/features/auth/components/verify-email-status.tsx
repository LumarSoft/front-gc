'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { Button } from '@/src/components/ui/button'
import { AuthHeading } from '@/src/features/auth/components/auth-heading'
import { FormAlert } from '@/src/features/auth/components/form-alert'
import { useVerifyEmail } from '@/src/features/auth/hooks/use-auth-mutations'
import { getAuthErrorMessage } from '@/src/features/auth/lib/auth-error-message'

type VerifyEmailStatusProps = {
  token: string | undefined
}

export function VerifyEmailStatus({ token }: VerifyEmailStatusProps) {
  const verifyMutation = useVerifyEmail()
  const { mutate } = verifyMutation
  // The link is single-use: guard against React running the effect twice in development.
  const hasRequested = useRef(false)

  useEffect(() => {
    if (!token || hasRequested.current) return
    hasRequested.current = true
    mutate(token)
  }, [token, mutate])

  if (!token || verifyMutation.isError) {
    return (
      <>
        <AuthHeading title="No pudimos confirmar tu email" />
        <FormAlert>
          {token ? getAuthErrorMessage(verifyMutation.error, 'verify') : 'El enlace está incompleto.'} Podés pedir uno
          nuevo desde tu cuenta.
        </FormAlert>
        <Button asChild size="lg" className="mt-6 h-12 w-full rounded-full text-base font-bold">
          <Link href="/mi-cuenta">Ir a mi cuenta</Link>
        </Button>
      </>
    )
  }

  if (verifyMutation.isSuccess) {
    return (
      <>
        <AuthHeading title="¡Email confirmado!" description="Gracias. Tu cuenta ya está lista para comprar." />
        <Button asChild size="lg" className="h-12 w-full rounded-full text-base font-bold">
          <Link href="/">Ir a la tienda</Link>
        </Button>
      </>
    )
  }

  return <AuthHeading title="Confirmando tu email…" description="Esto tarda solo un segundo." />
}
