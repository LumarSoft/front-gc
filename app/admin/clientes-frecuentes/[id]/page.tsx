import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { WholesaleApplicationView } from '@/src/features/admin/components/wholesale/detail/wholesale-application-view'

export const metadata: Metadata = { title: 'Solicitud de cliente frecuente' }
export default async function AdminWholesaleApplicationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const applicationId = Number(id)
  if (!Number.isSafeInteger(applicationId) || applicationId <= 0) notFound()
  return <WholesaleApplicationView id={applicationId} />
}
