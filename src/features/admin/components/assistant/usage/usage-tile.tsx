type UsageTileProps = {
  label: string
  value: string
  /** What the number counts, in a line under it. */
  hint: string
  /** Under the hint, e.g. a meter. */
  children?: React.ReactNode
}

/** One headline number of the assistant's usage (no comparison: what matters is the total and the limits). */
export function UsageTile({ label, value, hint, children }: UsageTileProps) {
  return (
    <div className="flex min-w-0 flex-col gap-1 p-4">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="truncate text-xl font-semibold tracking-tight tabular-nums">{value}</span>
      <span className="text-xs text-muted-foreground">{hint}</span>
      {children}
    </div>
  )
}
