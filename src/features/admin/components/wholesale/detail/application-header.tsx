import Link from 'next/link'
import { ArrowLeftIcon } from '@phosphor-icons/react'
import { Button } from '@/src/components/ui/button'
import { WholesaleStatusBadges } from '@/src/features/admin/components/wholesale/wholesale-status-badge'
import { formatOrderDate } from '@/src/features/admin/lib/relative-date'
import type { AdminWholesaleApplication } from '@/src/types/api/wholesale'

/** Company name and status at a glance, with when it applied. */
export function ApplicationHeader({ application }: { application: AdminWholesaleApplication }) {
  return (
    <header className="mb-4 flex items-start gap-3 sm:mb-5">
      <Button variant="ghost" size="icon" asChild>
        <Link href="/admin/clientes-frecuentes" aria-label="Volver a clientes frecuentes">
          <ArrowLeftIcon className="size-4.5" />
        </Link>
      </Button>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="min-w-0 text-xl font-semibold tracking-tight break-words">{application.company.legalName}</h1>
          <WholesaleStatusBadges application={application} />
        </div>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Solicitud enviada {formatOrderDate(application.createdAt).toLowerCase()}
        </p>
      </div>
    </header>
  )
}
