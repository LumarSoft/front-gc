import type { AdminAssistantMessage, AdminUnansweredQuestion } from '@/src/types/api/admin-assistant'

/**
 * The missing data each answer noted, by answer id. The assistant notes it while answering and the answer is saved when
 * it ends, so a note belongs to the first answer saved at or after it (the last answer if none is).
 */
export function missingDataByAnswer(
  messages: Pick<AdminAssistantMessage, 'id' | 'role' | 'createdAt'>[],
  questions: AdminUnansweredQuestion[],
): Map<number, AdminUnansweredQuestion[]> {
  const answers = messages.filter(message => message.role !== 'USER')
  const byAnswer = new Map<number, AdminUnansweredQuestion[]>()
  for (const question of questions) {
    const noted = Date.parse(question.createdAt)
    const answer = answers.find(message => Date.parse(message.createdAt) >= noted) ?? answers.at(-1)
    if (answer) byAnswer.set(answer.id, [...(byAnswer.get(answer.id) ?? []), question])
  }
  return byAnswer
}
