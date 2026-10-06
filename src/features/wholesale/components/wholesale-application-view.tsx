'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/src/components/ui/button'
import { useMyWholesaleApplication } from '../hooks/use-my-wholesale-application'
import { WholesaleApplicationForm } from './wholesale-application-form'
import { WholesaleStatusPanel } from './wholesale-status-panel'

/** Sign-in prompt, application form or the status of the customer's request, depending on where they stand. */
export function WholesaleApplicationView() {
  const { session, query, apply, applyError } = useMyWholesaleApplication()
  const [reapplying, setReapplying] = useState(false)
  if (session.isPending || (session.data && query.isPending))
    return (
      <p role="status" className="text-muted-foreground">
        Cargando…
      </p>
    )
  if (!session.data)
    return (
      <div className="rounded-2xl bg-surface p-6">
        <p className="font-bold">Ingresá para pedir tu cuenta</p>
        <p className="mt-1 text-sm text-muted-foreground">
          La solicitud queda asociada a tu usuario. Si todavía no tenés uno, creálo en un minuto.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button asChild className="h-10 rounded-full px-5">
            <Link href="/ingresar?redirect=%2Fclientes-frecuentes%2Falta">Ingresar</Link>
          </Button>
          <Button asChild variant="outline" className="h-10 rounded-full px-5">
            <Link href="/registro">Crear cuenta</Link>
          </Button>
        </div>
      </div>
    )
  if (query.isError || !query.data)
    return (
      <div role="alert">
        <p>No pudimos cargar tu solicitud.</p>
        <Button className="mt-3 rounded-full" onClick={() => void query.refetch()}>
          Reintentar
        </Button>
      </div>
    )
  const { application, canApply } = query.data
  const form = (
    <WholesaleApplicationForm
      user={session.data}
      previous={application}
      pending={apply.isPending}
      error={applyError}
      onSubmit={input => apply.mutate(input, { onSuccess: () => setReapplying(false) })}
    />
  )
  if (!application) return form
  return (
    <div className="space-y-8">
      <WholesaleStatusPanel application={application}>
        {canApply && !reapplying && (
          <Button className="mt-6 rounded-full" onClick={() => setReapplying(true)}>
            Enviar una nueva solicitud
          </Button>
        )}
      </WholesaleStatusPanel>
      {canApply && reapplying && form}
    </div>
  )
}
