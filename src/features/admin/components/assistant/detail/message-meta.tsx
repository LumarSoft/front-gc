import Link from 'next/link'
import { cn } from '@/src/lib/utils'
import type { AdminShownProduct } from '@/src/types/api/admin-assistant'

type MessageMetaProps = {
  author: string
  /** Already formatted ("Hoy a las 14:02" or "14:05"). */
  at: string
  createdAt: string
  /** The product page a customer message was written from. */
  page?: AdminShownProduct | null
  /** More facts after the time ("3.379 tokens", "9,7 s"). */
  details?: string[]
  className?: string
}

/** Who wrote a message and when, under its bubble like in WhatsApp. */
export function MessageMeta({ author, at, createdAt, page, details = [], className }: MessageMetaProps) {
  return (
    <p className={cn('text-xs text-muted-foreground', className)}>
      <span className="font-medium text-foreground">{author}</span> · <time dateTime={createdAt}>{at}</time>
      {page && (
        <>
          {' · desde '}
          {page.archived ? (
            page.name
          ) : (
            <Link href={`/admin/productos/${page.id}`} className="hover:underline">
              {page.name}
            </Link>
          )}
        </>
      )}
      {details.map(detail => ` · ${detail}`)}
    </p>
  )
}
