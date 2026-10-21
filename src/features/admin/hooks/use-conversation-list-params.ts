'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { conversationListSearch, parseConversationListParams } from '@/src/features/admin/lib/conversation-list-params'
import type { AdminConversationsQuery } from '@/src/types/api/admin-assistant'

/** The conversation list's view, search, days and page, in the URL. Any change but the page goes to page 1. */
export function useConversationListParams() {
  const router = useRouter()
  const pathname = usePathname()
  const query = parseConversationListParams(new URLSearchParams(useSearchParams().toString()))

  const update = (changes: Partial<AdminConversationsQuery>): void => {
    const next = { ...query, ...('page' in changes ? {} : { page: undefined }), ...changes }
    router.replace(`${pathname}${conversationListSearch(next)}`, { scroll: false })
  }

  return {
    query,
    update,
    hasFilters: Boolean(query.q || query.range),
    clear: () => router.replace(pathname, { scroll: false }),
  }
}
