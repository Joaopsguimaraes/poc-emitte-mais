import { useFormContext } from 'react-hook-form'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface FormInputProps<T> {
  name: keyof T
  label: string
  multiline?: boolean
  disabled?: boolean
  placeholder?: string
  type?: string
  className?: string
}

export function FormInput<T>({
  name,
  label,
  multiline,
  placeholder,
  disabled,
  type,
  className
}: FormInputProps<T>) {
  const { control } = useFormContext<T | any>()

  return (
    <FormField
      control={control}
      name={name as string}
      render={({ field }) => (
        <FormItem className="flex w-full flex-col gap-2">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              className={cn("h-12 bg-white dark:bg-black", className)}
              type={type}
              disabled={disabled}
              multiple={multiline}
              onChange={field.onChange}
              placeholder={placeholder}
              value={field.value}
              width="full"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
