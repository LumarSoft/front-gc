'use client'

import { useState } from 'react'
import { FadersHorizontalIcon } from '@phosphor-icons/react'
import { Button } from '@/src/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/src/components/ui/sheet'

type MobileFiltersProps = {
  activeCount: number
  children: React.ReactNode
}

/** Bottom sheet with the same filters as the desktop sidebar. Tapping a filter navigates and closes it. */
export function MobileFilters({ activeCount, children }: MobileFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="h-11 gap-2 rounded-full px-5 lg:hidden">
          <FadersHorizontalIcon weight="regular" className="size-5" />
          Filtrar
          {activeCount > 0 && (
            <span className="grid size-5 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              {activeCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className="max-h-svh overflow-y-auto rounded-t-3xl px-2 pb-10"
        onClickCapture={event => {
          if ((event.target as HTMLElement).closest('a')) setIsOpen(false)
        }}
      >
        <SheetHeader>
          <SheetTitle>Filtrar productos</SheetTitle>
        </SheetHeader>
        <div className="px-4">{children}</div>
      </SheetContent>
    </Sheet>
  )
}
