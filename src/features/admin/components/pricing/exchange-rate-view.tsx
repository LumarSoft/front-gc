'use client'

import { Card } from '@/src/components/ui/card'
import { Skeleton } from '@/src/components/ui/skeleton'
import { AdminPageHeader } from '@/src/features/admin/components/admin-page-header'
import { QueryErrorState } from '@/src/features/admin/components/feedback/query-error-state'
import { CurrentRateCard } from '@/src/features/admin/components/pricing/current-rate-card'
import { NewRateForm } from '@/src/features/admin/components/pricing/new-rate-form'
import { RatesHistoryCard } from '@/src/features/admin/components/pricing/rates-history-card'
import { useExchangeRates } from '@/src/features/admin/hooks/use-pricing-data'

export function ExchangeRateView() {
  const { data, isPending, isError, refetch } = useExchangeRates()

  return (
    <>
      <AdminPageHeader
        title="Cotización del dólar"
        description="Con este valor se muestran y cobran en pesos los precios cargados en USD."
      />
      {isError ? (
        <Card className="py-0">
          <QueryErrorState onRetry={() => void refetch()} />
        </Card>
      ) : (
        <div className="grid gap-4 lg:grid-cols-3 lg:items-start lg:gap-6">
          <div className="flex flex-col gap-4 lg:col-span-2 lg:gap-6">
            {isPending ? (
              <Skeleton className="h-40 rounded-xl" />
            ) : (
              <CurrentRateCard current={data.current} next={data.scheduled[0]} />
            )}
            {data && data.scheduled.length > 0 && (
              <RatesHistoryCard
                title="Programadas"
                description="Empiezan a regir solas en la fecha indicada."
                rates={data.scheduled}
              />
            )}
            {data && data.history.length > 0 && (
              <RatesHistoryCard
                title="Historial"
                description="Las últimas cotizaciones cargadas."
                rates={data.history}
                highlightFirst
              />
            )}
          </div>
          <NewRateForm />
        </div>
      )}
    </>
  )
}
