import type { Icon } from '@phosphor-icons/react'
import { Card } from '@/src/components/ui/card'
import { Skeleton } from '@/src/components/ui/skeleton'

type StatCardProps = {
  label: string
  value: number | null
  icon: Icon
  hint?: string
}

/** One metric: label and icon on top, the number below. `null` shows a skeleton while loading. */
export function StatCard({ label, value, icon: Icon, hint }: StatCardProps) {
  return (
    <Card className="gap-2 px-4 shadow-xs ring-foreground/8">
      <div className="flex items-center justify-between gap-2 text-sm text-muted-foreground">
        <span>{label}</span>
        <Icon className="size-4.5" />
      </div>
      {value === null ? (
        <Skeleton className="h-8 w-16" />
      ) : (
        <p className="text-2xl font-semibold tracking-tight tabular-nums">{value.toLocaleString('es-AR')}</p>
      )}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </Card>
  )
}
