export default function Loading() {
  return (
    <div aria-busy="true" aria-label="Cargando producto" className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:pt-10">
      <div className="h-4 w-48 animate-pulse rounded bg-muted" />
      <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-14">
        <div className="aspect-square animate-pulse rounded-3xl bg-muted" />
        <div className="flex flex-col gap-4">
          <div className="h-4 w-32 animate-pulse rounded bg-muted" />
          <div className="h-9 w-full animate-pulse rounded-lg bg-muted" />
          <div className="h-28 animate-pulse rounded-3xl bg-muted" />
          <div className="h-12 animate-pulse rounded-full bg-muted" />
        </div>
      </div>
    </div>
  )
}
