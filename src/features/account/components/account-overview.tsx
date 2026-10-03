'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/src/components/ui/button'
import { EmailVerificationNotice } from '@/src/features/account/components/email-verification-notice'
import { FrequentCustomerCard } from '@/src/features/account/components/frequent-customer-card'
import { OrdersCard } from '@/src/features/account/components/orders-card'
import { ProfileCard } from '@/src/features/account/components/profile-card'
import { useAccountUser } from '@/src/features/account/hooks/use-account-user'
import { useLogout } from '@/src/features/auth/hooks/use-auth-mutations'

function AccountSkeleton() {
  return (
    <div aria-busy="true" className="flex flex-col gap-4">
      <div className="h-10 w-64 animate-pulse rounded-lg bg-muted" />
      <div className="h-40 animate-pulse rounded-2xl bg-muted" />
    </div>
  )
}

export function AccountOverview() {
  const router = useRouter()
  const { data: user, isError } = useAccountUser()
  const logoutMutation = useLogout()

  if (isError) {
    return <p className="text-muted-foreground">No pudimos cargar tu cuenta. Recargá la página en unos minutos.</p>
  }
  if (!user) return <AccountSkeleton />

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
          onClick={() => logoutMutation.mutate(undefined, { onSettled: () => router.push('/') })}
        >
          Cerrar sesión
        </Button>
      </div>

      {!user.emailVerified && <EmailVerificationNotice email={user.email} />}

      <div className="grid gap-4 md:grid-cols-2">
        <OrdersCard />
        <ProfileCard user={user} />
        <FrequentCustomerCard company={user.company} />
      </div>
    </div>
  )
}
