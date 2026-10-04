type AccountCardProps = {
  title: string
  children: React.ReactNode
}

export function AccountCard({ title, children }: AccountCardProps) {
  return (
    <section className="flex flex-col gap-3 rounded-2xl border p-6">
      <h2 className="font-bold">{title}</h2>
      {children}
    </section>
  )
}
