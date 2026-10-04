import Link from 'next/link'
import { Button } from '@/src/components/ui/button'

/** Fallback 404 for routes outside the store layout (e.g. /admin for a customer). */
export default function RootNotFound() {
  return (
    <main className="mx-auto flex max-w-xl flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <p className="font-mono text-sm text-muted-foreground">404</p>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight">No encontramos esta página</h1>
      <p className="mt-3 text-muted-foreground">Puede que el link tenga un error o que la página ya no exista.</p>
      <Button asChild className="mt-8 h-11 rounded-full px-6">
        <Link href="/">Ir al inicio</Link>
      </Button>
    </main>
  )
}
