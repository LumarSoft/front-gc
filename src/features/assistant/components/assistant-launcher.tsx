'use client'

import { usePathname } from 'next/navigation'
import { BrandLogoImage } from '@/src/components/layout/brand-logo-image'
import { useAssistant } from '@/src/features/assistant/hooks/use-assistant'
import { cn } from '@/src/lib/utils'

export function AssistantLauncher() {
  const { isOpen, open } = useAssistant()
  // Product pages have their own sticky "Consultar" bar on phones; two floating elements would overlap.
  const isProductPage = usePathname().startsWith('/productos/')

  return (
    <button
      type="button"
      onClick={event => open({ trigger: event.currentTarget })}
      aria-haspopup="dialog"
      aria-expanded={isOpen}
      inert={isOpen}
      className={cn(
        'group fixed right-4 bottom-4 z-30 flex items-center gap-2.5 rounded-full bg-foreground p-1.5 pr-5 text-sm font-bold text-background shadow-2xl shadow-navy/30 transition-all hover:-translate-y-0.5 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none motion-reduce:transition-none sm:right-6 sm:bottom-6',
        isProductPage && 'hidden lg:flex',
        isOpen && 'pointer-events-none translate-y-2 opacity-0',
      )}
    >
      <span aria-hidden className="flex h-9 items-center rounded-full bg-background px-2.5">
        <BrandLogoImage className="h-4" />
      </span>
      <span>
        ¿Dudas?<span className="hidden sm:inline"> Te ayudamos a elegir</span>
      </span>
    </button>
  )
}
