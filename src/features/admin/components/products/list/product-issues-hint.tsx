'use client'

import { WarningCircleIcon } from '@phosphor-icons/react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/src/components/ui/tooltip'
import { BLOCKING_ISSUES, PRODUCT_ISSUE_LABELS } from '@/src/features/admin/lib/product-labels'
import { cn } from '@/src/lib/utils'
import type { ProductIssue } from '@/src/types/api/admin-products'

/** Compact "needs attention" mark for dense rows; the tooltip says what is missing. */
export function ProductIssuesHint({ issues }: { issues: ProductIssue[] }) {
  if (issues.length === 0) return null
  const blocking = issues.some(issue => BLOCKING_ISSUES.includes(issue))
  const summary = issues.map(issue => PRODUCT_ISSUE_LABELS[issue]).join(' · ')

  return (
    <Tooltip>
      <TooltipTrigger
        aria-label={summary}
        // Above the row link, so hovering or focusing the mark does not open the product.
        className={cn(
          'relative z-10 grid size-6 place-items-center rounded-md hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
          blocking ? 'text-destructive' : 'text-warning',
        )}
      >
        <WarningCircleIcon weight="fill" className="size-4" />
      </TooltipTrigger>
      <TooltipContent>{summary}</TooltipContent>
    </Tooltip>
  )
}
