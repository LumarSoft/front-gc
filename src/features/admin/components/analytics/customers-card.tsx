import Link from 'next/link'
import { BarList } from '@/src/features/admin/components/analytics/bar-list'
import { AdminCard } from '@/src/features/admin/components/common/admin-card'
import { MetricChange } from '@/src/features/admin/components/dashboard/metric-change'
import { amountOf, pluralize, share } from '@/src/features/admin/lib/analytics-display'
import { formatHeadlineMoney, percentChange } from '@/src/features/admin/lib/dashboard-metrics'
import type { AdminAnalytics, Compared } from '@/src/types/api/admin-analytics'

/** Who bought (first time or again), new accounts and frequent-customer applications. */
export function CustomersCard({ customers }: { customers: AdminAnalytics['customers'] }) {
  const { total, returning, newSales, returningSales, signUps, frequentCustomerApplications: applications } = customers
  const newCount = total.current - returning.current
  const rows =
    total.current === 0
      ? []
      : [
          {
            key: 'returning',
            label: 'Ya habían comprado',
            value: amountOf(returningSales),
            display: formatHeadlineMoney(returningSales),
            detail: `${pluralize(returning.current, 'cliente', 'clientes')} · ${share(returning.current, total.current)} %`,
          },
          {
            key: 'new',
            label: 'Compraron por primera vez',
            value: amountOf(newSales),
            display: formatHeadlineMoney(newSales),
            detail: `${pluralize(newCount, 'cliente', 'clientes')} · ${share(newCount, total.current)} %`,
          },
        ]

  return (
    <AdminCard
      title="Clientes"
      aside={
        <span className="text-xs text-muted-foreground">
          {total.current} {total.current === 1 ? 'compró' : 'compraron'}
        </span>
      }
    >
      <BarList rows={rows} empty="Nadie compró en este período." />
      <dl className="mt-4 flex flex-col gap-2 border-t pt-3 text-sm">
        <Fact label="Cuentas creadas" value={signUps} />
        <Fact label="Solicitudes de clientes frecuentes recibidas" value={applications.received} />
        <Fact label="Solicitudes aprobadas" value={applications.approved} />
        {applications.pending > 0 && (
          <div className="flex justify-between gap-3">
            <dt className="text-muted-foreground">Esperando revisión</dt>
            <dd>
              <Link href="/admin/clientes-frecuentes" className="font-medium tabular-nums hover:underline">
                {applications.pending}
              </Link>
            </dd>
          </div>
        )}
      </dl>
    </AdminCard>
  )
}

function Fact({ label, value }: { label: string; value: Compared<number> }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="flex items-baseline gap-2">
        <span className="font-medium tabular-nums">{value.current}</span>
        {(value.current > 0 || value.previous > 0) && (
          <MetricChange change={percentChange(value.current, value.previous)} empty="Nuevo" />
        )}
      </dd>
    </div>
  )
}
