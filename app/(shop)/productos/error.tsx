'use client'

import { RouteError } from '@/src/components/ui/route-error'

type ErrorProps = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ reset }: ErrorProps) {
  return <RouteError reset={reset} />
}
