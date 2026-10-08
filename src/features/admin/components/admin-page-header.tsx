type AdminPageHeaderProps = {
  title: string
  description?: string
  /** Main actions of the page (e.g. "Nueva categoría"). Full width under the title on phones. */
  actions?: React.ReactNode
}

export function AdminPageHeader({ title, description, actions }: AdminPageHeaderProps) {
  return (
    <header className="mb-4 flex flex-col gap-3 sm:mb-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
        {description && <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap gap-2 *:flex-1 sm:*:flex-none">{actions}</div>}
    </header>
  )
}
