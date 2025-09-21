'use client'

import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { Slot } from '@radix-ui/react-slot'
import * as RHF from 'react-hook-form'

import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'

/* Alias FormProvider to Form (compat via namespace import) */
const Form = (RHF as any).FormProvider as React.ComponentType<any>

/* ----------------------------- FormField context ----------------------------- */

type FormFieldContextValue<TName extends string = string> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue | null>(null)

/* Minimal Controller props to avoid depending on RHF types */
type ControllerPropsLite<TName extends string = string> = {
  name: TName
  control?: any
  rules?: any
  defaultValue?: any
  shouldUnregister?: boolean
  render: (args: any) => React.ReactNode
}

function FormField<TName extends string = string>(props: ControllerPropsLite<TName>) {
  const ControllerComp = (RHF as any).Controller as React.ComponentType<any>
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <ControllerComp {...props} />
    </FormFieldContext.Provider>
  )
}

/* ------------------------------ FormItem context ----------------------------- */

type FormItemContextValue = {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue | null>(null)

/* ----------------------------------- Hook ----------------------------------- */

function useFormField() {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const methods = (RHF as any).useFormContext?.()

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>')
  }
  if (!itemContext) {
    throw new Error('useFormField should be used within <FormItem>')
  }
  if (!methods) {
    throw new Error('react-hook-form context not found. Wrap your form in <FormProvider>.')
  }

  const { getFieldState, formState } = methods
  const fieldState = getFieldState(fieldContext.name, formState)

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

/* --------------------------------- Components -------------------------------- */

function FormItem({ className, ...props }: React.ComponentProps<'div'>) {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div
        data-slot="form-item"
        className={cn('grid gap-2', className)}
        {...props}
      />
    </FormItemContext.Provider>
  )
}

function FormLabel({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  const { error, formItemId } = useFormField()

  return (
    <Label
      data-slot="form-label"
      data-error={!!error}
      className={cn('data-[error=true]:text-destructive', className)}
      htmlFor={formItemId}
      {...props}
    />
  )
}

function FormControl({ ...props }: React.ComponentProps<typeof Slot>) {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  const describedBy = error
    ? `${formDescriptionId} ${formMessageId}`
    : `${formDescriptionId}`

  return (
    <Slot
      data-slot="form-control"
      id={formItemId}
      aria-describedby={describedBy}
      aria-invalid={!!error}
      {...props}
    />
  )
}

function FormDescription({ className, ...props }: React.ComponentProps<'p'>) {
  const { formDescriptionId } = useFormField()

  return (
    <p
      data-slot="form-description"
      id={formDescriptionId}
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  )
}

function FormMessage({ className, ...props }: React.ComponentProps<'p'>) {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message ?? '') : props.children

  if (!body) return null

  return (
    <p
      data-slot="form-message"
      id={formMessageId}
      className={cn('text-destructive text-sm', className)}
      {...props}
    >
      {body}
    </p>
  )
}

/* ---------------------------------- Exports ---------------------------------- */

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
}