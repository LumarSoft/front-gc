import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/src/components/ui/button'
import { ProcessDots } from '@/src/components/ui/print-marks'
import { WholesaleSteps } from '@/src/features/wholesale/components/wholesale-steps'

export const metadata: Metadata = {
  title: 'Clientes frecuentes',
  description: 'Cuentas para imprentas, comercios y empresas que compran seguido.',
}

export default function FrequentCustomersPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:py-24">
      <p className="flex items-center gap-3 text-sm font-semibold text-primary">
        <ProcessDots />
        Clientes frecuentes
      </p>
      <h1 className="mt-4 max-w-3xl text-3xl font-extrabold tracking-tight text-balance sm:text-5xl">
        Para imprentas, comercios y empresas que compran seguido
      </h1>
      <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
        Pedí tu cuenta de cliente frecuente. Cuando nuestro equipo la aprueba, comprás en la tienda con los precios de
        tu cuenta, sin pasos extra en cada pedido.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild className="h-12 rounded-full px-7 text-base font-bold">
          <Link href="/clientes-frecuentes/alta">Solicitar mi cuenta</Link>
        </Button>
        <Button asChild variant="outline" className="h-12 rounded-full px-7 text-base">
          <Link href="/productos">Ver productos</Link>
        </Button>
      </div>
      <section className="mt-16" aria-labelledby="wholesale-steps-title">
        <h2 id="wholesale-steps-title" className="text-xl font-extrabold">
          Cómo funciona
        </h2>
        <div className="mt-6">
          <WholesaleSteps />
        </div>
      </section>
      <p className="mt-12 max-w-2xl border-l-4 border-primary bg-surface p-5 text-sm text-muted-foreground">
        Necesitás un CUIT como responsable inscripto, monotributista o exento. Si comprás como consumidor final, podés
        hacerlo directamente en la tienda.
      </p>
    </div>
  )
}
