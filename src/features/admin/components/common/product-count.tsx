type ProductCountProps = {
  count: number
  /** Extra context after the number, e.g. "con subcategorías". */
  suffix?: string
}

/** "12 productos" / "1 producto" / "Sin productos". */
export function ProductCount({ count, suffix }: ProductCountProps) {
  const label = count === 0 ? 'Sin productos' : `${count} ${count === 1 ? 'producto' : 'productos'}`
  return (
    <span className="text-xs text-muted-foreground tabular-nums sm:text-right">
      {label}
      {suffix && count > 0 && <span className="hidden lg:inline"> {suffix}</span>}
    </span>
  )
}
