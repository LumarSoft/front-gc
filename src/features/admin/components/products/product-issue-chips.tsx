import { WarningIcon } from '@phosphor-icons/react/dist/ssr'
import { BLOCKING_ISSUES, PRODUCT_ISSUE_LABELS } from '@/src/features/admin/lib/product-labels'
import { cn } from '@/src/lib/utils'
import type { ProductIssue } from '@/src/types/api/admin-products'

/** What the product still needs. Issues that block publishing are red; the rest are warnings. */
export function ProductIssueChips({ issues }: { issues: ProductIssue[] }) {
  if (issues.length === 0) return null
  return (
    <span className="flex flex-wrap gap-1">
      {issues.map(issue => (
        <span
          key={issue}
          className={cn(
            'inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-xs',
            BLOCKING_ISSUES.includes(issue) ? 'bg-destructive/10 text-destructive' : 'bg-warning/10 text-warning',
          )}
        >
          <WarningIcon className="size-3.5" />
          {PRODUCT_ISSUE_LABELS[issue]}
        </span>
      ))}
    </span>
  )
}
