import Image from 'next/image'
import { SITE } from '@/src/lib/site-config'

const REASONS = [
  {
    value: `+${SITE.yearsInBusiness}`,
    label: 'años en el rubro gráfico',
    text: 'Una trayectoria construida junto a imprentas, empresas y hogares de Rosario.',
  },
  {
    value: 'Oficial',
    label: 'distribuidor Epson',
    text: 'Equipos, tintas y repuestos originales con garantía de fábrica.',
  },
  {
    value: '1 a 1',
    label: 'asesoramiento real',
    text: 'Gente que conoce cada equipo te ayuda antes y después de comprar.',
  },
]

export function WhyUs() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
      <div className="grid gap-12 lg:grid-cols-5 lg:items-center">
        <div className="lg:col-span-2">
          <Image src="/images/epson/epson-logo.png" alt="Epson" width={140} height={33} className="h-8 w-auto" />
          <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
            Comprale a quien sabe de impresión
          </h2>
          <p className="mt-4 text-muted-foreground">
            No somos una tienda más: somos {SITE.name}, distribuidores oficiales Epson. Elegís online, con la confianza
            de siempre.
          </p>
        </div>
        <ul className="grid gap-4 sm:grid-cols-3 lg:col-span-3">
          {REASONS.map(reason => (
            <li key={reason.label} className="reveal rounded-3xl border p-6">
              <p className="text-5xl font-extrabold tracking-tight text-primary">{reason.value}</p>
              <p className="mt-2 font-bold">{reason.label}</p>
              <p className="mt-2 text-sm text-muted-foreground">{reason.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
