/** A piece of text and whether it is part of what the customer typed. */
export type HighlightPart = { text: string; match: boolean }

const fold = (text: string): string => text.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase()

/**
 * Splits `text` into the parts that match the typed words and the rest, ignoring case and accents ("impresora" in
 * "Impresora Fotográfica"), so the matches can be shown in bold. Words of one letter are not highlighted.
 */
export function highlightParts(text: string, query: string): HighlightPart[] {
  const words = [...new Set(fold(query).split(/[^\p{L}\p{N}]+/u))].filter(word => word.length > 1)
  if (!words.length) return [{ text, match: false }]
  // Folding keeps one character per letter here (the store's names use precomposed accents), so indexes line up.
  const folded = fold(text)
  const marks = new Array<boolean>(text.length).fill(false)
  for (const word of words)
    for (let at = folded.indexOf(word); at !== -1; at = folded.indexOf(word, at + word.length))
      marks.fill(true, at, at + word.length)
  const parts: HighlightPart[] = []
  for (let index = 0; index < text.length; index++) {
    const last = parts.at(-1)
    if (last && last.match === marks[index]) last.text += text[index]
    else parts.push({ text: text[index], match: marks[index] })
  }
  return parts
}
