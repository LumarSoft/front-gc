'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { refreshSession } from '@/src/lib/api-client'

type SessionRefreshProps = {
  /** Set by pages whose server data was loaded anonymously because the session had expired. */
  when: boolean
}

/** Renews an expired session in the browser and re-renders the page so prices match the buyer again. */
export function SessionRefresh({ when }: SessionRefreshProps) {
  const router = useRouter()

  useEffect(() => {
    if (!when) return
    void refreshSession().then(renewed => {
      if (renewed) router.refresh()
    })
  }, [when, router])

  return null
}
