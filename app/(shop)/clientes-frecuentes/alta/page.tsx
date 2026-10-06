import type { Metadata } from 'next'
import { Breadcrumbs } from '@/src/components/ui/breadcrumbs'
import { WholesaleApplicationView } from '@/src/features/wholesale/components/wholesale-application-view'

export const metadata: Metadata = {
  title: 'Solicitud de cliente frecuente',
  robots: { index: false, follow: true },
}

export default function WholesaleApplicationPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:py-12">
      <Breadcrumbs items={[{ label: 'Clientes frecuentes', href: '/clientes-frecuentes' }]} />
      <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">Solicitud de cuenta</h1>
      <p className="mt-3 mb-8 text-muted-foreground">
        Completá los datos de tu empresa. Nuestro equipo revisa la solicitud y ves el resultado acá y en Mi cuenta.
      </p>
      <WholesaleApplicationView />
    </div>
  )
}
