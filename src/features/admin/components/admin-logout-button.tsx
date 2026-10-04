'use client'

import { useRouter } from 'next/navigation'
import { SignOutIcon } from '@phosphor-icons/react'
import { Button } from '@/src/components/ui/button'
import { useLogout } from '@/src/features/auth/hooks/use-auth-mutations'

export function AdminLogoutButton() {
  const router = useRouter()
  const logoutMutation = useLogout()

  return (
    <Button
      variant="ghost"
      className="w-full justify-start gap-3 px-3 text-muted-foreground"
      disabled={logoutMutation.isPending}
      onClick={() => logoutMutation.mutate(undefined, { onSettled: () => router.push('/') })}
    >
      <SignOutIcon weight="light" className="size-5" />
      Cerrar sesión
    </Button>
  )
}
