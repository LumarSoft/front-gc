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

/** "1–25 de 39" with previous/next. Hidden when everything fits in one page. */
export function ListPagination({ page, pageSize, total, totalPages, onPageChange }: ListPaginationProps) {
  if (totalPages <= 1) return null
  const from = (page - 1) * pageSize + 1
  const to = Math.min(page * pageSize, total)

  return (
    <nav aria-label="Paginación" className="flex items-center justify-between gap-3 border-t px-4 py-3 text-sm">
      <span className="text-muted-foreground tabular-nums">
        {from}–{to} de {total}
      </span>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
          <CaretLeftIcon />
          Anterior
        </Button>
        <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => onPageChange(page + 1)}>
          Siguiente
          <CaretRightIcon />
        </Button>
      </div>
    </nav>
  )
}
