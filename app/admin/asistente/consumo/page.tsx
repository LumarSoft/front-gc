import { redirect } from 'next/navigation'

/** "Consumo" became "Métricas" (2026-10-21): old links and bookmarks land on the new page. */
export default function AdminAssistantUsageRedirect() {
  redirect('/admin/asistente/metricas')
}
