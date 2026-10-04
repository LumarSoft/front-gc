'use client'

import { UserCircleIcon } from '@phosphor-icons/react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/src/components/ui/sheet'
import { AdminUserBlock } from '@/src/features/admin/components/admin-user-block'
import type { AuthUser } from '@/src/types/api/auth'

type AdminAccountSheetProps = {
  user: AuthUser
}

/** Last cell of the mobile tab bar: account, back to the store, sign out. */
export function AdminAccountSheet({ user }: AdminAccountSheetProps) {
  return (
    <Sheet>
      <SheetTrigger className="flex flex-1 flex-col items-center gap-1 pt-2 pb-1.5 text-xs font-medium text-muted-foreground">
        <UserCircleIcon weight="light" className="size-6" />
        Cuenta
      </SheetTrigger>
      <SheetContent side="bottom" className="rounded-t-2xl pb-safe-4">
        <SheetHeader>
          <SheetTitle>Tu cuenta</SheetTitle>
        </SheetHeader>
        <div className="px-1 pb-2">
          <AdminUserBlock user={user} />
        </div>
      </SheetContent>
    </Sheet>
  )
}
