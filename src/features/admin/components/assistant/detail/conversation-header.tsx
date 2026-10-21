import { ArrowLeftIcon } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/src/components/ui/button'
import { ConversationBadges } from '@/src/features/admin/components/assistant/conversation-badges'
import { customerName } from '@/src/features/admin/lib/assistant-display'
import { formatOrderDate } from '@/src/features/admin/lib/relative-date'
import type { AdminConversation } from '@/src/types/api/admin-assistant'

/** Number and what needs a look at a glance, with who wrote and when it started. */
export function ConversationHeader({ conversation }: { conversation: AdminConversation }) {
  const openQuestions = conversation.questions.filter(question => question.status === 'OPEN').length
  return (
    <header className="mb-4 flex items-start gap-3 sm:mb-5">
      <Button variant="ghost" size="icon" asChild>
        <Link href="/admin/asistente" aria-label="Volver a las conversaciones">
          <ArrowLeftIcon className="size-4.5" />
        </Link>
      </Button>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-xl font-semibold tracking-tight">Conversación #{conversation.id}</h1>
          <ConversationBadges conversation={{ status: conversation.status, openQuestions }} />
        </div>
        <p className="mt-0.5 text-sm text-muted-foreground">
          {customerName(conversation.customer)} · empezó {formatOrderDate(conversation.createdAt).toLowerCase()}
        </p>
      </div>
    </header>
  )
}
