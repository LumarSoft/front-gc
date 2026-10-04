'use client'

import { useState } from 'react'
import { ListIcon } from '@phosphor-icons/react'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/src/components/ui/sheet'
import { AdminBrand } from '@/src/features/admin/components/shell/admin-brand'
import { AdminNav } from '@/src/features/admin/components/shell/admin-nav'
import { StoreLink } from '@/src/features/admin/components/shell/store-link'

/** "Menú" tab of the phone bottom bar: every section, grouped like the desktop sidebar. */
export function AdminMobileMenu() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="flex flex-1 flex-col items-center gap-0.5 pt-2 pb-1.5 text-xs text-muted-foreground">
        <ListIcon className="size-5.5" />
        Menú
      </SheetTrigger>
      <SheetContent side="left" className="w-72 gap-0 p-0">
        <SheetTitle className="sr-only">Menú del panel</SheetTitle>
        <div className="flex h-14 items-center border-b px-4">
          <AdminBrand />
        </div>
        {/* Any link closes the sheet: navigation happens behind it. */}
        <div
          className="flex-1 overflow-y-auto px-3 py-4"
          onClick={event => (event.target as HTMLElement).closest('a') && setOpen(false)}
        >
          <AdminNav />
        </div>
        <div className="border-t p-3 pb-safe-4">
          <StoreLink />
        </div>
      </SheetContent>
    </Sheet>
  )
}
