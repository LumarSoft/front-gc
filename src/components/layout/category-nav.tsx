import Link from 'next/link'
import { Headset } from 'lucide-react'
import { CATEGORY_LINKS, OFFERS_LINK, SUPPORT_LINK } from '@/src/lib/navigation'

/** Desktop category bar under the header; phones get the same links in `MobileNav`. */
export function CategoryNav() {
  return (
    <nav aria-label="Categorías" className="hidden border-t xl:block">
      <div className="mx-auto flex h-12 max-w-7xl items-center justify-between gap-6 px-6 text-sm">
        <ul className="flex items-center gap-6 whitespace-nowrap 2xl:gap-7">
          {[...CATEGORY_LINKS, OFFERS_LINK].map(link => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="relative py-3.5 font-medium text-foreground/85 transition-colors after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:origin-left after:scale-x-0 after:bg-highlight after:transition-transform hover:text-highlight hover:after:scale-x-100"
              >
                {link.shortLabel ?? link.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href={SUPPORT_LINK.href}
          className="inline-flex h-9 shrink-0 items-center gap-2 rounded-full bg-highlight px-4 text-xs font-bold tracking-wide text-highlight-foreground uppercase transition-colors hover:bg-primary"
        >
          <Headset className="size-4" aria-hidden />
          {SUPPORT_LINK.label}
        </Link>
      </div>
    </nav>
  )
}
