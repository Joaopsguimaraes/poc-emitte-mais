import { format } from 'date-fns'
import { pt } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'
import { useFormContext } from 'react-hook-form'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { FormControl, FormField, FormItem } from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

interface FormDatePickerProps {
  label: string
  name: string
}

export function FormDatePicker({ label, name }: FormDatePickerProps) {
  const { control, setValue } = useFormContext()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Popover>
              <PopoverTrigger className="w-full">
                <Button
                  className={cn(
                    'h-12 w-full items-center justify-center text-center font-normal',
                    !field.value && 'text-muted-foreground'
                  )}
                  type="button"
                  variant="outline"
                >
                  <CalendarIcon className="mr-2 size-4" />
                  {field.value ? (
                    format(field.value, 'PPP', {
                      locale: pt,
                    })
                  ) : (
                    <span>{label}</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-auto p-0">
                <Calendar
                  locale={pt}
                  mode="single"
                  onSelect={(valueSelected) => {
                    setValue(name, valueSelected)
                  }}
                  selected={field.value}
                />
              </PopoverContent>
            </Popover>
          </FormControl>
        </FormItem>
      )}
    />
  )
}
