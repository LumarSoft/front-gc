import { percent } from '@/src/features/admin/lib/system-display'
import { formatMoneyExact } from '@/src/lib/format'
import type { SystemStatus } from '@/src/types/api/admin-system'

/** Something on the "Sistema" page worth a look: critical when the store is failing, attention otherwise. */
export type SystemCheck = { level: 'critical' | 'attention'; title: string; detail: string }

/** The reservation task runs every minute: past this, it stopped. */
const JOB_STALE_MS = 5 * 60_000
const EXCHANGE_RATE_STALE_DAYS = 7
const LOW_DISK_PERCENT = 10
const TOKENS_WARNING_PERCENT = 80

/** What to review, most serious first. Empty means everything is in order. */
export function systemChecks(status: SystemStatus, now = new Date()): SystemCheck[] {
  const checks: SystemCheck[] = []
  const { database, jobs, integrations, store, api } = status
  const critical = (title: string, detail: string) => checks.push({ level: 'critical', title, detail })
  const attention = (title: string, detail: string) => checks.push({ level: 'attention', title, detail })

  if (database.migrations?.pending.length)
    critical(
      'Faltan migraciones en la base',
      `${database.migrations.pending.join(', ')}. Correr npx prisma migrate deploy y reiniciar la API.`,
    )
  const expiry = jobs.orderExpiry
  if (expiry.failed)
    critical('Falló el vencimiento de reservas', 'La última corrida no pudo liberar todos los pedidos.')
  if (!expiry.lastRunAt || now.getTime() - Date.parse(expiry.lastRunAt) > JOB_STALE_MS)
    critical(
      'El vencimiento de reservas no está corriendo',
      'Debería correr cada minuto: revisar que la API esté viva.',
    )
  if (expiry.overdue > 0)
    critical(
      `${expiry.overdue} pedido${expiry.overdue === 1 ? '' : 's'} con la reserva vencida sin liberar`,
      'Siguen reteniendo stock que otros clientes no pueden comprar.',
    )
  if (api.disk && percent(api.disk.freeBytes, api.disk.totalBytes) < LOW_DISK_PERCENT)
    critical('Queda poco disco en el servidor', 'Menos del 10 % libre: las fotos nuevas pueden no subirse.')

  const { errors } = status.logs.last24h
  if (errors > 0)
    attention(
      `${errors} error${errors === 1 ? '' : 'es'} en las últimas 24 h`,
      status.logs.lastError
        ? `El último, de ${status.logs.lastError.source}: ${status.logs.lastError.message}`
        : 'Mirá el detalle en Errores.',
    )

  const { mercadoPago, zipnova, openai, email } = integrations
  if (!mercadoPago.configured) attention('Mercado Pago sin configurar', 'La tienda no ofrece pagar online.')
  else if (mercadoPago.credentials === 'TEST')
    attention('Mercado Pago en modo prueba', 'Credenciales TEST-: los pagos no son reales.')
  if (mercadoPago.failedNotifications.count > 0)
    attention(
      `${mercadoPago.failedNotifications.count} aviso${mercadoPago.failedNotifications.count === 1 ? '' : 's'} de pago con error`,
      mercadoPago.failedNotifications.lastError ?? 'En los últimos 30 días.',
    )
  if (!zipnova.configured) attention('Zipnova sin configurar', 'No se pueden cotizar envíos al resto del país.')
  if (!openai.configured) attention('OpenAI sin configurar', 'El asesor IA no está disponible.')
  else if (percent(openai.tokensToday, openai.dailyTokenLimit) >= TOKENS_WARNING_PERCENT)
    attention('El asesor está cerca del límite diario', 'Al llegar al límite se pausa hasta la medianoche.')
  if (!openai.whatsappNumber)
    attention('Falta el WhatsApp del cliente', 'El asesor no puede ofrecer hablar con una persona.')
  if (email.provider === null)
    attention(
      'Los emails no se envían',
      email.last30Days.failed > 0
        ? `No hay proveedor de email: ${email.last30Days.failed} sin enviar en los últimos 30 días.`
        : 'No hay proveedor de email configurado.',
    )

  if (!store.exchangeRate) attention('No hay cotización del dólar', 'Los productos en USD no tienen precio.')
  else if ((now.getTime() - Date.parse(store.exchangeRate.effectiveFrom)) / 86_400_000 > EXCHANGE_RATE_STALE_DAYS)
    attention(
      'La cotización del dólar tiene más de una semana',
      `Último valor: ${formatMoneyExact({ amount: store.exchangeRate.rate, currency: 'ARS' })}.`,
    )
  if (store.publishedWithoutImages > 0)
    attention(
      `${store.publishedWithoutImages} producto${store.publishedWithoutImages === 1 ? '' : 's'} publicado${store.publishedWithoutImages === 1 ? '' : 's'} sin foto`,
      'Se ven con un recuadro vacío en la tienda.',
    )
  return checks
}
