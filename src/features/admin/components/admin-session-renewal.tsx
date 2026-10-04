'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { refreshSession } from '@/src/lib/api-client'

/**
 * Shown instead of the panel when the access cookie expired. Renews the session in the browser (the refresh cookie
 * only travels to the API) and reloads the panel; if it cannot be renewed, sends the admin to log in again.
 */
export function AdminSessionRenewal() {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    void refreshSession().then(renewed => {
      if (renewed) router.refresh()
      else router.replace(`/ingresar?redirect=${encodeURIComponent(pathname)}`)
    })
  }, [router, pathname])

  return (
    <p role="status" className="m-auto p-8 text-sm text-muted-foreground">
      Verificando tu sesión…
    </p>
  )
}
