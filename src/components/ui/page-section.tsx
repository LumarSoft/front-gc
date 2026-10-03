import { cn } from '@/src/lib/utils'

type PageSectionProps = {
  title: string
  description?: string
  className?: string
  children: React.ReactNode
}

/** Titled block inside a page (product page sections, account sections…). */
export function PageSection({ title, description, className, children }: PageSectionProps) {
  return (
    <section className={cn('mt-16', className)}>
      <h2 className="text-2xl font-extrabold tracking-tight">{title}</h2>
      {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      <div className="mt-6">{children}</div>
    </section>
  )
}
