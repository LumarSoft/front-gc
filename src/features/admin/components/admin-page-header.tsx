type AdminPageHeaderProps = {
  title: string
  description?: string
  /** Main actions of the page (e.g. "Nueva categoría"), next to the title at every width; on phones the
   * description runs full width underneath. */
  actions?: React.ReactNode
}

export function AdminPageHeader({ title, description, actions }: AdminPageHeaderProps) {
  return (
    <header className="mb-4 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 sm:mb-5">
      <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
      {actions && <div className="flex gap-2 sm:row-span-2">{actions}</div>}
      {description && <p className="col-span-2 mt-0.5 text-sm text-muted-foreground sm:col-span-1">{description}</p>}
    </header>
  )
}
