'use client'

import type { Ref } from 'react'
import { Input } from '@/src/components/ui/input'
import type { SearchBox } from '@/src/features/search/hooks/use-search-box'
import { cn } from '@/src/lib/utils'

type SearchInputProps = {
  box: SearchBox
  inputRef: Ref<HTMLInputElement>
  id: string
  className?: string
}

/** The text field of the search box: the combobox that controls the suggestions list. */
export function SearchInput({ box, inputRef, id, className }: SearchInputProps) {
  return (
    <Input
      ref={inputRef}
      id={id}
      name="q"
      type="search"
      role="combobox"
      aria-expanded={box.isOpen}
      aria-controls={box.listboxId}
      aria-autocomplete="list"
      aria-activedescendant={box.activeId ? box.optionId(box.activeId) : undefined}
      autoComplete="off"
      autoCorrect="off"
      spellCheck={false}
      enterKeyHint="search"
      maxLength={100}
      placeholder="¿Qué estás buscando?"
      value={box.term}
      onChange={event => box.change(event.target.value)}
      onFocus={box.open}
      onKeyDown={box.onKeyDown}
      className={cn('[&::-webkit-search-cancel-button]:appearance-none', className)}
    />
  )
}
