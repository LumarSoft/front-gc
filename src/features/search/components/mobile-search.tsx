'use client'

import { useRef } from 'react'
import { flushSync } from 'react-dom'
import { ArrowLeft, Search, X } from 'lucide-react'
import { CmykStripe } from '@/src/components/layout/cmyk-stripe'
import { Sheet, SheetClose, SheetContent, SheetTitle } from '@/src/components/ui/sheet'
import { SearchInput } from '@/src/features/search/components/search-input'
import { SearchPanel } from '@/src/features/search/components/search-panel'
import { useSearchBox } from '@/src/features/search/hooks/use-search-box'
import { cn } from '@/src/lib/utils'

type MobileSearchProps = {
  initialQuery: string
  className?: string
}

/** The header search on phones: a field-shaped button that opens the search full screen. */
export function MobileSearch({ initialQuery, className }: MobileSearchProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const box = useSearchBox(initialQuery, inputRef)

  // iOS only shows the keyboard when the field is focused inside the tap itself, so the sheet renders right away.
  const openSearch = (): void => {
    flushSync(box.open)
    inputRef.current?.focus()
  }

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        aria-label={box.term ? `Buscar productos: ${box.term}` : 'Buscar productos'}
        onClick={openSearch}
        className={cn(
          'flex h-11 w-full items-center gap-3 rounded-xl border border-border bg-muted/60 pr-3 pl-4 text-left text-base',
          className,
        )}
      >
        <span className={cn('min-w-0 flex-1 truncate', !box.term && 'text-muted-foreground')}>
          {box.term || '¿Qué estás buscando?'}
        </span>
        <Search className="size-4.5 shrink-0 text-muted-foreground" aria-hidden />
      </button>
      <Sheet open={box.isOpen} onOpenChange={open => (open ? box.open() : box.close())}>
        <SheetContent
          side="top"
          showCloseButton={false}
          aria-describedby={undefined}
          onOpenAutoFocus={event => {
            event.preventDefault()
            inputRef.current?.focus()
          }}
          className="gap-0 border-0 p-0 shadow-none data-[side=top]:h-dvh"
        >
          <SheetTitle className="sr-only">Buscar productos</SheetTitle>
          <form
            action="/productos"
            role="search"
            onSubmit={event => {
              event.preventDefault()
              box.submit()
            }}
            className="flex items-center gap-1 py-2.5 pr-4 pl-1.5"
          >
            <SheetClose
              aria-label="Cerrar búsqueda"
              className="grid size-10 shrink-0 place-items-center rounded-full text-foreground hover:bg-muted"
            >
              <ArrowLeft className="size-5" aria-hidden />
            </SheetClose>
            <label htmlFor="site-search-mobile" className="sr-only">
              Buscar productos
            </label>
            <div className="relative flex-1">
              <SearchInput
                box={box}
                inputRef={inputRef}
                id="site-search-mobile"
                className="h-11 rounded-xl border-border bg-muted/60 pr-11 pl-4 focus-visible:border-primary focus-visible:bg-background"
              />
              {box.term && (
                <button
                  type="button"
                  aria-label="Borrar lo escrito"
                  onClick={() => {
                    box.change('')
                    inputRef.current?.focus()
                  }}
                  className="absolute top-1/2 right-1.5 grid size-8 -translate-y-1/2 place-items-center rounded-lg text-muted-foreground"
                >
                  <X className="size-4.5" aria-hidden />
                </button>
              )}
            </div>
          </form>
          <CmykStripe />
          {/* Dragging the list hides the keyboard, so the bottom of the list can be reached. */}
          <SearchPanel
            box={box}
            onTouchMove={() => inputRef.current?.blur()}
            className="min-h-0 flex-1 overflow-y-auto overscroll-contain pb-[env(safe-area-inset-bottom)]"
          />
        </SheetContent>
      </Sheet>
    </>
  )
}
