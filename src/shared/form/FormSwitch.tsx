import { Controller, useFormContext } from 'react-hook-form'

import { Switch } from '@/components/ui/switch'

interface FormSwitchProps {
  name: string
  disabled?: boolean
}

export function FormSwitch({ name, disabled }: FormSwitchProps) {
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Switch
          checked={field.value}
          disabled={disabled}
          onChange={field.onChange}
          onCheckedChange={field.onChange}
          value={field.value}
        />
      )}
    />
  )
}
