import { WarningIcon } from '@phosphor-icons/react/dist/ssr'
import { ToneBadge } from '@/src/features/admin/components/common/tone-badge'
import { BLOCKING_ISSUES, PRODUCT_ISSUE_LABELS } from '@/src/features/admin/lib/product-labels'
import type { ProductIssue } from '@/src/types/api/admin-products'

/** What the product still needs. Issues that block publishing are red; the rest are warnings. */
export function ProductIssueChips({ issues }: { issues: ProductIssue[] }) {
  if (issues.length === 0) return null
  return (
    <span className="flex flex-wrap gap-1">
      {issues.map(issue => (
        <ToneBadge key={issue} tone={BLOCKING_ISSUES.includes(issue) ? 'critical' : 'attention'} dot={false}>
          <WarningIcon className="size-3.5" />
          {PRODUCT_ISSUE_LABELS[issue]}
        </ToneBadge>
      ))}
    </span>
  )
}
