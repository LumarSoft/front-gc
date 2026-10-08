'use client'

import { createContext, useState } from 'react'
import { useSidebarShortcut } from '@/src/features/admin/hooks/use-sidebar-shortcut'
import { SIDEBAR_COOKIE } from '@/src/features/admin/lib/admin-sidebar'

export type AdminSidebarState = { collapsed: boolean; toggle: () => void }

export const AdminSidebarContext = createContext<AdminSidebarState>({ collapsed: false, toggle: () => {} })

type AdminSidebarProviderProps = {
  /** From the cookie, read by the admin layout on the server. */
  initialCollapsed: boolean
  children: React.ReactNode
}

/** Whether the desktop sidebar is folded to its icon rail; ⌘B / Ctrl+B toggles it, and a cookie remembers it. */
export function AdminSidebarProvider({ initialCollapsed, children }: AdminSidebarProviderProps) {
  const [collapsed, setCollapsed] = useState(initialCollapsed)
  const toggle = () =>
    setCollapsed(current => {
      const next = !current
      document.cookie = `${SIDEBAR_COOKIE}=${next ? 'collapsed' : 'expanded'}; path=/admin; max-age=31536000; samesite=lax`
      return next
    })
  useSidebarShortcut(toggle)

  return <AdminSidebarContext value={{ collapsed, toggle }}>{children}</AdminSidebarContext>
}
