'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CircleNotchIcon, MagnifyingGlassIcon } from '@phosphor-icons/react'
import { Dialog, DialogContent, DialogTitle } from '@/src/components/ui/dialog'
import { AdminSearchResultList } from '@/src/features/admin/components/search/admin-search-result-list'
import { useAdminSearchResults } from '@/src/features/admin/hooks/use-admin-search-results'
import { useListNavigation } from '@/src/features/admin/hooks/use-list-navigation'

type AdminSearchDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

/** Command palette: jump to any section or product without leaving the keyboard. */
export function AdminSearchDialog({ open, onOpenChange }: AdminSearchDialogProps) {
  const router = useRouter()
  const [term, setTerm] = useState('')
  const { groups, results, isSearching, isError } = useAdminSearchResults(term)

  const go = (index: number): void => {
    const result = results[index]
    if (!result) return
    onOpenChange(false)
    router.push(result.href)
  }
  const navigation = useListNavigation(results.length, go, `${term}|${results.length}`)

  return (
    <Dialog
      open={open}
      onOpenChange={next => {
        onOpenChange(next)
        if (!next) setTerm('')
      }}
    >
      <DialogContent
        showCloseButton={false}
        className="top-[12vh] translate-y-0 gap-0 overflow-hidden p-0 shadow-2xl sm:max-w-xl"
      >
        <DialogTitle className="sr-only">Buscar en el panel</DialogTitle>
        <div className="flex items-center gap-2 border-b px-3">
          {isSearching ? (
            <CircleNotchIcon className="size-4.5 shrink-0 animate-spin text-muted-foreground" />
          ) : (
            <MagnifyingGlassIcon className="size-4.5 shrink-0 text-muted-foreground" />
          )}
          <input
            autoFocus
            value={term}
            onChange={event => setTerm(event.target.value)}
            onKeyDown={navigation.onKeyDown}
            placeholder="Buscá secciones o productos por nombre o SKU"
            aria-label="Buscar"
            role="combobox"
            aria-expanded
            aria-controls="admin-search-results"
            aria-activedescendant={results[navigation.active] ? `search-${results[navigation.active].id}` : undefined}
            className="h-12 flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground"
          />
        </div>
        <AdminSearchResultList
          groups={groups}
          activeId={results[navigation.active]?.id}
          onHover={id => navigation.setActive(results.findIndex(result => result.id === id))}
          onPick={id => go(results.findIndex(result => result.id === id))}
          emptyMessage={
            isError ? 'No pudimos buscar productos. Probá de nuevo en un momento.' : `Nada coincide con “${term}”.`
          }
        />
      </DialogContent>
    </Dialog>
  )
}
