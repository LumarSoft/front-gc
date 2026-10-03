import Link from 'next/link'
import { Button } from '@/src/components/ui/button'
import { AccountCard } from '@/src/features/account/components/account-card'
import type { AuthCompany, WholesaleStatus } from '@/src/types/api/auth'

const COMPANY_STATUS_LABEL: Record<WholesaleStatus, string> = {
  PENDING: 'Solicitud en revisión',
  APPROVED: 'Cuenta aprobada: ya ves precios preferenciales',
  REJECTED: 'Solicitud no aprobada',
  PAUSED: 'Cuenta pausada: por ahora comprás con precios de lista',
}

type FrequentCustomerCardProps = {
  company: AuthCompany | null
}

export function FrequentCustomerCard({ company }: FrequentCustomerCardProps) {
  return (
    <AccountCard title="Clientes frecuentes">
      {company ? (
        <>
          <p className="text-sm font-medium">{company.legalName}</p>
          <p className="text-sm text-muted-foreground">{COMPANY_STATUS_LABEL[company.wholesaleStatus]}</p>
        </>
      ) : (
        <>
          <p className="text-sm text-muted-foreground">
            ¿Comprás para una imprenta, comercio o empresa? Pedí tu cuenta y accedé a precios preferenciales y cuenta
            corriente.
          </p>
          <Button asChild variant="outline" className="mt-auto h-10 self-start rounded-full px-5">
            <Link href="/clientes-frecuentes/alta">Solicitar cuenta</Link>
          </Button>
        </>
      )}
    </AccountCard>
  )
}
