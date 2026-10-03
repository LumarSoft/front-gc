'use client'

import { useState } from 'react'
import { EyeIcon, EyeSlashIcon } from '@phosphor-icons/react'
import { Input } from '@/src/components/ui/input'
import { cn } from '@/src/lib/utils'

type PasswordInputProps = Omit<React.ComponentProps<typeof Input>, 'type'>

export function PasswordInput({ className, ...props }: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false)
  const Icon = isVisible ? EyeSlashIcon : EyeIcon

  return (
    <div className="relative">
      <Input type={isVisible ? 'text' : 'password'} className={cn('pr-12', className)} {...props} />
      <button
        type="button"
        onClick={() => setIsVisible(visible => !visible)}
        aria-label={isVisible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
        aria-pressed={isVisible}
        className="absolute top-1/2 right-1.5 grid size-9 -translate-y-1/2 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <Icon weight="light" className="size-5" aria-hidden />
      </button>
    </div>
  )
}
