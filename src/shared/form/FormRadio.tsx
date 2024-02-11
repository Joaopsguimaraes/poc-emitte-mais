import {
  RadioGroupIndicator,
  RadioGroupProps,
} from '@radix-ui/react-radio-group'
import { Controller, useFormContext } from 'react-hook-form'

import { cn } from '@/lib/utils'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

interface Props extends RadioGroupProps {
  name: string
  disabled?: boolean
  options: any[]
}

export function FormRadio({ name, disabled, options, ...rest }: Props) {
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <RadioGroup
          disabled={disabled}
          onBlur={field.onBlur}
          onValueChange={field.onChange}
          value={field.value}
          {...rest}
        >
          <div className={'flex w-full items-center justify-start gap-4'}>
            {options.map((item) => (
              <div
                className="my-2 flex w-full items-center justify-start gap-4 "
                key={item.value}
              >
                <RadioGroupItem value={item.value}>
                  <RadioGroupIndicator />
                </RadioGroupItem>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </RadioGroup>
      )}
    />
  )
}
