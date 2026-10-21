import Link from 'next/link'
import type { ReactNode } from 'react'
import { parseRichText, type Inline } from '@/src/features/assistant/lib/rich-text'
import { cn } from '@/src/lib/utils'

type AssistantRichTextProps = {
  text: string
  /** Called when the customer follows a link, so the chat can step aside on small screens. */
  onNavigate: () => void
}

export function AssistantRichText({ text, onNavigate }: AssistantRichTextProps) {
  return (
    <div className="flex flex-col gap-2.5 text-sm leading-relaxed">
      {parseRichText(text).map((block, index) =>
        block.type === 'paragraph' ? (
          <p key={index}>
            <InlineContent content={block.content} onNavigate={onNavigate} />
          </p>
        ) : (
          <List key={index} ordered={block.ordered}>
            {block.items.map((item, itemIndex) => (
              <li key={itemIndex} className="pl-1">
                <InlineContent content={item} onNavigate={onNavigate} />
              </li>
            ))}
          </List>
        ),
      )}
    </div>
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

function InlineContent({ content, onNavigate }: { content: Inline[]; onNavigate: () => void }) {
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
