'use client'

import { RouteError } from '@/src/components/ui/route-error'

export default function Error({ retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return <RouteError reset={retry} />
}
