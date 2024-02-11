import { useState } from 'react'
import { type SelectOptions } from '@/@types/form-field'
import { SelectProps } from '@radix-ui/react-select'
import { CheckIcon, ChevronDown } from 'lucide-react'
import { type UseFormReturn } from 'react-hook-form'

import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

type FormSelectProps<T> = SelectProps & {
  name: string
  label: string
  options: any[]
  multiple?: boolean
  placeholder?: string
  form: UseFormReturn<T | any>
  onValueChange?: (search: string) => void
}

export function FormCombobox<T>({
  name,
  label,
  options,
  multiple = false,
  placeholder,
  form,
  onValueChange,
}: FormSelectProps<T>) {
  const [multipleOptionSelected, setMultipleOptionSelected] = useState<
    SelectOptions[]
  >([])
  const [singleOptionSelected, setSingleOptionSelected] =
    useState<SelectOptions | null>(null)

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex w-full flex-col gap-2">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  aria-controls=""
                  aria-expanded
                  className={cn(
                    'border-input bg-background ring-offset-background placeholder:text-muted-foreground focus:ring-ring  flex min-h-[3rem] w-full items-center justify-between rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50'
                  )}
                  role="combobox"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    {multiple ? (
                      <>
                        {multipleOptionSelected.map(
                          ({ label, value }: SelectOptions) => (
                            <Badge
                              className="dark:border-secondary dark:bg-secondary flex px-4 py-1"
                              key={value}
                            >
                              {label}
                            </Badge>
                          )
                        )}
                      </>
                    ) : (
                      <Badge
                        className={cn(
                          !singleOptionSelected
                            ? 'hidden'
                            : 'dark:border-secondary dark:bg-secondary flex px-4 py-1'
                        )}
                        key={field.value}
                      >
                        {field.value ? (
                          <span>{field.value.label}</span>
                        ) : (
                          <span>{`${singleOptionSelected?.label}`}</span>
                        )}
                      </Badge>
                    )}
                  </div>
                  <ChevronDown className="size-4" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="min-w-[350px]">
                <Command>
                  <CommandList>
                    <CommandEmpty>Nenhum dado encontrado</CommandEmpty>
                    <CommandInput
                      className="dark:bg-gray900 bg-white"
                      onValueChange={onValueChange}
                      placeholder={placeholder}
                    />
                    <CommandGroup className="max-h-[250px] overflow-y-auto">
                      {options.map((option) => (
                        <CommandItem
                          className="flex w-full gap-2"
                          key={option.value}
                          onSelect={() => {
                            if (multiple) {
                              setMultipleOptionSelected((prevState) => {
                                const optionAlreadySelected = prevState.find(
                                  (v) => v.value === option.value
                                )

                                if (optionAlreadySelected) {
                                  return [
                                    ...prevState.filter(
                                      (o) =>
                                        o.value !== optionAlreadySelected.value
                                    ),
                                  ]
                                }

                                const newState = [...prevState, option]
                                field.onChange(newState)
                                return newState
                              })
                            } else {
                              setSingleOptionSelected(() => {
                                field.onChange(option)
                                return option
                              })
                            }
                          }}
                          value={String(option.label)}
                        >
                          {option.label}
                          {multipleOptionSelected.includes(option) && (
                            <CheckIcon className="mb-0.5" size={15} />
                          )}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
