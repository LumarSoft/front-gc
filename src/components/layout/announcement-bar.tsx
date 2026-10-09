import Link from 'next/link'
import { CreditCard, Headset, Store } from 'lucide-react'
import { TOP_BAR_LINKS } from '@/src/lib/navigation'

const MESSAGES = [
  { icon: Store, text: 'Retiro gratis en nuestro local' },
  { icon: Headset, text: 'Asesoramiento personalizado' },
  { icon: CreditCard, text: 'Pago a coordinar con el local' },
]

export function AnnouncementBar() {
  return (
    <div className="overflow-hidden bg-navy text-navy-foreground">
      <div className="mx-auto hidden h-9 max-w-7xl items-center justify-center gap-10 px-6 xl:justify-between text-xs font-medium md:flex">
        <ul className="flex items-center gap-8">
          {MESSAGES.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-center gap-2">
              <Icon strokeWidth={1.5} className="size-4 text-navy-foreground/70" aria-hidden />
              {text}
            </li>
          ))}
        </ul>
        <ul className="hidden items-center divide-x divide-navy-foreground/20 xl:flex">
          {TOP_BAR_LINKS.map(link => (
            <li key={link.href} className="px-3 last:pr-0">
              <Link href={link.href} className="text-navy-foreground/85 transition-colors hover:text-navy-foreground">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex h-9 items-center md:hidden">
        <div className="flex w-max motion-safe:animate-marquee">
          {[...MESSAGES, ...MESSAGES].map(({ icon: Icon, text }, index) => (
            <p
              key={`${text}-${index}`}
              aria-hidden={index >= MESSAGES.length}
              className="flex shrink-0 items-center gap-2 px-6 text-xs font-medium"
            >
              <Icon strokeWidth={1.5} className="size-4 text-navy-foreground/70" aria-hidden />
              {text}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}
