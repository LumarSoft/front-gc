'use client'

import { useState } from 'react'
import {
  argentineToday,
  type DayRange,
  isValidRange,
  lastRange,
  type LastUnit,
  type PeriodToDate,
  periodToDate,
  recentQuarters,
} from '@/src/features/admin/lib/date-range'

export type RangePreset = 'today' | 'yesterday' | 'last' | 'toDate' | 'quarter' | 'custom'
export type DraftRange = { from: string; to: string | null }
type LastSettings = { amount: string; unit: LastUnit; includeToday: boolean }

const monthOf = (day: string) => ({ year: Number(day.slice(0, 4)), month: Number(day.slice(5, 7)) - 1 })

/**
 * Draft of the range picker: presets, "Último N…", period to date, quarters or two clicks on the calendar. Nothing
 * reaches the page until "Aplicar"; "Cancelar" or closing drops the draft.
 */
export function useDateRangePicker(applied: DayRange, onApply: (range: DayRange) => void) {
  const today = argentineToday()
  const [open, setOpen] = useState(false)
  const [preset, setPreset] = useState<RangePreset>('last')
  const [draft, setDraft] = useState<DraftRange>(applied)
  const [last, setLast] = useState<LastSettings>({ amount: '30', unit: 'days', includeToday: true })
  const [period, setPeriod] = useState<PeriodToDate>('month')
  const [quarter, setQuarter] = useState(0)
  // The right-hand month on screen; the left one is the month before.
  const [visible, setVisible] = useState(monthOf(applied.to))
  const [hovered, setHovered] = useState<string | null>(null)

  const show = (range: DraftRange) => {
    setDraft(range)
    setVisible(monthOf(range.to ?? range.from))
  }

  const openPicker = (next: boolean) => {
    if (next) show(applied)
    setOpen(next)
  }

  const updateLast = (changes: Partial<LastSettings>) => {
    const settings = { ...last, ...changes }
    setLast(settings)
    setPreset('last')
    const amount = Number(settings.amount)
    if (Number.isInteger(amount) && amount > 0) show(lastRange(today, amount, settings.unit, settings.includeToday))
  }

  const choose = (next: RangePreset) => {
    setPreset(next)
    if (next === 'today') show({ from: today, to: today })
    if (next === 'yesterday') show(lastRange(today, 1, 'days', false))
    if (next === 'last') updateLast({})
    if (next === 'toDate') show(periodToDate(today, period))
    if (next === 'quarter') show(recentQuarters(today)[quarter].range)
  }

  const complete: DayRange | null = draft.to ? { from: draft.from, to: draft.to } : null

  return {
    today,
    open,
    setOpen: openPicker,
    preset,
    choose,
    draft,
    hovered,
    setHovered,
    last,
    updateLast,
    period,
    choosePeriod: (next: PeriodToDate) => {
      setPeriod(next)
      setPreset('toDate')
      show(periodToDate(today, next))
    },
    quarter,
    chooseQuarter: (index: number) => {
      setQuarter(index)
      setPreset('quarter')
      show(recentQuarters(today)[index].range)
    },
    /** First click starts a range, the second one closes it (in either order). */
    pickDay: (day: string) => {
      setPreset('custom')
      if (draft.to) setDraft({ from: day, to: null })
      else setDraft(day < draft.from ? { from: day, to: draft.from } : { from: draft.from, to: day })
    },
    visible,
    moveMonth: (offset: number) =>
      setVisible(current => {
        const date = new Date(Date.UTC(current.year, current.month + offset, 1))
        return { year: date.getUTCFullYear(), month: date.getUTCMonth() }
      }),
    canApply: Boolean(complete && isValidRange(complete, today)),
    apply: () => {
      if (!complete || !isValidRange(complete, today)) return
      onApply(complete)
      setOpen(false)
    },
  }
}

export type DateRangePickerState = ReturnType<typeof useDateRangePicker>
