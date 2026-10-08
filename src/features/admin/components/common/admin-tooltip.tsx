'use client'

import { Tooltip as TooltipPrimitive } from 'radix-ui'
import { RAIL_POPOVER_OFFSET } from '@/src/features/admin/lib/admin-nav'
import { cn } from '@/src/lib/utils'

type AdminTooltipProps = {
  label: string
  /** Keys shown as small chips after the label (["⌘", "B"]). */
  shortcut?: string[]
  /** Waiting work next to the label (folded nav: the corner counter is small). */
  count?: number
  side?: 'top' | 'right' | 'bottom' | 'left'
  /** Off when the label is already visible (expanded sidebar). */
  disabled?: boolean
  children: React.ReactElement
}

/** Navigation tooltips on the dark frame: quick to appear (80 ms, then instant between neighbours), short fade. */
export function AdminTooltip({
  label,
  shortcut,
  count,
  side = 'right',
  disabled = false,
  children,
}: AdminTooltipProps) {
  if (disabled) return children
  return (
    <TooltipPrimitive.Root delayDuration={80}>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          side={side}
          sideOffset={side === 'right' ? RAIL_POPOVER_OFFSET : 8}
          className={cn(
            'z-50 flex origin-(--radix-tooltip-content-transform-origin) items-center gap-2 rounded-lg bg-frame-popover px-2.5 py-1.5 text-xs font-medium text-white shadow-xl ring-1 ring-white/12',
            'duration-150 data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-closed:animate-out data-closed:fade-out-0',
            'data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1',
            'motion-reduce:animate-none',
          )}
        >
          {label}
          {Boolean(count) && (
            <span className="rounded-md bg-white/12 px-1.5 text-xs tabular-nums">{count} por atender</span>
          )}
          {shortcut && (
            <span className="flex gap-0.5">
              {shortcut.map(key => (
                <kbd
                  key={key}
                  className="grid h-5 min-w-5 place-items-center rounded-md bg-white/10 px-1 font-sans text-xs text-frame-foreground"
                >
                  {key}
                </kbd>
              ))}
            </span>
          )}
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  )
}
