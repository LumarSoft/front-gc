import { cn } from '@/src/lib/utils'

/** Options joined in one bordered box (delivery mode, shipping methods, payment), like a store checkout. */
export function ChoiceGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <fieldset className="overflow-hidden rounded-lg border border-input">
      <legend className="sr-only">{label}</legend>
      <div className="divide-y divide-input">{children}</div>
    </fieldset>
  )
}

type ChoiceOptionProps = {
  name: string
  value: string
  checked: boolean
  onSelect: () => void
  title: React.ReactNode
  description?: React.ReactNode
  /** Price or icon on the right. */
  aside?: React.ReactNode
  disabled?: boolean
  inputRef?: React.Ref<HTMLInputElement>
  /** Shown under the option while it is selected (branches, payment details). */
  children?: React.ReactNode
}

/** One option: the whole row is the label of its radio; the selected one is outlined and can expand. */
export function ChoiceOption({
  name,
  value,
  checked,
  onSelect,
  title,
  description,
  aside,
  disabled = false,
  inputRef,
  children,
}: ChoiceOptionProps) {
  return (
    // The rounded ends follow the group's corners, so the selected outline never shows square corners.
    <div
      className={cn(
        'relative first:rounded-t-lg last:rounded-b-lg',
        checked && 'z-10 bg-accent/40 outline-1 -outline-offset-1 outline-primary',
      )}
    >
      <label
        className={cn(
          'flex items-start gap-3 px-4 py-3.5',
          disabled ? 'cursor-not-allowed text-muted-foreground' : 'cursor-pointer',
        )}
      >
        <input
          ref={inputRef}
          type="radio"
          name={name}
          value={value}
          checked={checked}
          disabled={disabled}
          onChange={onSelect}
          className="mt-0.5 size-4.5 shrink-0 accent-primary"
        />
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-semibold">{title}</span>
          {description && <span className="mt-0.5 block text-sm text-muted-foreground">{description}</span>}
        </span>
        {aside && <span className="shrink-0 text-sm font-semibold tabular-nums">{aside}</span>}
      </label>
      {checked && children && <div className="border-t border-input px-4 py-3.5">{children}</div>}
    </div>
  )
}
