/** Moves `id` one place up or down in `ids`. Returns null when it is already at that edge. */
export function moveId(ids: number[], id: number, direction: 'up' | 'down'): number[] | null {
  const from = ids.indexOf(id)
  const to = direction === 'up' ? from - 1 : from + 1
  if (from === -1 || to < 0 || to >= ids.length) return null
  const next = [...ids]
  ;[next[from], next[to]] = [next[to], next[from]]
  return next
}
