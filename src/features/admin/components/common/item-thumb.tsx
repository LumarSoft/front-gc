import Image from 'next/image'
import type { Icon } from '@phosphor-icons/react'

type ItemThumbProps = {
  url: string | null
  /** Shown when there is no image. */
  fallbackIcon: Icon
}

/** Small square image at the start of a list row. */
export function ItemThumb({ url, fallbackIcon: FallbackIcon }: ItemThumbProps) {
  return (
    <span className="relative grid size-10 shrink-0 place-items-center overflow-hidden rounded-md border bg-muted/50 text-muted-foreground">
      {url ? (
        <Image src={url} alt="" fill sizes="40px" className="object-contain p-1" />
      ) : (
        <FallbackIcon className="size-5" />
      )}
    </span>
  )
}
