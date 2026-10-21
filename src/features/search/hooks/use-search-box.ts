'use client'

import { useId, useState, type KeyboardEvent, type RefObject } from 'react'
import { usePopularSearches } from '@/src/features/search/hooks/use-popular-searches'
import { useRecentSearches } from '@/src/features/search/hooks/use-recent-searches'
import { useSearchActions } from '@/src/features/search/hooks/use-search-actions'
import { useSearchSuggestions } from '@/src/features/search/hooks/use-search-suggestions'
import { buildSearchView, stepOption, type SearchOption } from '@/src/features/search/lib/search-view'

/**
 * The search box as an ARIA combobox: the typed text, whether its panel is open, the option the arrow keys are on,
 * and what Enter, Escape and picking an option do. `inputRef` is the text field, left once something is picked.
 */
export function useSearchBox(initialQuery: string, inputRef: RefObject<HTMLInputElement | null>) {
  const [term, setTerm] = useState(initialQuery)
  const [isOpen, setIsOpen] = useState(false)
  const [activeId, setActiveId] = useState<string | null>(null)
  const listboxId = useId()
  const recent = useRecentSearches()
  const popular = usePopularSearches(isOpen)
  const suggestions = useSearchSuggestions(term, isOpen)
  const actions = useSearchActions()

  const view = buildSearchView({
    term,
    suggestions: suggestions.data,
    failed: suggestions.isError,
    recent: recent.searches,
    popular: popular.data ?? [],
  })
  const options = view.sections.flatMap(section => section.options)
  // An option that left the list (new results) is simply no longer active.
  const active = options.find(option => option.id === activeId) ?? null
  const optionId = (id: string): string => `${listboxId}-${id}`

  const open = (): void => setIsOpen(true)
  const close = (): void => {
    setIsOpen(false)
    setActiveId(null)
  }
  const done = (): void => {
    close()
    inputRef.current?.blur()
  }

  const change = (value: string): void => {
    setTerm(value)
    setActiveId(null)
    setIsOpen(true)
  }

  const choose = (option: SearchOption, navigate: boolean): void => {
    actions.choose(option, view.term, navigate)
    done()
  }

  const submit = (): void => {
    actions.search(view.term)
    done()
  }

  const move = (step: 1 | -1): void => {
    const next = stepOption(options, active, step)
    setActiveId(next?.id ?? null)
    if (next) document.getElementById(optionId(next.id))?.scrollIntoView({ block: 'nearest' })
  }

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.nativeEvent.isComposing) return
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      if (isOpen) move(event.key === 'ArrowDown' ? 1 : -1)
      else open()
    } else if (event.key === 'Enter' && isOpen && active) {
      // Without an active option, Enter submits the form: the full results page.
      event.preventDefault()
      choose(active, true)
    } else if (event.key === 'Escape') {
      event.preventDefault()
      if (isOpen) close()
      else setTerm('')
    } else if (event.key === 'Tab') {
      close()
    }
  }

  return {
    term,
    change,
    isOpen,
    open,
    close,
    view,
    activeId: active?.id ?? null,
    setActiveId,
    optionId,
    listboxId,
    choose,
    submit,
    onKeyDown,
    clearRecent: recent.clear,
  }
}

export type SearchBox = ReturnType<typeof useSearchBox>
