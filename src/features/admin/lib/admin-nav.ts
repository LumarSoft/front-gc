import type { LucideIcon } from 'lucide-react'
import { Building2Icon, ChartLineIcon, HouseIcon, InboxIcon, PackageIcon, SettingsIcon } from 'lucide-react'

export type AdminNavLink = {
  label: string
  href: string
  /** Only the exact path is active (for the home); otherwise any sub-path also is. */
  exact?: boolean
}

export type AdminNavItem = AdminNavLink & {
  icon: LucideIcon
  /** Shown as its own tab in the phone bottom bar; the rest live in the "Menú" sheet. */
  pinned?: boolean
  /** Sub-sections, shown under the item while the admin is anywhere inside it. */
  children?: AdminNavLink[]
  /** Counter next to the label (work waiting in that section). */
  badge?: AdminNavBadge
}

export type AdminNavBadge = 'ordersWaiting' | 'wholesalePending'

/** Admin sections. Each admin PR adds its section here when its page exists, so there are no dead links. */
export const ADMIN_NAV: AdminNavItem[] = [
  { label: 'Inicio', href: '/admin', icon: HouseIcon, exact: true, pinned: true },
  { label: 'Pedidos', href: '/admin/pedidos', icon: InboxIcon, pinned: true, badge: 'ordersWaiting' },
  {
    label: 'Productos',
    href: '/admin/productos',
    icon: PackageIcon,
    pinned: true,
    children: [
      { label: 'Categorías', href: '/admin/categorias' },
      { label: 'Marcas', href: '/admin/marcas' },
      { label: 'Etiquetas', href: '/admin/etiquetas' },
    ],
  },
  {
    label: 'Clientes frecuentes',
    href: '/admin/clientes-frecuentes',
    icon: Building2Icon,
    badge: 'wholesalePending',
  },
  { label: 'Estadísticas', href: '/admin/estadisticas', icon: ChartLineIcon },
]

/** Store settings, at the bottom of the sidebar like Shopify's "Configuración". */
export const ADMIN_SETTINGS_NAV: AdminNavItem = {
  label: 'Configuración',
  href: '/admin/configuracion',
  icon: SettingsIcon,
  children: [{ label: 'Cotización del dólar', href: '/admin/cotizacion' }],
}

/**
 * Distance from a rail icon (36 px, centred in the 56 px rail) to its tooltip or flyout: they open clear of the rail's
 * edge, over the page, like Shopify's.
 */
export const RAIL_POPOVER_OFFSET = 20

export function isNavLinkActive(link: AdminNavLink, pathname: string): boolean {
  return link.exact ? pathname === link.href : pathname === link.href || pathname.startsWith(`${link.href}/`)
}

/** The item or one of its sub-sections is open: its sub-navigation is shown. */
export function isNavSectionActive(item: AdminNavItem, pathname: string): boolean {
  return isNavLinkActive(item, pathname) || (item.children ?? []).some(child => isNavLinkActive(child, pathname))
}

/** Every destination, flattened, for the search palette. */
export const ADMIN_DESTINATIONS: AdminNavLink[] = [...ADMIN_NAV, ADMIN_SETTINGS_NAV].flatMap(item => [
  item,
  ...(item.children ?? []),
])

export const PINNED_NAV_ITEMS: AdminNavItem[] = ADMIN_NAV.filter(item => item.pinned)
