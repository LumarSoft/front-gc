import Link from 'next/link'
import { Button } from '@/src/components/ui/button'

export default function ShopNotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <p className="font-mono text-sm text-muted-foreground">404</p>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight">No encontramos esta página</h1>
      <p className="mt-3 text-muted-foreground">
        Puede que el producto ya no esté disponible o que el link tenga un error.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild className="h-11 rounded-full px-6">
          <Link href="/productos">Ver todos los productos</Link>
        </Button>
        <Button asChild variant="outline" className="h-11 rounded-full px-6">
          <Link href="/">Ir al inicio</Link>
        </Button>
      </div>
    </div>
  )
}
