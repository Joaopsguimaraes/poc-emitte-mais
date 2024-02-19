import { useEffect, useState } from 'react'
import { type FormFields, type SelectOptions } from '@/@types/form-field'
import { CheckIcon, ChevronDown } from 'lucide-react'
import { type ControllerRenderProps } from 'react-hook-form'

import { cnpjMask, cpfMask, telMask, zipCodeMask } from '@/lib/maskter'
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'

interface Props<T> {
  field: ControllerRenderProps<T | any>
  slot: FormFields<any>
}

export function FormFieldDynamic<T>({ field, slot }: Props<T>) {
  const [multipleOptionSelected, setMultipleOptionSelected] = useState<
    SelectOptions[]
  >([])
  const [singleOptionSelected, setSingleOptionSelected] =
    useState<SelectOptions | null>(null)

  useEffect(() => {
    if (field.value) {
      setSingleOptionSelected(field.value)
    }
  }, [field.value])

  let allowShowPlaceholderCombobox

  switch (slot.type) {
    case 'tel':
      return (
        <Input
          className="h-12 bg-white dark:bg-black"
          inputMode="tel"
          onChange={(e) => field.onChange(telMask.onChange(e))}
          placeholder={slot.placeholderKey}
          type="tel"
          value={field.value}
          width="full"
        />
      )
    case 'cnpj':
      return (
        <Input
          className="h-12 bg-white dark:bg-black"
          inputMode="numeric"
          onChange={(e) => field.onChange(cnpjMask.onChange(e))}
          placeholder={slot.placeholderKey}
          type="cnpj"
          value={field.value}
          width="full"
        />
      )
    case 'cpf':
      return (
        <Input
          className="h-12 bg-white dark:bg-black"
          inputMode="numeric"
          onChange={(e) => field.onChange(cpfMask.onChange(e))}
          placeholder={slot.placeholderKey}
          type="cpf"
          value={field.value}
          width="full"
        />
      )
    case 'switch':
      return <Switch checked={field.value} onCheckedChange={field.onChange} />
    case 'radio':
      return (
        <RadioGroup
          className={cn(
            slot.options.length > 2 ? 'space-y-2' : 'flex justify-start gap-4'
          )}
          onValueChange={field.onChange}
          value={field.value}
        >
          {slot.options?.map((option) => (
            <FormItem
              className="flex w-auto items-center space-x-2"
              key={option.value.toString()}
            >
              <FormControl>
                <RadioGroupItem
                  aria-label={option.translateKey}
                  title={option.translateKey}
                  value={option.value as any}
                />
              </FormControl>
              <FormLabel
                className="cursor-pointer font-normal"
                title={option.translateKey}
              >
                {option.translateKey}
              </FormLabel>
            </FormItem>
          ))}
        </RadioGroup>
      )
    case 'combobox':
      allowShowPlaceholderCombobox =
        !singleOptionSelected && !field.value && !slot.multiple

      return (
        <Popover>
          <PopoverTrigger asChild>
            <button
              aria-controls=""
              aria-expanded
              className={cn(
                'border-input bg-background ring-offset-background placeholder:text-muted-foreground focus:ring-ring  flex min-h-[3rem] w-full items-center justify-between rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50',
                slot.className
              )}
              role="combobox"
            >
              <div className="flex flex-wrap items-center gap-2">
                {slot.multiple ? (
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
                    {slot.placeholder && multipleOptionSelected.length < 1 && (
                      <span>{`${slot.placeholder}`}</span>
                    )}
                  </>
                ) : (
                  <div>
                    <div
                      className={cn(
                        !singleOptionSelected ? 'hidden' : 'py-1',
                        'flex items-center'
                      )}
                      key={field.value}
                    >
                      {field.value ? (
                        <span
                          className={cn(
                            '',
                            field.value.label.lenght > 20 &&
                              'w-36 truncate sm:w-64 xl:w-80'
                          )}
                        >
                          {field.value.label}
                        </span>
                      ) : (
                        <span
                          className={cn(
                            '',
                            singleOptionSelected &&
                              singleOptionSelected?.label.length > 20 &&
                              'w-36 truncate sm:w-64 xl:w-80'
                          )}
                        >{`${singleOptionSelected?.label}`}</span>
                      )}
                    </div>
                  </div>
                )}
                {slot.placeholder && allowShowPlaceholderCombobox && (
                  <span>{`${slot.placeholder}`}</span>
                )}
              </div>
              <ChevronDown className="size-4" />
            </button>
          </PopoverTrigger>
          <PopoverContent className={cn('min-w-[350px]', slot.contentSize)}>
            <Command>
              <CommandList>
                <CommandInput
                  className="dark:bg-gray900 bg-white"
                  onValueChange={(search: string) =>
                    'onInputChange' in slot && slot.onInputChange
                      ? slot.onInputChange(search)
                      : null
                  }
                  placeholder={slot.placeholderKey}
                />
                <CommandEmpty>
                  {slot.loading ? (
                    <Skeleton className="h-8" />
                  ) : (
                    <span>Não encontrado</span>
                  )}
                </CommandEmpty>
                <CommandGroup>
                  {slot.options.map((option) => (
                    <CommandItem
                      className="flex w-full gap-2"
                      key={option.value}
                      onSelect={() => {
                        if (slot.multiple) {
                          setMultipleOptionSelected((prevState) => {
                            const optionAlreadySelected = prevState.find(
                              (v) => v.value === option.value
                            )

                            if (optionAlreadySelected) {
                              return [
                                ...prevState.filter(
                                  (o) => o.value !== optionAlreadySelected.value
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
      )
    case 'select':
      return slot?.isLoading ? (
        <Skeleton className="h-8" />
      ) : (
        <Select disabled={slot.disabled} onValueChange={field.onChange}>
          <SelectTrigger className="h-12">
            <SelectValue
              placeholder={
                slot.options.find((s) => s.value === field.value)?.label ||
                field.value ||
                slot.placeHolder
              }
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup className="max-h-52">
              {slot.options.map((item, index) => {
                return (
                  <SelectItem key={index} value={String(item.value)}>
                    {item.label}
                  </SelectItem>
                )
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      )
    case 'textarea':
      return (
        <Textarea
          {...field}
          className="disabled:bg-background disabled:opacity-100"
          placeholder={slot.placeholderKey}
          title={slot.translateKey}
        />
      )
    case 'number':
      return (
        <Input
          className="h-12 bg-white dark:bg-black"
          disabled={slot.disabled}
          inputMode="numeric"
          onChange={field.onChange}
          type="number"
          value={field.value}
          width="full"
        />
      )
    case 'zipcode':
      return (
        <Input
          className="h-12 bg-white dark:bg-black"
          disabled={slot.disabled}
          inputMode="numeric"
          onChange={(e) => field.onChange(zipCodeMask.onChange(e))}
          placeholder={slot.placeholderKey}
          type="zipcode"
          value={field.value}
          width="full"
        />
      )
    case 'hidden':
      return <Input {...field} type="hidden" />
    case 'text':
      return slot.isLoading ? (
        <Skeleton className="h-8" />
      ) : (
        <Input
          className="h-12 bg-white dark:bg-black"
          disabled={slot.disabled}
          onChange={field.onChange}
          placeholder={slot.placeholderKey}
          value={field.value}
          width="full"
        />
      )
    default:
      return (
        <Input
          className="h-12 bg-white dark:bg-black"
          disabled={slot.disabled}
          onChange={field.onChange}
          placeholder={slot.placeholderKey}
          value={field.value}
          width="full"
        />
      )
  }
}
