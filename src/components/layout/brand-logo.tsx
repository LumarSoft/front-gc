import Link from 'next/link'
import { SITE } from '@/src/lib/site-config'
import { cn } from '@/src/lib/utils'

type BrandLogoProps = {
  className?: string
  inverted?: boolean
}

// TODO(client-data): replace this wordmark with the official Comunicaciones Gráficas logo.
export function BrandLogo({ className, inverted = false }: BrandLogoProps) {
  return (
    <Link href="/" aria-label={`${SITE.name} — inicio`} className={cn('flex items-center gap-2.5', className)}>
      <span aria-hidden className="grid size-9 shrink-0 grid-cols-2 gap-0.5 rounded-lg p-1.5 ring-1 ring-current/10">
        <span className="rounded-full bg-cyan" />
        <span className="rounded-full bg-magenta" />
        <span className="rounded-full bg-yellow" />
        <span className={cn('rounded-full', inverted ? 'bg-white' : 'bg-foreground')} />
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-base font-extrabold tracking-tight">Comunicaciones</span>
        <span className={cn('text-base font-extrabold tracking-tight', inverted ? 'text-cyan' : 'text-primary')}>
          Gráficas
        </span>
      </span>
    </Link>
  )
}
