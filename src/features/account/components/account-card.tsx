import { cn } from '@/src/lib/utils'

type AccountCardProps = {
  title: string
  /** A link or button beside the title. */
  action?: React.ReactNode
  className?: string
  children: React.ReactNode
}

export function AccountCard({ title, action, className, children }: AccountCardProps) {
  return (
    <section className={cn('flex flex-col gap-3 rounded-2xl border p-4 sm:p-6', className)}>
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-bold">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  )
}
