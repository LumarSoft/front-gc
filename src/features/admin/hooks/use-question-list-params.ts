'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { parseQuestionListParams, questionListSearch } from '@/src/features/admin/lib/question-list-params'
import type { UnansweredQuestionsQuery } from '@/src/types/api/admin-assistant'

/** The unanswered-question list's view, search and page, in the URL. Any change but the page goes to page 1. */
export function useQuestionListParams() {
  const router = useRouter()
  const pathname = usePathname()
  const query = parseQuestionListParams(new URLSearchParams(useSearchParams().toString()))

  const update = (changes: Partial<UnansweredQuestionsQuery>): void => {
    const next = { ...query, ...('page' in changes ? {} : { page: undefined }), ...changes }
    router.replace(`${pathname}${questionListSearch(next)}`, { scroll: false })
  }

  return { query, update, hasSearch: Boolean(query.q) }
}
