import Link from 'next/link'
import { cn } from '@/src/lib/utils'

type SearchChipLinksProps = {
  title: string
  links: { label: string; href: string }[]
  className?: string
}

/** A short list of searches or sections to try, as chips under a small heading. */
export function SearchChipLinks({ title, links, className }: SearchChipLinksProps) {
  if (links.length === 0) return null
  return (
    <section className={className}>
      <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">{title}</h3>
      <ul className="mt-3 flex flex-wrap gap-2">
        {links.map(link => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={cn(
                'inline-flex h-10 items-center rounded-full border bg-background px-4 text-sm font-medium transition-colors',
                'hover:border-primary hover:text-primary',
              )}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
