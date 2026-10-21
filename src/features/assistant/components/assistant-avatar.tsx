import { BrandLogoImage } from '@/src/components/layout/brand-logo-image'
import { cn } from '@/src/lib/utils'

/**
 * The assistant's profile picture: the store's logo in a circle. While it works, a ring of the process colors turns
 * around it (still with reduced motion); at rest the ring is a plain border.
 */
export function AssistantAvatar({ busy }: { busy: boolean }) {
  return (
    <span aria-hidden className="relative grid size-8 shrink-0 place-items-center">
      <span
        className={cn(
          'absolute inset-0 rounded-full transition-opacity duration-500',
          busy ? 'ink-ring motion-safe:animate-ring-spin' : 'bg-border',
        )}
      />
      <span className="relative grid size-7 place-items-center rounded-full bg-background">
        <BrandLogoImage className="h-2" />
      </span>
    </span>
  )
}
