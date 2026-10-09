'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CircleUser, Heart, LogOut, Package, Settings, User } from 'lucide-react'
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
import { useCurrentUser } from '@/src/features/auth/hooks/use-current-user'

export function AccountMenu() {
  const router = useRouter()
  const { data: user } = useCurrentUser()
  const logoutMutation = useLogout()

  const handleLogout = (): void => {
    logoutMutation.mutate(undefined, { onSettled: () => router.push('/') })
  }

  if (!user) {
    return (
      <Button asChild variant="ghost" className="h-10 gap-2 px-2 text-sm font-medium sm:px-2.5">
        <Link href="/ingresar" aria-label="Ingresá a tu cuenta">
          <User strokeWidth={1.5} className="size-6" />
          <span className="hidden lg:inline">Mi cuenta</span>
        </Link>
      </Button>
    )
  }

  const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-10 gap-2 px-1.5 sm:px-2" aria-label="Abrir menú de tu cuenta">
          <span className="grid size-8 place-items-center rounded-full bg-accent text-xs font-bold text-primary">
            {initials}
          </span>
          <span className="hidden max-w-32 truncate text-sm lg:inline">Hola, {user.firstName}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuLabel className="flex flex-col">
          <span className="truncate font-semibold">
            {user.firstName} {user.lastName}
          </span>
          <span className="truncate text-xs font-normal text-muted-foreground">{user.email}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/mi-cuenta">
            <CircleUser strokeWidth={1.5} className="size-5" />
            Mi cuenta
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/mi-cuenta/pedidos">
            <Package strokeWidth={1.5} className="size-5" />
            Mis pedidos
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/favoritos">
            <Heart strokeWidth={1.5} className="size-5" />
            Mis favoritos
          </Link>
        </DropdownMenuItem>
        {user.role === 'ADMIN' && (
          <DropdownMenuItem asChild>
            <Link href="/admin">
              <Settings strokeWidth={1.5} className="size-5" />
              Administración
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled={logoutMutation.isPending} onSelect={() => handleLogout()}>
          <LogOut strokeWidth={1.5} className="size-5" />
          Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
