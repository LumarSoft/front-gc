import type { Metadata } from 'next'
import { SettingsView } from '@/src/features/admin/components/settings/settings-view'

export const metadata: Metadata = { title: 'Configuración' }

export default function AdminSettingsPage() {
  return <SettingsView />
}
