import { cn } from '@/src/lib/utils'

type FormAlertProps = {
  tone?: 'error' | 'success'
  children: React.ReactNode
  className?: string
}

export function FormAlert({ tone = 'error', children, className }: FormAlertProps) {
  return (
    <div
      role={tone === 'error' ? 'alert' : 'status'}
      className={cn(
        'rounded-xl border-l-4 px-4 py-3 text-sm',
        tone === 'error' ? 'border-destructive bg-destructive/5 text-destructive' : 'border-success bg-success/5',
        className,
      )}
    >
      {children}
    </div>
  )
}
