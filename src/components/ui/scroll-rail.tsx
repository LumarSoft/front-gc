'use client'

import type { ReactNode } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useScrollRail } from '@/src/hooks/use-scroll-rail'
import { cn } from '@/src/lib/utils'

type ScrollRailProps = {
  /** `<li>` items; give them a width (e.g. `w-1/2 lg:w-1/6`) and inner padding for the gap. */
  children: ReactNode
  /** Accessible name of the list. */
  label: string
  className?: string
}

const ARROW_CLASS =
  'absolute top-1/3 z-10 hidden size-10 -translate-y-1/2 place-items-center rounded-full border bg-background text-foreground shadow-md transition-all hover:border-highlight hover:text-highlight disabled:pointer-events-none disabled:opacity-0 lg:grid'

/** Horizontal list: swipe on phones, arrow buttons on desktop. */
export function ScrollRail({ children, label, className }: ScrollRailProps) {
  const { ref, canScrollBack, canScrollForward, scrollPage } = useScrollRail()

  return (
    <div className={cn('relative', className)}>
      <ul ref={ref} aria-label={label} className="no-scrollbar -mx-2 flex snap-x snap-mandatory overflow-x-auto pb-4">
        {children}
      </ul>
      <button
        type="button"
        onClick={() => scrollPage(-1)}
        disabled={!canScrollBack}
        aria-label="Ver anteriores"
        className={cn(ARROW_CLASS, '-left-5')}
      >
        <ChevronLeft className="size-5" aria-hidden />
      </button>
      <button
        type="button"
        onClick={() => scrollPage(1)}
        disabled={!canScrollForward}
        aria-label="Ver más"
        className={cn(ARROW_CLASS, '-right-5')}
      >
        <ChevronRight className="size-5" aria-hidden />
      </button>
    </div>
  )
}
