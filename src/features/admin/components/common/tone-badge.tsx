import { cn } from '@/src/lib/utils'

export type BadgeTone = 'success' | 'attention' | 'warning' | 'critical' | 'info' | 'neutral'

const TONES: Record<BadgeTone, string> = {
  success: 'bg-tone-success text-tone-success-foreground',
  attention: 'bg-tone-attention text-tone-attention-foreground',
  warning: 'bg-tone-warning text-tone-warning-foreground',
  critical: 'bg-tone-critical text-tone-critical-foreground',
  info: 'bg-tone-info text-tone-info-foreground',
  neutral: 'bg-tone-neutral text-tone-neutral-foreground',
}

type ToneBadgeProps = {
  tone: BadgeTone
  children: React.ReactNode
  /** A dot before the word, so the state never depends on color alone. */
  dot?: boolean
  className?: string
}

/** Status pill of the admin ("Publicado", "Pendiente de pago"…). */
export function ToneBadge({ tone, children, dot = true, className }: ToneBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex h-5 w-fit shrink-0 items-center gap-1.5 rounded-md px-2 text-xs font-medium whitespace-nowrap',
        TONES[tone],
        className,
      )}
    >
      {dot && <span aria-hidden className="size-1.5 rounded-full bg-current opacity-70" />}
      {children}
    </span>
  )
}
