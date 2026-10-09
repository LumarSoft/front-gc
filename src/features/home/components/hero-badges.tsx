import { BadgeCheck, Headset, Store } from 'lucide-react'
import { cn } from '@/src/lib/utils'

const BADGES = [
  { icon: BadgeCheck, text: 'Garantía oficial Epson' },
  { icon: Store, text: 'Retiro gratis en Rosario' },
  { icon: Headset, text: 'Asesoramiento personalizado' },
]

type HeroBadgesProps = {
  className?: string
}

export function HeroBadges({ className }: HeroBadgesProps) {
  return (
    <ul className={cn('flex max-w-md flex-wrap gap-2', className)}>
      {BADGES.map(({ icon: Icon, text }) => (
        <li
          key={text}
          className="inline-flex items-center gap-1.5 rounded-full border border-navy-foreground/20 bg-navy/40 px-3 py-1.5 text-xs font-medium backdrop-blur-sm"
        >
          <Icon strokeWidth={1.75} className="size-3.5 text-highlight-soft" aria-hidden />
          {text}
        </li>
      ))}
    </ul>
  )
}
