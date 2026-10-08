type SettingsSectionProps = {
  title: string
  description: React.ReactNode
  children: React.ReactNode
}

/** Settings row: what it is and why on the left, the controls in a card on the right (stacked on phones). */
export function SettingsSection({ title, description, children }: SettingsSectionProps) {
  return (
    <section className="grid gap-3 border-b pb-6 last:border-0 md:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] md:gap-8">
      <div>
        <h2 className="text-sm font-semibold">{title}</h2>
        <div className="mt-1 text-sm text-muted-foreground">{description}</div>
      </div>
      {children}
    </section>
  )
}
