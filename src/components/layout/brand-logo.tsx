import Link from 'next/link'
import { BrandLogoImage } from '@/src/components/layout/brand-logo-image'
import { SITE } from '@/src/lib/site-config'
import { cn } from '@/src/lib/utils'

type BrandLogoProps = {
  className?: string
  inverted?: boolean
  /** Above the fold (store header): load the image first. */
  priority?: boolean
  /** Adds the store's tagline under the name (store header, wide screens). */
  withTagline?: boolean
}

/** Store logo with the company name, back to the home page. */
export function BrandLogo({ className, inverted = false, priority = false, withTagline = false }: BrandLogoProps) {
  return (
    <Link href="/" aria-label={`${SITE.name} — inicio`} className={cn('flex items-center gap-3', className)}>
      <BrandLogoImage inverted={inverted} priority={priority} className="h-8 lg:h-10" />
      <span className="flex flex-col text-sm leading-tight font-extrabold tracking-tight">
        <span className={cn('flex flex-col', withTagline && 'lg:flex-row lg:gap-1')}>
          <span>Comunicaciones</span>
          <span>Gráficas</span>
        </span>
        {withTagline && (
          <span className="mt-1 hidden text-xs font-medium tracking-wide text-muted-foreground uppercase lg:block">
            {SITE.tagline}
          </span>
        )}
      </span>
    </Link>
  )
}
