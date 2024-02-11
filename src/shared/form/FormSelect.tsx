import { OptionsField } from '@/@types/options-field'
import { SelectProps } from '@radix-ui/react-select'
import { useFormContext } from 'react-hook-form'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type FormSelectProps = SelectProps & {
  name: string
  label: string
  disabled?: boolean
  options: OptionsField[]
  helperText?: string
  placeholder?: string
  onInputChange?: (event: any) => void
}

export function FormSelect({
  name,
  label,
  options,
  placeholder,
  onInputChange,
}: FormSelectProps) {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Select
              onValueChange={(event: string) => {
                onInputChange && onInputChange(event)
                field.onChange(event)
              }}
            >
              <SelectTrigger className="h-12">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup className="max-h-52">
                  {options.map((item, index) => {
                    return (
                      <SelectItem key={index} value={String(item.value)}>
                        {item.label}
                      </SelectItem>
                    )
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
