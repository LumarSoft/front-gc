import type { Icon } from '@phosphor-icons/react'
import {
  CurrencyDollarIcon,
  FoldersIcon,
  HouseIcon,
  PackageIcon,
  StorefrontIcon,
  TagIcon,
  TrademarkIcon,
} from '@phosphor-icons/react'

export type AdminNavItem = {
  label: string
  href: string
  icon: Icon
  /** Only the exact path is active (for the home); otherwise any sub-path also is. */
  exact?: boolean
  /** Shown as its own tab in the phone bottom bar; the rest live in the "Menú" sheet. */
  pinned?: boolean
}

export type AdminNavGroup = {
  /** Null for the ungrouped first block (Inicio). */
  label: string | null
  items: AdminNavItem[]
}

/** Admin sections. Each admin PR adds its section here when its page exists, so there are no dead links. */
export const ADMIN_NAV: AdminNavGroup[] = [
  { label: null, items: [{ label: 'Inicio', href: '/admin', icon: HouseIcon, exact: true, pinned: true }] },
  {
    label: 'Catálogo',
    items: [
      { label: 'Productos', href: '/admin/productos', icon: PackageIcon, pinned: true },
      { label: 'Categorías', href: '/admin/categorias', icon: FoldersIcon, pinned: true },
      { label: 'Marcas', href: '/admin/marcas', icon: TrademarkIcon },
      { label: 'Etiquetas', href: '/admin/etiquetas', icon: TagIcon },
    ],
  },
  {
    label: 'Precios',
    items: [{ label: 'Cotización del dólar', href: '/admin/cotizacion', icon: CurrencyDollarIcon }],
  },
  {
    label: 'Ventas',
    items: [
      { label: 'Pedidos', href: '/admin/pedidos', icon: PackageIcon },
      { label: 'Clientes frecuentes', href: '/admin/clientes-frecuentes', icon: StorefrontIcon },
    ],
  },
]

export function isNavItemActive(item: AdminNavItem, pathname: string): boolean {
  return item.exact ? pathname === item.href : pathname === item.href || pathname.startsWith(`${item.href}/`)
}

/** The section the admin is in, for breadcrumbs. */
export function findActiveNav(pathname: string): { group: AdminNavGroup; item: AdminNavItem } | null {
  for (const group of ADMIN_NAV) {
    const item = group.items.find(candidate => isNavItemActive(candidate, pathname))
    if (item) return { group, item }
  }
  return null
}

export const PINNED_NAV_ITEMS: AdminNavItem[] = ADMIN_NAV.flatMap(group => group.items).filter(item => item.pinned)
