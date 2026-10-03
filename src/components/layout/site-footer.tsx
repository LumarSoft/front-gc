import Link from 'next/link'
import { BrandLogo } from '@/src/components/layout/brand-logo'
import { CmykStripe } from '@/src/components/layout/cmyk-stripe'
import {
  CATEGORY_LINKS,
  COMPANY_LINKS,
  HELP_LINKS,
  LEGAL_LINKS,
  WITHDRAWAL_LINK,
  type NavLink,
} from '@/src/lib/navigation'
import { SITE } from '@/src/lib/site-config'

type FooterColumnProps = {
  title: string
  links: NavLink[]
}

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div>
      <h2 className="text-sm font-semibold text-navy-foreground">{title}</h2>
      <ul className="mt-4 flex flex-col gap-2.5">
        {links.map(link => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-navy-foreground/70 transition-colors hover:text-navy-foreground"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function SiteFooter() {
  const contact = [
    { label: 'Dirección', text: `${SITE.address} · ${SITE.city}` },
    { label: 'Teléfono', text: SITE.phone },
    { label: 'Email', text: SITE.email },
    { label: 'Horario', text: SITE.hours },
  ]

  return (
    <footer className="mt-auto bg-navy text-navy-foreground">
      <CmykStripe />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-5">
        <div className="flex flex-col gap-5 lg:col-span-2">
          <BrandLogo inverted />
          <p className="max-w-sm text-sm text-navy-foreground/70">
            Más de {SITE.yearsInBusiness} años acompañando a imprentas, empresas y hogares de {SITE.city}. Distribuidor
            oficial Epson.
          </p>
          {/* SAMPLE contact data — see site-config.ts */}
          <ul className="flex flex-col gap-2 text-sm text-navy-foreground/70">
            {contact.map(({ label, text }) => (
              <li key={label} className="flex gap-3">
                <span className="w-16 shrink-0 text-navy-foreground/40">{label}</span>
                {text}
              </li>
            ))}
          </ul>
        </div>
        <FooterColumn title="Comprá" links={CATEGORY_LINKS} />
        <FooterColumn title="Ayuda" links={HELP_LINKS} />
        <div className="flex flex-col gap-10">
          <FooterColumn title="Empresa" links={COMPANY_LINKS} />
          <FooterColumn title="Legales" links={LEGAL_LINKS} />
        </div>
      </div>
      <div className="border-t border-navy-foreground/10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-4 py-6 text-xs text-navy-foreground/60 sm:px-6 md:flex-row md:items-center">
          <p>
            © {new Date().getFullYear()} {SITE.name} SRL. Todos los derechos reservados.
          </p>
          <p>Pagos procesados por Mercado Pago</p>
          <Link
            href={WITHDRAWAL_LINK.href}
            className="rounded-full border border-navy-foreground/30 px-4 py-2 font-semibold text-navy-foreground transition-colors hover:bg-navy-foreground hover:text-navy"
          >
            {WITHDRAWAL_LINK.label}
          </Link>
        </div>
      </div>
    </footer>
  )
}
