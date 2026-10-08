'use client'

import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react'
import { Button } from '@/src/components/ui/button'

type ListPaginationProps = {
  page: number
  pageSize: number
  total: number
  totalPages: number
  onPageChange: (page: number) => void
}

/** "1–25 de 39" between previous/next. Hidden when everything fits in one page. */
export function ListPagination({ page, pageSize, total, totalPages, onPageChange }: ListPaginationProps) {
  if (totalPages <= 1) return null
  const from = (page - 1) * pageSize + 1
  const to = Math.min(page * pageSize, total)

  return (
    <nav aria-label="Paginación" className="flex items-center justify-center gap-1 border-t bg-table-head px-4 py-2">
      <Button
        variant="outline"
        size="icon-sm"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        aria-label="Página anterior"
      >
        <CaretLeftIcon />
      </Button>
      <span className="min-w-24 text-center text-sm text-muted-foreground tabular-nums">
        {from}–{to} de {total}
      </span>
      <Button
        variant="outline"
        size="icon-sm"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        aria-label="Página siguiente"
      >
        <CaretRightIcon />
      </Button>
    </nav>
  )
}
