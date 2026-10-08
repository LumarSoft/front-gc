import type { Metadata } from 'next'
import { HomeView } from '@/src/features/admin/components/dashboard/home-view'

export const metadata: Metadata = { title: 'Inicio' }

export default function AdminHomePage() {
  return <HomeView />
}
