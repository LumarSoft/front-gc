'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/src/components/ui/button'
import { EmailVerificationNotice } from '@/src/features/account/components/email-verification-notice'
import { useLogout } from '@/src/features/auth/hooks/use-auth-mutations'
import { useCurrentUser } from '@/src/features/auth/hooks/use-current-user'
import type { WholesaleStatus } from '@/src/types/api/auth'

const COMPANY_STATUS_LABEL: Record<WholesaleStatus, string> = {
  PENDING: 'Solicitud en revisión',
  APPROVED: 'Cuenta aprobada: ya ves precios preferenciales',
  REJECTED: 'Solicitud no aprobada',
  PAUSED: 'Cuenta pausada: por ahora comprás con precios de lista',
}

type AccountCardProps = {
  title: string
  children: React.ReactNode
}

function AccountCard({ title, children }: AccountCardProps) {
  return (
    <section className="flex flex-col gap-3 rounded-2xl border p-6">
      <h2 className="font-bold">{title}</h2>
      {children}
    </section>
  )
}

export function AccountOverview() {
  const router = useRouter()
  const { data: user, isPending, isError } = useCurrentUser()
  const logoutMutation = useLogout()

  const handleLogout = (): void => {
    logoutMutation.mutate(undefined, { onSettled: () => router.push('/') })
  }

  // Only visitors who arrive without a session go to login. After a logout the handler already navigates home.
  const hadSession = useRef(false)
  useEffect(() => {
    if (user) hadSession.current = true
  }, [user])
  useEffect(() => {
    if (!isPending && !isError && !user && !hadSession.current) router.replace('/ingresar?redirect=/mi-cuenta')
  }, [isPending, isError, user, router])

  if (isError) {
    return <p className="text-muted-foreground">No pudimos cargar tu cuenta. Recargá la página en unos minutos.</p>
  }

  if (!user) {
    return (
      <div aria-busy="true" className="flex flex-col gap-4">
        <div className="h-10 w-64 animate-pulse rounded-lg bg-muted" />
        <div className="h-40 animate-pulse rounded-2xl bg-muted" />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold text-primary">Mi cuenta</p>
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight sm:text-4xl">Hola, {user.firstName}</h1>
        </div>
        <Button
          variant="outline"
          className="h-10 self-start rounded-full px-5 sm:self-auto"
          disabled={logoutMutation.isPending}
          onClick={() => handleLogout()}
        >
          Cerrar sesión
        </Button>
      </div>

      {!user.emailVerified && <EmailVerificationNotice email={user.email} />}

      <div className="grid gap-4 md:grid-cols-2">
        <AccountCard title="Mis pedidos">
          <p className="text-sm text-muted-foreground">
            Acá vas a ver tus pedidos, su estado y el seguimiento del envío.
          </p>
          <Button asChild className="mt-auto h-10 self-start rounded-full px-5">
            <Link href="/">Ir a la tienda</Link>
          </Button>
        </AccountCard>

        <AccountCard title="Mis datos">
          <dl className="grid grid-cols-3 gap-y-2 text-sm">
            <dt className="text-muted-foreground">Nombre</dt>
            <dd className="col-span-2 font-medium">
              {user.firstName} {user.lastName}
            </dd>
            <dt className="text-muted-foreground">Email</dt>
            <dd className="col-span-2 truncate font-medium">{user.email}</dd>
            <dt className="text-muted-foreground">Teléfono</dt>
            <dd className="col-span-2 font-medium">{user.phone ?? '—'}</dd>
          </dl>
        </AccountCard>

        <AccountCard title="Clientes frecuentes">
          {user.company ? (
            <>
              <p className="text-sm font-medium">{user.company.legalName}</p>
              <p className="text-sm text-muted-foreground">{COMPANY_STATUS_LABEL[user.company.wholesaleStatus]}</p>
            </>
          ) : (
            <>
              <p className="text-sm text-muted-foreground">
                ¿Comprás para una imprenta, comercio o empresa? Pedí tu cuenta y accedé a precios preferenciales y
                cuenta corriente.
              </p>
              <Button asChild variant="outline" className="mt-auto h-10 self-start rounded-full px-5">
                <Link href="/clientes-frecuentes/alta">Solicitar cuenta</Link>
              </Button>
            </>
          )}
        </AccountCard>
      </div>
    </div>
  )
}
