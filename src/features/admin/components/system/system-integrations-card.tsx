import { AdminCard } from '@/src/features/admin/components/common/admin-card'
import { SystemFact, SystemFacts } from '@/src/features/admin/components/system/system-fact'
import { SystemIntegration } from '@/src/features/admin/components/system/system-integration'
import { formatFromNow } from '@/src/features/admin/lib/relative-date'
import { integrationStates } from '@/src/features/admin/lib/system-integration-states'
import type { SystemStatus } from '@/src/types/api/admin-system'

const tokens = new Intl.NumberFormat('es-AR')
const when = (iso: string | null): string => (iso ? formatFromNow(iso) : 'Nunca')
const yesNo = (value: boolean): string => (value ? 'Sí' : 'No')

/** Each external service: whether it is set up (never its keys), in which mode, and when it was last used. */
export function SystemIntegrationsCard({ integrations }: { integrations: SystemStatus['integrations'] }) {
  const { mercadoPago, zipnova, openai, email } = integrations
  const states = integrationStates(integrations)
  return (
    <AdminCard title="Integraciones">
      <div className="flex flex-col divide-y">
        <SystemIntegration name="Mercado Pago" state={states.mercadoPago}>
          <SystemFacts>
            <SystemFact label="Webhook firmado">{yesNo(mercadoPago.webhookSecret)}</SystemFact>
            <SystemFact label="Último aviso de pago">{when(mercadoPago.lastNotificationAt)}</SystemFact>
            <SystemFact label="Avisos con error (30 días)">
              {mercadoPago.failedNotifications.count}
              {mercadoPago.failedNotifications.lastError && (
                <span className="block text-xs font-normal text-muted-foreground">
                  {mercadoPago.failedNotifications.lastError}
                </span>
              )}
            </SystemFact>
          </SystemFacts>
        </SystemIntegration>
        <SystemIntegration name="Zipnova (envíos)" state={states.zipnova}>
          <SystemFacts>
            <SystemFact label="API">{zipnova.apiHost ?? 'Sin configurar'}</SystemFact>
            <SystemFact label="Webhook firmado">{yesNo(zipnova.webhookSecret)}</SystemFact>
            <SystemFact label="Última cotización">{when(zipnova.lastQuoteAt)}</SystemFact>
            <SystemFact label="Último envío reservado">{when(zipnova.lastShipmentAt)}</SystemFact>
          </SystemFacts>
        </SystemIntegration>
        <SystemIntegration name="OpenAI (asesor IA)" state={states.openai}>
          <SystemFacts>
            <SystemFact label="Modelo">
              {openai.model} · razonamiento {openai.reasoningEffort}
            </SystemFact>
            <SystemFact label="Tokens hoy">
              {tokens.format(openai.tokensToday)} de {tokens.format(openai.dailyTokenLimit)}
            </SystemFact>
            <SystemFact label="WhatsApp para derivar">{openai.whatsappNumber ? 'Configurado' : 'Falta'}</SystemFact>
          </SystemFacts>
        </SystemIntegration>
        <SystemIntegration name="Email" state={states.email}>
          <SystemFacts>
            <SystemFact label="Últimos 30 días">
              {email.last30Days.sent} enviados · {email.last30Days.failed} sin enviar · {email.last30Days.logged}{' '}
              registrados (desarrollo)
            </SystemFact>
            <SystemFact label="Último email">{when(email.lastAt)}</SystemFact>
          </SystemFacts>
        </SystemIntegration>
        <SystemIntegration name="Tango" state={states.tango}>
          <p className="text-sm text-muted-foreground">
            Todavía no está definido cómo se conecta. El stock se ajusta a mano en el admin.
          </p>
        </SystemIntegration>
      </div>
    </AdminCard>
  )
}
