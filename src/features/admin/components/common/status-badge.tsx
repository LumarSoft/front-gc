import { ToneBadge } from '@/src/features/admin/components/common/tone-badge'

type StatusBadgeProps = {
  active: boolean
  activeLabel?: string
  inactiveLabel?: string
}

/** Active / inactive state of a catalog item. */
export function StatusBadge({ active, activeLabel = 'Activa', inactiveLabel = 'Inactiva' }: StatusBadgeProps) {
  return <ToneBadge tone={active ? 'success' : 'neutral'}>{active ? activeLabel : inactiveLabel}</ToneBadge>
}
