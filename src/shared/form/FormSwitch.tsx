import { Switch } from '@/components/ui/switch'
import { Controller, useFormContext } from 'react-hook-form'

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
          nonce={undefined}
          onChange={field.onChange}
          onCheckedChange={field.onChange}
          onResize={undefined}
          onResizeCapture={undefined}
          value={field.value}
        />
      )}
    />
  )
}
