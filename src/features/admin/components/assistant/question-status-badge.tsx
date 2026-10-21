import { ToneBadge } from '@/src/features/admin/components/common/tone-badge'
import { QUESTION_STATUS_BADGE } from '@/src/features/admin/lib/assistant-display'
import type { QuestionStatus } from '@/src/types/api/admin-assistant'

export function QuestionStatusBadge({ status }: { status: QuestionStatus }) {
  const { label, tone } = QUESTION_STATUS_BADGE[status]
  return <ToneBadge tone={tone}>{label}</ToneBadge>
}
