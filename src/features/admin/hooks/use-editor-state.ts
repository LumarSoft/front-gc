'use client'

import { useState } from 'react'

type EditorState<TItem, TDraft> =
  { open: false } | { open: true; mode: 'create'; draft: TDraft } | { open: true; mode: 'edit'; item: TItem }

/** Which create/edit dialog is open and for what. `draft` presets fields on create (e.g. the parent category). */
export function useEditorState<TItem, TDraft = undefined>() {
  const [state, setState] = useState<EditorState<TItem, TDraft>>({ open: false })
  return {
    state,
    openCreate: (draft: TDraft) => setState({ open: true, mode: 'create', draft }),
    openEdit: (item: TItem) => setState({ open: true, mode: 'edit', item }),
    close: () => setState({ open: false }),
  }
}
