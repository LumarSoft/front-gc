import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/src/lib/utils'

type SectionHeadingProps = {
  eyebrow?: string
  title: string
  description?: string
  action?: { label: string; href: string }
  className?: string
}

export function SectionHeading({ eyebrow, title, description, action, className }: SectionHeadingProps) {
  return (
    <div className={cn('flex flex-col justify-between gap-4 sm:flex-row sm:items-end', className)}>
      <div className="max-w-2xl">
        {eyebrow && <p className="text-sm font-semibold text-primary">{eyebrow}</p>}
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">{title}</h2>
        {description && <p className="mt-3 text-base text-pretty text-muted-foreground">{description}</p>}
      </div>
      {action && (
        <Link
          href={action.href}
          className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
        >
          {action.label}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
        </Link>
      )}
    </div>
  )
}
