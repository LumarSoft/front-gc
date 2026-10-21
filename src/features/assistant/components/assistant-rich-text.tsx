import Link from 'next/link'
import type { ReactNode } from 'react'
import { parseRichText, type Inline } from '@/src/features/assistant/lib/rich-text'
import { cn } from '@/src/lib/utils'

type AssistantRichTextProps = {
  text: string
  /** Called when the customer follows a link, so the chat can step aside on small screens. */
  onNavigate?: () => void
  /** Links open the store page in a new tab (the admin reading a conversation). */
  newTab?: boolean
  /** The text is still being written: a soft cursor follows its last word. */
  writing?: boolean
}

export function AssistantRichText({ text, onNavigate, newTab = false, writing = false }: AssistantRichTextProps) {
  const blocks = parseRichText(text)
  return (
    <div className="flex flex-col gap-2.5 text-sm leading-relaxed">
      {blocks.map((block, index) => {
        const caret = writing && index === blocks.length - 1 ? <WritingCaret /> : null
        return block.type === 'paragraph' ? (
          <p key={index}>
            <InlineContent content={block.content} onNavigate={onNavigate} newTab={newTab} />
            {caret}
          </p>
        ) : (
          <List key={index} ordered={block.ordered}>
            {block.items.map((item, itemIndex) => (
              <li key={itemIndex} className="pl-1">
                <InlineContent content={item} onNavigate={onNavigate} newTab={newTab} />
                {itemIndex === block.items.length - 1 && caret}
              </li>
            ))}
          </List>
        )
      })}
    </div>
  )
}

/** Process-cyan bar after the last word while the answer streams in (steady with reduced motion). */
function WritingCaret() {
  return (
    <span
      aria-hidden
      className="ml-0.5 inline-block h-3.5 w-1.5 translate-y-0.5 rounded-full bg-cyan motion-safe:animate-caret"
    />
  )
}

const LIST_CLASS = 'flex flex-col gap-1.5 pl-5 marker:font-semibold marker:text-primary'

function List({ ordered, children }: { ordered: boolean; children: ReactNode }) {
  return ordered ? (
    <ol className={cn('list-decimal', LIST_CLASS)}>{children}</ol>
  ) : (
    <ul className={cn('list-disc', LIST_CLASS)}>{children}</ul>
  )
}

type InlineContentProps = { content: Inline[]; onNavigate?: () => void; newTab: boolean }

function InlineContent({ content, onNavigate, newTab }: InlineContentProps) {
  return content.map((piece, index) => {
    switch (piece.type) {
      case 'strong':
        return (
          <strong key={index} className="font-bold">
            {piece.text}
          </strong>
        )
      case 'link':
        return (
          <Link
            key={index}
            href={piece.href}
            onClick={onNavigate}
            {...(newTab && { target: '_blank', rel: 'noreferrer' })}
            className="font-semibold text-primary underline underline-offset-2 hover:text-navy"
          >
            {piece.text}
          </Link>
        )
      case 'break':
        return <br key={index} />
      default:
        return piece.text
    }
  })
}
