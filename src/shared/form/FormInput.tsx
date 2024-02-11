import { useFormContext } from 'react-hook-form'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

interface FormInputProps {
  name: string
  label: string
  multiline?: boolean
  disabled?: boolean
  placeholder?: string
}

export function FormInput({
  name,
  label,
  multiline,
  placeholder,
  disabled,
}: FormInputProps) {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex w-full flex-col gap-2">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              className="h-12 bg-white dark:bg-black"
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
