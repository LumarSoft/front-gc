type FavoritesMessageProps = {
  icon?: React.ReactNode
  title: string
  description: string
  action: React.ReactNode
}

export function FavoritesMessage({ icon, title, description, action }: FavoritesMessageProps) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-3xl bg-surface px-6 py-16 text-center">
      {icon && <div className="text-muted-foreground [&_svg]:size-10">{icon}</div>}
      <div>
        <p className="font-bold">{title}</p>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
      {action}
    </div>
  )
}
