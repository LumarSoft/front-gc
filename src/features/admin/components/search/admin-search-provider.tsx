'use client'

import { createContext, useContext, useState } from 'react'
import dynamic from 'next/dynamic'
import { useHotkey } from '@/src/features/admin/hooks/use-hotkey'

const AdminSearchDialog = dynamic(() =>
  import('@/src/features/admin/components/search/admin-search-dialog').then(module => module.AdminSearchDialog),
)

const AdminSearchContext = createContext<(() => void) | null>(null)

/** Opens the search palette from any trigger (sidebar, phone top bar) or with ⌘K / Ctrl+K. */
export function AdminSearchProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  // The palette's code loads the first time it is opened.
  const [requested, setRequested] = useState(false)
  const openSearch = () => {
    setRequested(true)
    setOpen(true)
  }
  useHotkey('k', openSearch)

  return (
    <AdminSearchContext.Provider value={openSearch}>
      {children}
      {requested && <AdminSearchDialog open={open} onOpenChange={setOpen} />}
    </AdminSearchContext.Provider>
  )
}

export function useOpenAdminSearch(): () => void {
  const open = useContext(AdminSearchContext)
  if (!open) throw new Error('useOpenAdminSearch must be used inside AdminSearchProvider')
  return open
}
