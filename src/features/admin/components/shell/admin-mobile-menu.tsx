'use client'

import { MenuIcon } from 'lucide-react'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/src/components/ui/sheet'
import { AdminBrand } from '@/src/features/admin/components/shell/admin-brand'
import { AdminNav } from '@/src/features/admin/components/shell/admin-nav'
import { AdminSettingsLink } from '@/src/features/admin/components/shell/admin-settings-link'
import { StoreLink } from '@/src/features/admin/components/shell/store-link'
import { useAdminNavBadges } from '@/src/features/admin/hooks/use-admin-nav-badges'
import { ADMIN_NAV, isNavSectionActive, PINNED_NAV_ITEMS } from '@/src/features/admin/lib/admin-nav'
import { cn } from '@/src/lib/utils'

/** "Menú" tab of the phone bottom bar: every section on the same dark frame as the desktop sidebar. */
export function AdminMobileMenu() {
  const [open, setOpen] = useState(false)
  const badges = useAdminNavBadges()
  // Work waiting in a section that has no tab of its own (e.g. applications to review) marks the menu.
  const waiting = ADMIN_NAV.some(item => !item.pinned && item.badge && badges[item.badge])
  // Inside a section without its own tab (frequent customers, settings…), the menu is the current tab.
  const pathname = usePathname()
  const current = !PINNED_NAV_ITEMS.some(item => isNavSectionActive(item, pathname))

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className={cn(
          'flex flex-1 flex-col items-center gap-0.5 pt-2 pb-1.5 text-xs font-medium text-muted-foreground',
          current && 'text-foreground',
        )}
      >
        <span className="relative">
          <MenuIcon strokeWidth={current ? 2.5 : 2} className="size-5.5" />
          {waiting && (
            <span
              aria-hidden
              className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-foreground ring-2 ring-background"
            />
          )}
        </span>
        Menú
        {waiting && <span className="sr-only">, con pendientes</span>}
      </SheetTrigger>
      <SheetContent side="left" className="w-72 gap-0 border-none bg-frame p-0 text-frame-foreground">
        <SheetTitle className="sr-only">Menú del panel</SheetTitle>
        <div className="flex h-13 items-center px-3">
          <AdminBrand />
        </div>
        {/* Any link closes the sheet: navigation happens behind it. */}
        <div
          className="flex-1 overflow-y-auto px-3 py-2"
          onClick={event => (event.target as HTMLElement).closest('a') && setOpen(false)}
        >
          <AdminNav inSheet />
        </div>
        <div className="p-3 pb-safe-4">
          <AdminSettingsLink inSheet />
          <StoreLink />
        </div>
      </SheetContent>
    </Sheet>
  )
}
