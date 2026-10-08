import type { FieldValues, UseFormReturn } from 'react-hook-form'

/**
 * Validates a react-hook-form and, when valid, returns a sender bound to the values parsed right now (resolver
 * output). False when a field is wrong (they are marked). Sending later uses those values even if the form was reset.
 */
export function prepareForm<TValues extends FieldValues, TParsed = TValues>(
  form: UseFormReturn<TValues, unknown, TParsed>,
  send: (values: TParsed) => Promise<unknown>,
): Promise<(() => Promise<unknown>) | false> {
  return new Promise(resolve => {
    void form.handleSubmit(
      values => resolve(() => send(values)),
      () => resolve(false),
    )()
  })
}
