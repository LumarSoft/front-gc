'use client'

import { useEffect, useState } from 'react'
import { MagnifyingGlassIcon } from '@phosphor-icons/react'
import { Input } from '@/src/components/ui/input'
import { useDebouncedValue } from '@/src/hooks/use-debounced-value'

type SearchInputProps = {
  value: string
  onSearch: (value: string) => void
  placeholder: string
  label: string
}

/** Search box that reports the term once the admin stops typing. */
export function SearchInput({ value, onSearch, placeholder, label }: SearchInputProps) {
  const [term, setTerm] = useState(value)
  const debounced = useDebouncedValue(term)

  // Filters cleared from outside ("Limpiar filtros"): empty the box. Other URL changes come from this box itself, and
  // syncing them back could drop keys typed while the URL was catching up. (React's "adjust state on prop change".)
  const [previousValue, setPreviousValue] = useState(value)
  if (value !== previousValue) {
    setPreviousValue(value)
    if (value === '') setTerm('')
  }

  useEffect(() => {
    if (debounced.trim() !== value) onSearch(debounced.trim())
    // Only the typed term triggers a search; `value` changes when the URL catches up.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced])

  return (
    <div className="relative">
      <MagnifyingGlassIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        aria-label={label}
        placeholder={placeholder}
        value={term}
        onChange={event => setTerm(event.target.value)}
        className="bg-background pl-9"
      />
    </div>
  )
}
