import { Input } from '@/src/components/ui/input'
import { cn } from '@/src/lib/utils'

type MoneyFieldProps = React.ComponentProps<typeof Input>

/** Peso amount typed the Argentine way ("3.500,50"), with the "$" inside the box. */
export function MoneyField({ className, ...props }: MoneyFieldProps) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute top-1/2 left-2.5 -translate-y-1/2 text-sm text-muted-foreground">
        $
      </span>
      <Input inputMode="decimal" autoComplete="off" className={cn('pl-6 tabular-nums', className)} {...props} />
    </div>
  )
}
