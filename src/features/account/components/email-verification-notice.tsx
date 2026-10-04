'use client'

import { EnvelopeSimpleIcon } from '@phosphor-icons/react'
import { Button } from '@/src/components/ui/button'
import { useResendVerification } from '@/src/features/auth/hooks/use-auth-mutations'
import { getAuthErrorMessage } from '@/src/features/auth/lib/auth-error-message'

type EmailVerificationNoticeProps = {
  email: string
}

export function EmailVerificationNotice({ email }: EmailVerificationNoticeProps) {
  const resendMutation = useResendVerification()

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-yellow bg-yellow/10 p-5 sm:flex-row sm:items-center">
      <EnvelopeSimpleIcon weight="light" className="size-8 shrink-0 text-foreground" aria-hidden />
      <div className="flex-1 text-sm">
        <p className="font-semibold">Confirmá tu email</p>
        <p className="text-muted-foreground" role="status">
          {resendMutation.isSuccess
            ? `Listo, te reenviamos el enlace a ${email}.`
            : resendMutation.isError
              ? getAuthErrorMessage(resendMutation.error)
              : `Te enviamos un enlace a ${email}. Así podemos avisarte el estado de tus pedidos.`}
        </p>
      </div>
      {!resendMutation.isSuccess && (
        <Button
          variant="outline"
          className="h-10 rounded-full bg-background px-4"
          disabled={resendMutation.isPending}
          onClick={() => resendMutation.mutate()}
        >
          {resendMutation.isPending ? 'Enviando…' : 'Reenviar email'}
        </Button>
      )}
    </div>
  )
}
