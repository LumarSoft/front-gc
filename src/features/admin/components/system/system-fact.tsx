/** A list of facts as label → value rows. */
export function SystemFacts({ children }: { children: React.ReactNode }) {
  return <dl className="flex flex-col divide-y text-sm">{children}</dl>
}

/** One fact: what it is on the left, its value on the right. */
export function SystemFact({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2 first:pt-0 last:pb-0">
      <dt className="shrink-0 text-muted-foreground">{label}</dt>
      <dd className="min-w-0 text-right font-medium break-words">{children}</dd>
    </div>
  )
}
