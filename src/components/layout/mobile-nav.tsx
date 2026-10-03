'use client'

import Link from 'next/link'
import { ListIcon } from '@phosphor-icons/react'
import { Button } from '@/src/components/ui/button'
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/src/components/ui/sheet'
import { CATEGORY_LINKS, HIGHLIGHT_LINKS, type NavLink } from '@/src/lib/navigation'

type MobileNavSectionProps = {
  title: string
  links: NavLink[]
}

function MobileNavSection({ title, links }: MobileNavSectionProps) {
  return (
    <div className="flex flex-col gap-1">
      <p className="px-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">{title}</p>
      {links.map(link => (
        <SheetClose asChild key={link.href}>
          <Link href={link.href} className="rounded-lg px-3 py-2.5 text-base font-medium hover:bg-muted">
            {link.label}
          </Link>
        </SheetClose>
      ))}
    </div>
  )
}

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon-lg" className="xl:hidden" aria-label="Abrir menú">
          <ListIcon weight="light" className="size-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Menú</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-6 px-1 pb-8" aria-label="Menú principal">
          <MobileNavSection title="Destacados" links={HIGHLIGHT_LINKS} />
          <MobileNavSection title="Categorías" links={CATEGORY_LINKS} />
        </nav>
      </SheetContent>
    </Sheet>
  )
}
