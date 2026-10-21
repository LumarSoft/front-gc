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
  // Each character is folded on its own and remembers where it came from, so matches map back to `text` exactly.
  const chars = [...text]
  const origin: number[] = []
  let folded = ''
  chars.forEach((char, index) => {
    for (const piece of fold(char)) {
      folded += piece
      origin.push(index)
    }
  })
  const marks = new Array<boolean>(chars.length).fill(false)
  for (const word of words)
    for (let at = folded.indexOf(word); at !== -1; at = folded.indexOf(word, at + word.length))
      for (let index = at; index < at + word.length; index++) marks[origin[index]] = true
  const parts: HighlightPart[] = []
  chars.forEach((char, index) => {
    // A separate accent mark goes with the letter before it.
    if (index > 0 && !fold(char)) marks[index] = marks[index - 1]
    const last = parts.at(-1)
    if (last && last.match === marks[index]) last.text += char
    else parts.push({ text: char, match: marks[index] })
  })
  return parts
}
