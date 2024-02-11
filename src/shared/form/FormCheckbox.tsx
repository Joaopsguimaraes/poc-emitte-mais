import { Controller, useFormContext } from 'react-hook-form'

import { Checkbox } from '@/components/ui/checkbox'

interface FormCheckboxProps {
  name: string
  label: string
  disabled?: boolean
}

export function FormCheckbox({ name, label, disabled }: FormCheckboxProps) {
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className="flex w-full items-center gap-4">
          <Checkbox
            checked={field.value}
            disabled={disabled}
            onCheckedChange={(value): void => {
              field.onChange(value)
            }}
          />
          <p aria-label={label}>{label}</p>
        </div>
      )}
    />
  )
}
