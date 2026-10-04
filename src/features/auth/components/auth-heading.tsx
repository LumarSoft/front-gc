type AuthHeadingProps = {
  title: string
  description?: React.ReactNode
}

export function AuthHeading({ title, description }: AuthHeadingProps) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-extrabold tracking-tight text-balance">{title}</h1>
      {description && <p className="mt-2 text-muted-foreground">{description}</p>}
    </div>
  )
}
