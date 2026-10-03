import { ProcessDots } from '@/src/components/ui/print-marks'
import { cn } from '@/src/lib/utils'

type ProductImagePlaceholderProps = {
  label?: string | null
  className?: string
}

/** Shown while a product has no photo yet. */
export function ProductImagePlaceholder({ label, className }: ProductImagePlaceholderProps) {
  return (
    <div
      className={cn('flex h-full w-full flex-col items-center justify-center gap-3 bg-surface text-center', className)}
    >
      <ProcessDots className="text-foreground" />
      {label && <span className="px-4 text-xs font-semibold text-muted-foreground">{label}</span>}
    </div>
  )
}
