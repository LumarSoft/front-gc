import type { Metadata } from 'next'
import { SystemView } from '@/src/features/admin/components/system/system-view'
import type { FrontVersion } from '@/src/types/api/admin-system'

export const metadata: Metadata = { title: 'Sistema' }

/** The store's own version comes from Vercel's build variables, read on the server (none when running locally). */
export default function AdminSystemPage() {
  const commit = process.env.VERCEL_GIT_COMMIT_SHA
  const front: FrontVersion = commit
    ? {
        commit,
        subject: process.env.VERCEL_GIT_COMMIT_MESSAGE?.split('\n')[0] ?? null,
        environment: process.env.VERCEL_ENV ?? null,
      }
    : null
  return <SystemView front={front} />
}
