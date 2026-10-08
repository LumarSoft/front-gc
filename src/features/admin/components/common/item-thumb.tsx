import Image from 'next/image'
import type { Icon } from '@phosphor-icons/react'
import { cn } from '@/src/lib/utils'

type ItemThumbProps = {
  url: string | null
  /** Shown when there is no image. */
  fallbackIcon: Icon
  /** "sm" (32 px) for dense rows and search results; "md" (40 px) by default. */
  size?: 'sm' | 'md'
}

/** Small square image at the start of a list row. */
export function ItemThumb({ url, fallbackIcon: FallbackIcon, size = 'md' }: ItemThumbProps) {
  return (
    <span
      className={cn(
        'relative grid shrink-0 place-items-center overflow-hidden rounded-lg border bg-background text-muted-foreground',
        size === 'sm' ? 'size-8' : 'size-10',
      )}
    >
      {url ? (
        <Image src={url} alt="" fill sizes={size === 'sm' ? '32px' : '40px'} className="object-contain p-0.5" />
      ) : (
        <FallbackIcon className={size === 'sm' ? 'size-4' : 'size-5'} />
      )}
    </span>
  )
}
