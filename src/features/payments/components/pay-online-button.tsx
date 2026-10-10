'use client'

import { Button } from '@/src/components/ui/button'
import { cn } from '@/src/lib/utils'
import { useMercadoPagoRedirect } from '../hooks/use-mercado-pago-redirect'

type PayOnlineButtonProps = {
  number: string
  accessToken: string
  label?: string
  className?: string
}

/** Opens a new Mercado Pago checkout for the order; errors are shown next to it. */
export function PayOnlineButton({
  number,
  accessToken,
  label = 'Pagar con Mercado Pago',
  className,
}: PayOnlineButtonProps) {
  const { redirect, pending, error } = useMercadoPagoRedirect()
  return (
    <div className={cn('space-y-2', className)}>
      <Button
        className="h-12 w-full rounded-full font-bold sm:w-auto sm:px-8"
        disabled={pending}
        onClick={() => void redirect(number, accessToken).catch(() => undefined)}
      >
        {pending ? 'Abriendo Mercado Pago…' : label}
      </Button>
      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}
