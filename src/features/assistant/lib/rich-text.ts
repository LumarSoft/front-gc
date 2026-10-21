/**
 * The small formatting the assistant writes: paragraphs, "- " or "1." lists, **bold** and links to store pages
 * ([texto](/ruta)). Parsed into data, never into HTML, so nothing the model writes can inject markup.
 */
export type Inline =
  | { type: 'text'; text: string }
  | { type: 'strong'; text: string }
  | { type: 'link'; text: string; href: string }
  | { type: 'break' }

export type Block = { type: 'paragraph'; content: Inline[] } | { type: 'list'; ordered: boolean; items: Inline[][] }

const LIST_ITEM = /^\s*(?:([-*•])|(\d+)[.)])\s+(.*)$/
const INLINE = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g

/** Only the store's own pages: "/productos/x" yes; "https://…", "//host" or "javascript:" no. */
export function isStorePath(href: string): boolean {
  return /^\/(?!\/)[\w\-/?=&#%.]*$/.test(href)
}

export function parseInline(text: string): Inline[] {
  const content: Inline[] = []
  let last = 0
  for (const match of text.matchAll(INLINE)) {
    if (match.index > last) content.push({ type: 'text', text: text.slice(last, match.index) })
    if (match[1] !== undefined) content.push({ type: 'strong', text: match[1] })
    else if (isStorePath(match[3])) content.push({ type: 'link', text: match[2], href: match[3] })
    else content.push({ type: 'text', text: match[2] })
    last = match.index + match[0].length
  }
  if (last < text.length) content.push({ type: 'text', text: text.slice(last) })
  return content
}

export function parseRichText(text: string): Block[] {
  const blocks: Block[] = []
  let paragraph: string[] = []

  const closeParagraph = (): void => {
    if (!paragraph.length) return
    const content = paragraph.flatMap((line, index) => [
      ...(index ? [{ type: 'break' as const }] : []),
      ...parseInline(line),
    ])
    blocks.push({ type: 'paragraph', content })
    paragraph = []
  }

  for (const raw of text.split('\n')) {
    // Headings are not part of the assistant's style: keep their text as a plain line.
    const line = raw.replace(/^#{1,6}\s+/, '').trimEnd()
    const item = LIST_ITEM.exec(line)
    if (item) {
      closeParagraph()
      const ordered = item[2] !== undefined
      const previous = blocks.at(-1)
      if (previous?.type === 'list' && previous.ordered === ordered) previous.items.push(parseInline(item[3]))
      else blocks.push({ type: 'list', ordered, items: [parseInline(item[3])] })
    } else if (line.trim()) paragraph.push(line.trim())
    else closeParagraph()
  }
  closeParagraph()
  return blocks
}
