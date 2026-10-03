import { AccountCard } from '@/src/features/account/components/account-card'
import type { AuthUser } from '@/src/types/api/auth'

type ProfileCardProps = {
  user: AuthUser
}

export function ProfileCard({ user }: ProfileCardProps) {
  const rows = [
    { label: 'Nombre', value: `${user.firstName} ${user.lastName}` },
    { label: 'Email', value: user.email },
    { label: 'Teléfono', value: user.phone ?? '—' },
  ]

  return (
    <AccountCard title="Mis datos">
      <dl className="grid grid-cols-3 gap-y-2 text-sm">
        {rows.map(row => (
          <div key={row.label} className="contents">
            <dt className="text-muted-foreground">{row.label}</dt>
            <dd className="col-span-2 truncate font-medium">{row.value}</dd>
          </div>
        ))}
      </dl>
    </AccountCard>
  )
}
