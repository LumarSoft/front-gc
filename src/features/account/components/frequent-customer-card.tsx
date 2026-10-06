import Link from 'next/link'
import { Button } from '@/src/components/ui/button'
import { AccountCard } from '@/src/features/account/components/account-card'
import { WHOLESALE_STATUS_DESCRIPTION } from '@/src/features/wholesale/lib/wholesale-labels'
import type { AuthCompany } from '@/src/types/api/auth'

type FrequentCustomerCardProps = {
  company: AuthCompany | null
}

export function FrequentCustomerCard({ company }: FrequentCustomerCardProps) {
  return (
    <AccountCard title="Clientes frecuentes">
      {company ? (
        <>
          <p className="text-sm font-medium">{company.legalName}</p>
          <p className="text-sm text-muted-foreground">{WHOLESALE_STATUS_DESCRIPTION[company.wholesaleStatus]}</p>
          <Button asChild variant="outline" className="mt-auto h-10 self-start rounded-full px-5">
            <Link href="/clientes-frecuentes/alta">Ver mi solicitud</Link>
          </Button>
        </>
      ) : (
        <>
          <p className="text-sm text-muted-foreground">
            ¿Comprás para una imprenta, comercio o empresa? Pedí tu cuenta de cliente frecuente.
          </p>
          <Button asChild variant="outline" className="mt-auto h-10 self-start rounded-full px-5">
            <Link href="/clientes-frecuentes/alta">Solicitar cuenta</Link>
          </Button>
        </>
      )}
    </AccountCard>
  )
}
