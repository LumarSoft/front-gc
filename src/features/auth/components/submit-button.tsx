import { Button } from '@/src/components/ui/button'

type SubmitButtonProps = {
  isPending: boolean
  pendingLabel: string
  children: React.ReactNode
}

export function SubmitButton({ isPending, pendingLabel, children }: SubmitButtonProps) {
  return (
    <Button type="submit" size="lg" disabled={isPending} className="h-12 w-full rounded-full text-base font-bold">
      {isPending ? pendingLabel : children}
    </Button>
  )
}
