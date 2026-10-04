'use client'

import Link from 'next/link'
import { Button } from '@/src/components/ui/button'

type RouteErrorProps = {
  reset: () => void
}

/** Fallback for route segments that load data: explains what happened and what to do. */
export function RouteError({ reset }: RouteErrorProps) {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <h1 className="text-2xl font-extrabold tracking-tight">No pudimos cargar esta página</h1>
      <p className="mt-3 text-muted-foreground">
        Puede ser un problema de conexión o de nuestro lado. Probá de nuevo en unos segundos.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button onClick={reset} className="h-11 rounded-full px-6">
          Reintentar
        </Button>
        <Button asChild variant="outline" className="h-11 rounded-full px-6">
          <Link href="/">Ir al inicio</Link>
        </Button>
      </div>
    </div>
  )
}
