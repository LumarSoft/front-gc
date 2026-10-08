'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowSquareOutIcon, CaretUpDownIcon, SignOutIcon } from '@phosphor-icons/react'
import { Avatar, AvatarFallback } from '@/src/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu'
import { useLogout } from '@/src/features/auth/hooks/use-auth-mutations'
import { cn } from '@/src/lib/utils'
import type { AuthUser } from '@/src/types/api/auth'

type AdminAccountMenuProps = {
  user: AuthUser
  /** "sidebar": name and email at the bottom of the sidebar; "compact": just the avatar (phone top bar). */
  variant?: 'sidebar' | 'compact'
}

export function AdminAccountMenu({ user, variant = 'sidebar' }: AdminAccountMenuProps) {
  const router = useRouter()
  const logoutMutation = useLogout()
  const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase()
  const compact = variant === 'compact'

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Abrir el menú de tu cuenta"
        className={cn(
          'flex items-center gap-2 rounded-lg text-left transition-colors hover:bg-frame-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none aria-expanded:bg-frame-accent',
          compact ? 'p-1' : 'w-full p-1.5',
        )}
      >
        <Avatar className="size-7 rounded-lg after:rounded-lg">
          <AvatarFallback className="rounded-lg bg-tone-success text-xs font-semibold text-tone-success-foreground">
            {initials}
          </AvatarFallback>
        </Avatar>
        {!compact && (
          <>
            <span className="flex min-w-0 flex-1 flex-col leading-tight">
              <span className="truncate text-sm font-medium text-white">
                {user.firstName} {user.lastName}
              </span>
              <span className="truncate text-xs text-frame-muted">{user.email}</span>
            </span>
            <CaretUpDownIcon className="size-4 shrink-0 text-frame-muted" />
          </>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align={compact ? 'end' : 'start'} side={compact ? 'bottom' : 'top'} className="w-60">
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
