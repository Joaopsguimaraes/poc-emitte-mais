import { type ReactNode } from 'react'
import { type FormFieldsConstant } from '@/@types/form-field'
import { type UseFormReturn } from 'react-hook-form'

import { cn } from '@/lib/utils'
import { Form } from '@/components/ui/form'

import { RenderField } from './RenderField'

type Props<T> = {
  form: UseFormReturn<T | any>
  constant: FormFieldsConstant<T | any>
  onSubmit?: (data: any) => void
  children?: ReactNode
  className?: string
}

export function FormRender<T>({
  constant,
  form,
  onSubmit,
  children,
  className,
}: Props<T>) {
  return (
    <Form {...form}>
      <form
        className={cn(className, 'space-y-4')}
        onSubmit={form.handleSubmit((data) => onSubmit?.(data))}
      >
        {constant.map((slot, key) =>
          Array.isArray(slot) ? (
            <div
              className="grid w-full grid-cols-12 gap-4"
              key={key}
            >
              {slot.map((s) => (
                <RenderField<T> form={form} key={s.name as string} slot={s} />
              ))}
            </div>
          ) : null
        )}
        {children}
      </form>
    </Form>
  )
}
