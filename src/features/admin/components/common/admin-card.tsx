import { Card } from '@/src/components/ui/card'
import { cn } from '@/src/lib/utils'

type AdminCardProps = {
  title?: React.ReactNode
  /** Next to the title: a badge or a small action. */
  aside?: React.ReactNode
  /** Bottom bar with the card's main action, right aligned. */
  footer?: React.ReactNode
  className?: string
  children: React.ReactNode
}

/** Read-and-act card of a detail page: short title, content, optional action bar. */
export function AdminCard({ title, aside, footer, className, children }: AdminCardProps) {
  return (
    <Card className={cn('gap-0 py-0', className)}>
      {(title || aside) && (
        <div className="flex min-h-8 items-center justify-between gap-3 px-4 pt-4">
          {title && <h2 className="text-sm font-semibold">{title}</h2>}
          {aside}
        </div>
      )}
      <div className="p-4">{children}</div>
      {footer && <div className="flex flex-wrap justify-end gap-2 border-t px-4 py-3">{footer}</div>}
    </Card>
  )
}
