import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/src/components/ui/button'
import { CmykStripe } from '@/src/components/layout/cmyk-stripe'

const PERKS = [
  'Lista de precios preferencial',
  'Cuenta corriente con estado online',
  'Compra directa, sin esperar aprobación',
  'Coordiná el pago con nuestro equipo',
]

export function WholesaleBanner() {
  return (
    <section className="px-4 pb-16 sm:px-6 lg:pb-24">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-4xl bg-foreground text-background">
        <CmykStripe className="h-1.5" />
        <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-2 lg:items-center lg:p-14">
          <div>
            <p className="text-sm font-semibold text-cyan">Clientes frecuentes</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
              ¿Tenés una imprenta, comercio o empresa?
            </h2>
            <p className="mt-4 text-background/70">
              Abrí tu cuenta como cliente frecuente y comprá con precios preferenciales y cuenta corriente, todo desde
              la web.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-full bg-background px-6 text-base font-bold text-foreground hover:bg-background/90"
              >
                <Link href="/clientes-frecuentes/alta">
                  Solicitá tu cuenta
                  <ArrowRight className="size-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-full border-background/30 bg-transparent px-6 text-base text-background hover:bg-background/10 hover:text-background"
              >
                <Link href="/ingresar">Ya soy cliente</Link>
              </Button>
            </div>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {PERKS.map((perk, index) => (
              <li
                key={perk}
                className="reveal flex items-start gap-3 rounded-2xl bg-background/5 p-4 ring-1 ring-background/10"
              >
                <span className="font-mono text-xs text-cyan">0{index + 1}</span>
                <span className="text-sm font-medium">{perk}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
