import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/src/lib/utils'

type SectionHeadingProps = {
  eyebrow?: string
  title: string
  /** Words after the title, in the accent color ("Productos *destacados*"). */
  highlight?: string
  description?: string
  action?: { label: string; href: string }
  /** Compact: smaller title for dense sections (home rails). */
  size?: 'default' | 'compact'
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  action,
  size = 'default',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex flex-col justify-between gap-4 sm:flex-row',
        size === 'compact' ? 'sm:items-center' : 'sm:items-end',
        className,
      )}
    >
      <div className="max-w-2xl">
        {eyebrow && <p className="text-sm font-semibold text-primary">{eyebrow}</p>}
        <h2
          className={cn(
            'font-extrabold tracking-tight text-balance',
            size === 'compact' ? 'text-2xl sm:text-3xl' : 'mt-2 text-3xl sm:text-4xl',
          )}
        >
          {title}
          {highlight && <span className="text-highlight"> {highlight}</span>}
        </h2>
        {description && <p className="mt-3 text-base text-pretty text-muted-foreground">{description}</p>}
      </div>
      {action && (
        <Link
          href={action.href}
          className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-highlight hover:underline"
        >
          {action.label}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
        </Link>
      )}
    </div>
  )
}
