import { EMPTY_CONVERSATION, type Conversation } from './assistant-conversation'

/**
 * The open conversation lives in the tab's session storage: it survives reloads and navigation, and closing the tab
 * forgets it (the token is the only way back to the conversation).
 */
const STORAGE_KEY = 'cg_assistant_conversation'

export function loadConversation(): Conversation {
  try {
    const stored = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? 'null') as Conversation | null
    if (!stored || !Array.isArray(stored.messages)) return EMPTY_CONVERSATION
    // An answer interrupted by a reload will never finish.
    const messages = stored.messages.map(message =>
      message.role === 'assistant' && message.pending ? { ...message, pending: false } : message,
    )
    return { token: typeof stored.token === 'string' ? stored.token : null, messages }
  } catch {
    return EMPTY_CONVERSATION
  }
}

export function saveConversation(conversation: Conversation): void {
  try {
    if (conversation.messages.length) sessionStorage.setItem(STORAGE_KEY, JSON.stringify(conversation))
    else sessionStorage.removeItem(STORAGE_KEY)
  } catch {
    // Storage full or blocked (private mode): the chat keeps working, it just will not survive a reload.
  }
}
