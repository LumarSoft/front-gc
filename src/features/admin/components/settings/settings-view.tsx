'use client'

import { Card } from '@/src/components/ui/card'
import { Skeleton } from '@/src/components/ui/skeleton'
import { AdminPageHeader } from '@/src/features/admin/components/admin-page-header'
import { ContextualSaveBar } from '@/src/features/admin/components/common/contextual-save-bar'
import { QueryErrorState } from '@/src/features/admin/components/feedback/query-error-state'
import { ExchangeRateSummary } from '@/src/features/admin/components/settings/exchange-rate-summary'
import { LocalDeliveryCard } from '@/src/features/admin/components/settings/local-delivery-card'
import { ReservationCard } from '@/src/features/admin/components/settings/reservation-card'
import { SettingsSection } from '@/src/features/admin/components/settings/settings-section'
import { useAdminSettings } from '@/src/features/admin/hooks/use-admin-settings'
import { SaveBarContext, useSaveBar } from '@/src/features/admin/hooks/use-save-bar'

/** Store settings, Shopify style: one row per topic, changes saved together from the save bar. */
export function SettingsView() {
  const { data: settings, isPending, isError, refetch } = useAdminSettings()
  const saveBar = useSaveBar('Configuración guardada')

  return (
    <SaveBarContext.Provider value={saveBar.registry}>
      <ContextualSaveBar
        dirty={saveBar.dirty}
        saving={saveBar.saving}
        onSave={() => void saveBar.save()}
        onDiscard={saveBar.discard}
      />
      <div className="mx-auto max-w-4xl">
        <AdminPageHeader title="Configuración" />
        {isPending ? (
          <Card className="gap-3 p-4">
            <Skeleton className="h-5 w-1/3" />
            <Skeleton className="h-9 w-full" />
          </Card>
        ) : isError || !settings ? (
          <Card className="py-0">
            <QueryErrorState message="No pudimos cargar la configuración." onRetry={() => void refetch()} />
          </Card>
        ) : (
          <div className="flex flex-col gap-6">
            <SettingsSection
              title="Entrega en Rosario"
              description="Envío a domicilio dentro de Rosario. El retiro en el local es siempre gratis y el envío al resto del país todavía no está disponible."
            >
              <LocalDeliveryCard settings={settings} />
            </SettingsSection>
            <SettingsSection
              title="Reserva de stock"
              description="Mientras se coordina el pago, el pedido aparta sus productos. Si no se confirma a tiempo, la reserva vence y el stock vuelve a estar disponible."
            >
              <ReservationCard settings={settings} />
            </SettingsSection>
            <SettingsSection
              title="Cotización del dólar"
              description="Con este valor se muestran y cobran en pesos los precios cargados en USD."
            >
              <ExchangeRateSummary />
            </SettingsSection>
          </div>
        )}
      </div>
    </SaveBarContext.Provider>
  )
}
