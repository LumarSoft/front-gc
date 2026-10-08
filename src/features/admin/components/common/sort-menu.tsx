'use client'

import { ArrowsDownUpIcon } from '@phosphor-icons/react'
import { Button } from '@/src/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu'

export type SortOption<T extends string> = { value: T; label: string }

type SortMenuProps<T extends string> = {
  options: SortOption<T>[]
  value: T
  onChange: (value: T) => void
}

/** Icon button with the list order. */
export function SortMenu<T extends string>({ options, value, onChange }: SortMenuProps<T>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Ordenar">
          <ArrowsDownUpIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuLabel>Ordenar por</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={value} onValueChange={next => onChange(next as T)}>
          {options.map(option => (
            <DropdownMenuRadioItem key={option.value} value={option.value}>
              {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
