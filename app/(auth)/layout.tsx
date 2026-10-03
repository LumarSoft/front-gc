import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr'
import { BrandLogo } from '@/src/components/layout/brand-logo'
import { CmykStripe } from '@/src/components/layout/cmyk-stripe'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

const BENEFITS = [
  'Seguí tus pedidos y envíos',
  'Repetí una compra en un par de clics',
  'Guardá tus direcciones y facturas',
]

export default function AuthLayout({ children }: LayoutProps<'/'>) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <aside className="relative hidden overflow-hidden bg-navy p-12 text-navy-foreground lg:flex lg:flex-col">
        <BrandLogo inverted />
        <div className="relative z-10 mt-auto max-w-md">
          <p className="text-sm font-semibold text-cyan">Tu cuenta</p>
          <h2 className="mt-3 text-4xl leading-tight font-extrabold tracking-tight text-balance">
            Todo lo que comprás, en un solo lugar.
          </h2>
          <ol className="mt-10 flex flex-col gap-5">
            {BENEFITS.map((benefit, index) => (
              <li key={benefit} className="flex items-baseline gap-4 border-t border-navy-foreground/15 pt-4">
                <span className="font-mono text-xs text-cyan">0{index + 1}</span>
                <span className="text-lg">{benefit}</span>
              </li>
            ))}
          </ol>
          <p className="mt-10 text-sm text-navy-foreground/60">
            ¿Comprás para una empresa? Con tu cuenta podés solicitar precios preferenciales como cliente frecuente.
          </p>
        </div>
        <div aria-hidden className="pointer-events-none absolute top-20 -right-8 size-64">
          <Image
            src="/images/epson/ink-bottle.png"
            alt=""
            fill
            sizes="256px"
            className="rotate-12 object-contain drop-shadow-2xl motion-safe:animate-float"
          />
        </div>
        <CmykStripe className="absolute inset-x-0 bottom-0" />
      </aside>

      <main className="flex flex-col px-5 py-6 sm:px-10 lg:px-16 lg:py-10">
        <div className="flex items-center justify-between gap-4">
          <BrandLogo className="lg:invisible" />
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeftIcon weight="regular" className="size-4" aria-hidden />
            Volver a la tienda
          </Link>
        </div>
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-12">{children}</div>
      </main>
    </div>
  )
}
