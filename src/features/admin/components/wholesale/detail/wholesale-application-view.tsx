'use client'

import Link from 'next/link'
import { BuildingsIcon } from '@phosphor-icons/react'
import { Button } from '@/src/components/ui/button'
import { Card } from '@/src/components/ui/card'
import { EmptyState } from '@/src/components/ui/empty-state'
import { DetailSkeleton } from '@/src/features/admin/components/common/detail-skeleton'
import { QueryErrorState } from '@/src/features/admin/components/feedback/query-error-state'
import { ApplicationCompanyCard } from '@/src/features/admin/components/wholesale/detail/application-company-card'
import { ApplicationContactCard } from '@/src/features/admin/components/wholesale/detail/application-contact-card'
import { ApplicationHeader } from '@/src/features/admin/components/wholesale/detail/application-header'
import { ApplicationHistoryCard } from '@/src/features/admin/components/wholesale/detail/application-history-card'
import { ApplicationReviewCard } from '@/src/features/admin/components/wholesale/detail/application-review-card'
import { WholesaleDecisionDialog } from '@/src/features/admin/components/wholesale/detail/wholesale-decision-dialog'
import { useAdminWholesaleApplication } from '@/src/features/admin/hooks/use-admin-wholesale'
import { ApiError } from '@/src/lib/api-client'

/** One application, like an order: review and company data on the left, contact and history on the right. */
export function WholesaleApplicationView({ id }: { id: number }) {
  const { query, mutation, pendingDecision, request, closeDialog, decide } = useAdminWholesaleApplication(id)

  if (query.isPending) return <DetailSkeleton label="Cargando solicitud" />
  if (query.isError) {
    const missing = query.error instanceof ApiError && query.error.status === 404
    return (
      <Card className="py-0">
        {missing ? (
          <EmptyState
            icon={<BuildingsIcon />}
            title="No encontramos esta solicitud"
            description="Puede que el link esté mal escrito. Buscala por empresa o CUIT en la lista."
            action={
              <Button variant="outline" asChild>
                <Link href="/admin/clientes-frecuentes">Ver clientes frecuentes</Link>
              </Button>
            }
          />
        ) : (
          <QueryErrorState message="No pudimos cargar esta solicitud." onRetry={() => void query.refetch()} />
        )}
      </Card>
    )
  }

  const application = query.data
  return (
    <>
      <ApplicationHeader application={application} />
      <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="flex min-w-0 flex-col gap-4">
          <ApplicationReviewCard application={application} pending={mutation.isPending} onDecide={request} />
          <ApplicationCompanyCard application={application} />
        </div>
        <div className="flex min-w-0 flex-col gap-4">
          <ApplicationContactCard application={application} />
          <ApplicationHistoryCard application={application} />
        </div>
      </div>
      <WholesaleDecisionDialog
        key={pendingDecision ?? 'closed'}
        decision={pendingDecision}
        companyName={application.company.legalName}
        pending={mutation.isPending}
        onClose={closeDialog}
        onConfirm={decide}
      />
    </>
  )
}
