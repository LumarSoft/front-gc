import Link from 'next/link'
import { BrandMark } from '@/src/components/layout/brand-mark'
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
      <BrandMark inverted={inverted} />
      <span className="flex flex-col leading-none">
        <span className="text-base font-extrabold tracking-tight">Comunicaciones</span>
        <span className={cn('text-base font-extrabold tracking-tight', inverted ? 'text-cyan' : 'text-primary')}>
          Gráficas
        </span>
      </span>
    </Link>
  )
}
