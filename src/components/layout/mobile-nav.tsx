'use client'

import Link from 'next/link'
import { useRef, type ReactNode } from 'react'
import { Menu } from 'lucide-react'
import { Button } from '@/src/components/ui/button'
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/src/components/ui/sheet'
import { AssistantTrigger } from '@/src/features/assistant/components/assistant-trigger'
import { CATEGORY_LINKS, HIGHLIGHT_LINKS, SUPPORT_LINK, type NavLink } from '@/src/lib/navigation'

type MobileNavSectionProps = {
  title: string
  links: NavLink[]
  children?: ReactNode
}

const ITEM_CLASS = 'rounded-lg px-3 py-2.5 text-left text-base font-medium hover:bg-muted'

function MobileNavSection({ title, links, children }: MobileNavSectionProps) {
  return (
    <div className="flex flex-col gap-1">
      <p className="px-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">{title}</p>
      {links.map(link => (
        <SheetClose asChild key={link.href}>
          <Link href={link.href} className={ITEM_CLASS}>
            {link.label}
          </Link>
        </SheetClose>
      ))}
      {children}
    </div>
  )
}

export function MobileNav() {
  // Set when the menu closes to open the assistant: the focus must stay in the chat, not go back to the menu button.
  const toAssistant = useRef(false)
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon-lg" className="xl:hidden" aria-label="Abrir menú">
          <Menu strokeWidth={1.5} className="size-6" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-80 overflow-y-auto"
        onCloseAutoFocus={event => {
          if (toAssistant.current) event.preventDefault()
          toAssistant.current = false
        }}
      >
        <SheetHeader>
          <SheetTitle>Menú</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-6 px-1 pb-8" aria-label="Menú principal">
          <MobileNavSection title="Destacados" links={HIGHLIGHT_LINKS}>
            {/* Closes the menu and opens the assistant's chat over the page. */}
            <SheetClose asChild>
              <AssistantTrigger className={ITEM_CLASS} onClick={() => (toAssistant.current = true)}>
                {SUPPORT_LINK.label}
              </AssistantTrigger>
            </SheetClose>
          </MobileNavSection>
          <MobileNavSection title="Categorías" links={CATEGORY_LINKS} />
        </nav>
      </SheetContent>
    </Sheet>
  )
}
