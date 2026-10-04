type AdminPageHeaderProps = {
  title: string
  description?: string
  /** Main actions of the page (e.g. "Nueva categoría"). Stack under the title on phones. */
  actions?: React.ReactNode
}

export function AdminPageHeader({ title, description, actions }: AdminPageHeaderProps) {
  return (
    <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between lg:mb-8">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight lg:text-3xl">{title}</h1>
        {description && <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{description}</p>}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap gap-2">{actions}</div>}
    </header>
  )
}
