export function CatalogSkeleton() {
  return (
    <div aria-busy="true" aria-label="Cargando productos" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
      <div className="h-4 w-40 animate-pulse rounded bg-muted" />
      <div className="mt-4 h-10 w-72 animate-pulse rounded-lg bg-muted" />
      <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }, (_, index) => (
          <li key={index} className="aspect-3/4 animate-pulse rounded-2xl bg-muted" />
        ))}
      </ul>
    </div>
  )
}
