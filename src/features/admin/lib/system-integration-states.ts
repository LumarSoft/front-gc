import type { BadgeTone } from '@/src/features/admin/components/common/tone-badge'
import type { SystemStatus } from '@/src/types/api/admin-system'

type State = { label: string; tone: BadgeTone }

const ACTIVE: State = { label: 'Activa', tone: 'success' }
const MISSING: State = { label: 'Sin configurar', tone: 'critical' }

/** The badge of each integration on the "Sistema" page. */
export function integrationStates(
  integrations: SystemStatus['integrations'],
): Record<'mercadoPago' | 'zipnova' | 'openai' | 'email' | 'tango', State> {
  const { mercadoPago, zipnova, openai } = integrations
  return {
    mercadoPago: !mercadoPago.configured
      ? MISSING
      : mercadoPago.credentials === 'TEST'
        ? { label: 'Modo prueba', tone: 'attention' }
        : mercadoPago.credentials === 'APP_USR'
          ? { label: 'Credenciales APP_USR', tone: 'success' }
          : ACTIVE,
    zipnova: zipnova.configured ? ACTIVE : MISSING,
    openai: openai.configured ? ACTIVE : MISSING,
    email: { label: 'Sin proveedor', tone: 'attention' },
    tango: { label: 'Sin definir', tone: 'neutral' },
  }
}
