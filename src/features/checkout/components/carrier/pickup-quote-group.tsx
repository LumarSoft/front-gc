'use client'

import { useState } from 'react'
import { cn } from '@/src/lib/utils'
import { splitPickupPoint, type PickupGroup } from '../../lib/shipping-quote-display'
import { formatMoneyExact } from '@/src/lib/format'
import { QuoteOptionHeading } from './quote-option-heading'
import { QuoteRadio } from './quote-radio'

const VISIBLE_BRANCHES = 3

type PickupQuoteGroupProps = {
  group: PickupGroup
  selectedId: number | null
  onSelect: (id: number) => void
}

/** Branch pickup of one carrier: a single option whose choice is the branch. */
export function PickupQuoteGroup({ group, selectedId, onSelect }: PickupQuoteGroupProps) {
  const [expanded, setExpanded] = useState(false)
  const selected = group.options.some(option => option.id === selectedId)
  const cheapest = group.options.reduce((low, option) =>
    Number(option.cost.amount) < Number(low.cost.amount) ? option : low,
  )
  const samePrice = group.options.every(option => option.cost.amount === cheapest.cost.amount)
  const hidden = group.options.length - VISIBLE_BRANCHES
  const visible = expanded || hidden <= 0 ? group.options : group.options.slice(0, VISIBLE_BRANCHES)
  return (
    <div className={cn('rounded-2xl border p-4', selected && 'border-primary bg-primary/5')}>
      <div className="pl-7">
        <QuoteOptionHeading
          title="Retiro en sucursal"
          carrier={group.carrier}
          minDays={cheapest.minDays}
          maxDays={cheapest.maxDays}
          cost={cheapest.cost}
          fromPrice={!samePrice}
        />
      </div>
      <ul className="mt-3 divide-y border-t" aria-label={`Sucursales de ${group.carrier}`}>
        {visible.map(option => {
          const branch = splitPickupPoint(option.pickupPoint ?? option.service)
          return (
            <li key={option.id}>
              <QuoteRadio checked={option.id === selectedId} onSelect={() => onSelect(option.id)} className="py-3">
                <span className="block text-sm font-semibold">{branch.name}</span>
                {branch.address && <span className="block text-sm text-muted-foreground">{branch.address}</span>}
                {!samePrice && <span className="mt-1 block text-sm tabular-nums">{formatMoneyExact(option.cost)}</span>}
              </QuoteRadio>
            </li>
          )
        })}
      </ul>
      {hidden > 0 && !expanded && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="mt-1 pl-7 text-sm font-semibold text-primary underline-offset-4 hover:underline"
        >
          Ver {hidden === 1 ? '1 sucursal más' : `${hidden} sucursales más`}
        </button>
      )}
    </div>
  )
}
