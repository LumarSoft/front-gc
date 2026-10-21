/** The customer's last searches, kept in this browser only. */
const STORAGE_KEY = 'cg_recent_searches'
const MAX_RECENT = 5
const CHANGED = 'cg:recent-searches'

/** The saved list as stored (a JSON array), so React can compare snapshots as strings. */
export function readRecentSearches(): string {
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? '[]'
  } catch {
    // Private mode or storage blocked: the box just shows no recent searches.
    return '[]'
  }
}

export function parseRecentSearches(raw: string): string[] {
  try {
    const value: unknown = JSON.parse(raw)
    return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : []
  } catch {
    return []
  }
}

/** Puts a search first (once, case aside) and keeps the last five. */
export function withRecentSearch(list: string[], query: string): string[] {
  const text = query.trim()
  if (!text) return list
  return [text, ...list.filter(item => item.toLowerCase() !== text.toLowerCase())].slice(0, MAX_RECENT)
}

export function writeRecentSearches(list: string[]): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  } catch {
    // Not saved: nothing else depends on it.
  }
  window.dispatchEvent(new Event(CHANGED))
}

/** Changes from this tab (the custom event) and from others (`storage`). */
export function subscribeRecentSearches(onChange: () => void): () => void {
  window.addEventListener(CHANGED, onChange)
  window.addEventListener('storage', onChange)
  return () => {
    window.removeEventListener(CHANGED, onChange)
    window.removeEventListener('storage', onChange)
  }
}
