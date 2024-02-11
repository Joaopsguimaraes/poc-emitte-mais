import { type FormFields } from '@/@types/form-field'
import { type UseFormReturn } from 'react-hook-form'

import { cn } from '@/lib/utils'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { FormFieldDynamic } from './FormFieldDynamic'

interface RenderFieldProps<T> {
  form: UseFormReturn<T | any>
  slot: FormFields<any>
}

export function RenderField<T>({ form, slot }: RenderFieldProps<T>) {
  return (
    <FormField
      control={form.control}
      key={slot.name as string}
      name={slot.name as string}
      render={({ field }) => {
        return (
          <FormItem className={cn('className' in slot && slot.className)}>
            <FormLabel>
              {'translateKey' in slot ? slot.translateKey : null}
              {'optional' in slot && slot.optional ? ' (Opcional)' : ''}
            </FormLabel>
            <FormControl>
              <FormFieldDynamic<T> field={field} slot={slot} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}
