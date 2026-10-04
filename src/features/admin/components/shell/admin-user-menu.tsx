'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowSquareOutIcon, SignOutIcon } from '@phosphor-icons/react'
import { Avatar, AvatarFallback } from '@/src/components/ui/avatar'
import { Button } from '@/src/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu'
import { useLogout } from '@/src/features/auth/hooks/use-auth-mutations'
import type { AuthUser } from '@/src/types/api/auth'

type AdminUserMenuProps = {
  user: AuthUser
}

export function AdminUserMenu({ user }: AdminUserMenuProps) {
  const router = useRouter()
  const logoutMutation = useLogout()
  const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-9 gap-2 px-1.5" aria-label="Abrir el menú de tu cuenta">
          <Avatar className="size-7">
            <AvatarFallback className="bg-primary text-xs font-semibold text-primary-foreground">
              {initials}
            </AvatarFallback>
          </Avatar>
          <span className="hidden max-w-36 truncate text-sm font-medium md:inline">{user.firstName}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuLabel className="flex flex-col">
          <span className="truncate font-medium">
            {user.firstName} {user.lastName}
          </span>
          <span className="truncate text-xs font-normal text-muted-foreground">{user.email}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/" target="_blank">
            <ArrowSquareOutIcon className="size-4" />
            Ver la tienda
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={logoutMutation.isPending}
          onSelect={() => logoutMutation.mutate(undefined, { onSettled: () => router.push('/') })}
        >
          <SignOutIcon className="size-4" />
          Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
