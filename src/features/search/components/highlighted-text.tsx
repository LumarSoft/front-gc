import { highlightParts } from '@/src/features/search/lib/highlight'

type HighlightedTextProps = {
  text: string
  /** What was searched: its words are shown in bold inside `text`. */
  query: string
}

export function HighlightedText({ text, query }: HighlightedTextProps) {
  return highlightParts(text, query).map((part, index) =>
    part.match ? (
      <mark key={index} className="bg-transparent font-bold text-inherit">
        {part.text}
      </mark>
    ) : (
      <span key={index}>{part.text}</span>
    ),
  )
}
