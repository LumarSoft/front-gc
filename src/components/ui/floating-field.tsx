import * as React from 'react'
import { ChevronDownIcon } from 'lucide-react'
import { cn } from '@/src/lib/utils'

/** Shared look: the label sits inside the control and moves up once there is a value or focus (checkout style). */
const CONTROL =
  'peer h-13 w-full min-w-0 bg-background px-3 pt-5 pb-1.5 text-base outline-none transition-shadow md:text-sm focus-visible:relative focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring aria-invalid:relative aria-invalid:ring-2 aria-invalid:ring-inset aria-invalid:ring-destructive disabled:cursor-not-allowed disabled:opacity-60'
const STANDALONE = 'rounded-lg border border-input'
const LABEL =
  'pointer-events-none absolute top-1.5 left-3 z-20 text-xs text-muted-foreground transition-all motion-reduce:transition-none'

type FloatingInputProps = React.ComponentProps<'input'> & {
  label: string
  /** Inside a `FieldGroup`: no own border, the group draws them. */
  grouped?: boolean
}

/** Text input whose label floats: placeholder-sized while empty, small on top once typed or focused. */
export function FloatingInput({ id, label, grouped = false, className, ...props }: FloatingInputProps) {
  return (
    <div className="relative">
      <input id={id} placeholder=" " className={cn(CONTROL, !grouped && STANDALONE, className)} {...props} />
      <label
        htmlFor={id}
        className={cn(
          LABEL,
          'peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:md:text-sm',
          'peer-focus:top-1.5 peer-focus:translate-y-0 peer-focus:text-xs',
        )}
      >
        {label}
      </label>
    </div>
  )
}

type FloatingSelectProps = React.ComponentProps<'select'> & { label: string; grouped?: boolean }

/** Native select (system picker on phones) with its label always on top, like the inputs once filled. */
export function FloatingSelect({ id, label, grouped = false, className, children, ...props }: FloatingSelectProps) {
  return (
    <div className="relative">
      <select id={id} className={cn(CONTROL, 'appearance-none pr-9', !grouped && STANDALONE, className)} {...props}>
        {children}
      </select>
      <label htmlFor={id} className={LABEL}>
        {label}
      </label>
      <ChevronDownIcon
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-3 z-20 size-4 -translate-y-1/2 text-muted-foreground"
      />
    </div>
  )
}

/** Controls joined in one bordered box, one row per child; a row can hold several controls side by side. */
export function FieldGroup({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn('divide-y divide-input overflow-hidden rounded-lg border border-input', className)}>
      {children}
    </div>
  )
}

/** A row of a `FieldGroup`: stacked on phones (`stack`) or always side by side. */
export function FieldRow({
  stack = false,
  className,
  children,
}: {
  stack?: boolean
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        'grid divide-input',
        stack
          ? 'divide-y sm:auto-cols-fr sm:grid-flow-col sm:divide-x sm:divide-y-0'
          : 'auto-cols-fr grid-flow-col divide-x',
        className,
      )}
    >
      {children}
    </div>
  )
}
