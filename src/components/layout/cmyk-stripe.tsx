import { cn } from '@/src/lib/utils'

type CmykStripeProps = {
  className?: string
}

/** Print-inspired divider: cyan, magenta, yellow and key (black). */
export function CmykStripe({ className }: CmykStripeProps) {
  return (
    <div aria-hidden className={cn('flex h-1 w-full', className)}>
      <span className="flex-1 bg-cyan" />
      <span className="flex-1 bg-magenta" />
      <span className="flex-1 bg-yellow" />
      <span className="flex-1 bg-foreground" />
    </div>
  )
}
