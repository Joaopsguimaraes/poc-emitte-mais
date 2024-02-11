import { OptionsField } from '@/@types/options-field'
import { Controller, useFormContext } from 'react-hook-form'

import { Checkbox } from '@/components/ui/checkbox'

interface FormCheckboxProps {
  name: string
  options: OptionsField[]
  disabled?: boolean
}

export function FormCheckboxOptions({
  name,
  options,
  disabled,
}: FormCheckboxProps) {
  const { control } = useFormContext()
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <div className="flex w-full flex-col items-center gap-4">
            {options.map((item) => (
              <div
                className="flex w-full items-center justify-start gap-4"
                key={item.value}
              >
                <Checkbox
                  checked={field.value.includes(item.value)}
                  disabled={disabled}
                  onCheckedChange={(): void => {
                    if (field.value.includes(item.value)) {
                      field.onChange(
                        field.value.filter(
                          (i: string | number) => i !== item.value
                        )
                      )
                    } else {
                      field.onChange([...field.value, item.value])
                    }
                  }}
                />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        )
      }}
    />
  )
}
