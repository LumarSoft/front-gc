'use client'

import { useState } from 'react'
import { formatMoneyExact } from '@/src/lib/format'
import { deliveryPrice } from '../../lib/delivery-price'
import { quoteDescription, splitPickupPoint, type PickupGroup } from '../../lib/shipping-quote-display'
import { ChoiceOption } from '../choice-group'

const VISIBLE_BRANCHES = 3

type PickupQuoteGroupProps = {
  group: PickupGroup
  selectedId: number | null
  onSelect: (id: number) => void
}

/** Branch pickup of one carrier: one option that, once chosen, lists its branches to pick from. */
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
    <ChoiceOption
      name="shipping-method"
      value={group.key}
      checked={selected}
      onSelect={() => onSelect(cheapest.id)}
      title="Retiro en sucursal"
      description={quoteDescription(group.carrier, cheapest.minDays, cheapest.maxDays)}
      aside={samePrice ? deliveryPrice(cheapest.cost) : `desde ${formatMoneyExact(cheapest.cost)}`}
    >
      <fieldset>
        <legend className="mb-2 text-sm font-semibold">Elegí la sucursal</legend>
        <ul className="divide-y" aria-label={`Sucursales de ${group.carrier}`}>
          {visible.map(option => {
            const branch = splitPickupPoint(option.pickupPoint ?? option.service)
            return (
              <li key={option.id}>
                <label className="flex cursor-pointer gap-3 py-2.5">
                  <input
                    type="radio"
                    name="shipping-branch"
                    checked={option.id === selectedId}
                    onChange={() => onSelect(option.id)}
                    className="mt-0.5 size-4 shrink-0 accent-primary"
                  />
                  <span className="min-w-0 flex-1 text-sm">
                    <span className="block font-medium">{branch.name}</span>
                    {branch.address && <span className="block text-muted-foreground">{branch.address}</span>}
                  </span>
                  {!samePrice && <span className="text-sm tabular-nums">{formatMoneyExact(option.cost)}</span>}
                </label>
              </li>
            )
          })}
        </ul>
        {hidden > 0 && !expanded && (
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="mt-1 text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            Ver {hidden === 1 ? '1 sucursal más' : `${hidden} sucursales más`}
          </button>
        )}
      </fieldset>
    </ChoiceOption>
  )
}
