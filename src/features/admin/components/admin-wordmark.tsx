import { BrandLogo } from '@/src/components/layout/brand-logo'
import { cn } from '@/src/lib/utils'

type AdminWordmarkProps = {
  /** `inline`: label next to the logo (phone top bar). `stacked`: label under it (narrow desktop sidebar). */
  layout?: 'inline' | 'stacked'
}

/** Store logo plus a plain "Administración" label, so it is always clear which side of the site you are on. */
export function AdminWordmark({ layout = 'inline' }: AdminWordmarkProps) {
  return (
    <div className={cn('flex gap-3', layout === 'inline' ? 'items-center' : 'flex-col items-start')}>
      <BrandLogo href="/admin" />
      <span
        className={cn(
          'text-xs font-semibold tracking-wider text-muted-foreground uppercase',
          layout === 'inline' && 'border-l pl-3',
        )}
      >
        Administración
      </span>
    </div>
  )
}
