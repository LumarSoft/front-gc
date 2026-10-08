'use client'

import { SidebarSimpleIcon } from '@phosphor-icons/react'
import { BrandLogoImage } from '@/src/components/layout/brand-logo-image'
import { AdminTooltip } from '@/src/features/admin/components/common/admin-tooltip'
import { AdminBrand } from '@/src/features/admin/components/shell/admin-brand'
import { useAdminSidebar } from '@/src/features/admin/hooks/use-admin-sidebar'
import { useIsMac } from '@/src/features/admin/hooks/use-is-mac'

const BUTTON =
  'grid h-8 place-items-center rounded-lg text-frame-muted transition-colors hover:bg-frame-hover hover:text-white focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none'

/**
 * Top of the sidebar. Expanded: the logo (to the panel home) and a button to fold the sidebar. Folded: the logo in
 * small, which turns into the expand icon under the pointer or focus, Shopify style.
 */
export function AdminSidebarHeader() {
  const { collapsed, toggle } = useAdminSidebar()
  const shortcut = [useIsMac() ? '⌘' : 'Ctrl', 'B']

  if (collapsed)
    return (
      <AdminTooltip label="Expandir navegación" shortcut={shortcut}>
        <button
          type="button"
          onClick={toggle}
          aria-label="Expandir navegación"
          className={`group/expand relative w-9 ${BUTTON}`}
        >
          <span className="transition-opacity duration-150 group-hover/expand:opacity-0 group-focus-visible/expand:opacity-0">
            <BrandLogoImage inverted className="h-3.5" />
          </span>
          <SidebarSimpleIcon
            aria-hidden
            className="absolute size-4.5 text-white opacity-0 transition-opacity duration-150 group-hover/expand:opacity-100 group-focus-visible/expand:opacity-100"
          />
        </button>
      </AdminTooltip>
    )

  return (
    <div className="flex items-center justify-between gap-2">
      <AdminBrand compact />
      <AdminTooltip label="Contraer navegación" shortcut={shortcut} side="bottom">
        <button type="button" onClick={toggle} aria-label="Contraer navegación" className={`w-8 ${BUTTON}`}>
          <SidebarSimpleIcon className="size-4.5" />
        </button>
      </AdminTooltip>
    </div>
  )
}
