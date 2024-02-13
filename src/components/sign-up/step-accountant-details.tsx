import { NUMBER_OF_CUSTOMERS_OPTIONS } from '@/constants/number-of-customers-options'
import { SERVICE_PROVIDED_OPTIONS } from '@/constants/service-provided-options'
import { SOURCE_INFORMATION_OPTIONS } from '@/constants/source-information-options'
import { SignUpFormSchema } from '@/validations/sign-up'
import { RadioGroupIndicator } from '@radix-ui/react-radio-group'
import { Controller, useFormContext } from 'react-hook-form'

import { useSignUp } from '@/hooks/use-sign-up'

import { Button } from '../ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

export function StepAccountantDetails() {
  const form = useFormContext<SignUpFormSchema>()
  const { activeStep, setActiveStep } = useSignUp()

  function handleNextStep() {
    setActiveStep(activeStep + 1)
  }

  function handlePreviousStep() {
    setActiveStep(activeStep - 1)
  }

  return (
    <li>
      <div className="my-2 grid gap-5">
        <div className="flex flex-col space-y-2">
          <FormField
            control={form.control}
            name="service_provided"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Serviço fornecido</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger className="h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup className="max-h-52">
                        {SERVICE_PROVIDED_OPTIONS.map((item, index) => {
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
          <FormField
            control={form.control}
            name="number_clients"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Numero de clientes</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger className="h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup className="max-h-52">
                        {NUMBER_OF_CUSTOMERS_OPTIONS.map((item, index) => {
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
          <FormField
            control={form.control}
            name="source_information"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Como ficou sabendo do nosso serviço?</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger className="h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup className="max-h-52">
                        {SOURCE_INFORMATION_OPTIONS.map((item, index) => {
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
          <Controller
            control={form.control}
            name="serve_mei"
            render={({ field }) => (
              <RadioGroup
                onBlur={field.onBlur}
                onValueChange={field.onChange}
                value={field.value}
              >
                <div className="flex w-full flex-col items-start gap-1">
                  <FormLabel>Atende MEI?</FormLabel>
                  <div
                    className={'flex w-full items-center justify-start gap-4'}
                  >
                    {[
                      { label: 'Sim', value: 'true' },
                      { label: 'Não', value: 'false' },
                    ].map((item, index) => (
                      <div
                        className="my-2 flex w-full items-center justify-start gap-4 "
                        key={index}
                      >
                        <RadioGroupItem value={item.value}>
                          <RadioGroupIndicator />
                        </RadioGroupItem>
                        <span>{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </RadioGroup>
            )}
          />
          <Controller
            control={form.control}
            name="serve_rural_producers"
            render={({ field }) => (
              <RadioGroup
                onBlur={field.onBlur}
                onValueChange={field.onChange}
                value={field.value}
              >
                <div className="flex w-full flex-col items-start gap-1">
                  <FormLabel>Atende produtor rural?</FormLabel>
                  <div
                    className={'flex w-full items-center justify-start gap-4'}
                  >
                    {[
                      { label: 'Sim', value: 'true' },
                      { label: 'Não', value: 'false' },
                    ].map((item, index) => (
                      <div
                        className="my-2 flex w-full items-center justify-start gap-4 "
                        key={index}
                      >
                        <RadioGroupItem value={item.value}>
                          <RadioGroupIndicator />
                        </RadioGroupItem>
                        <span>{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </RadioGroup>
            )}
          />
          <Controller
            control={form.control}
            name="issued_by_customers"
            render={({ field }) => (
              <RadioGroup
                onBlur={field.onBlur}
                onValueChange={field.onChange}
                value={field.value}
              >
                <div className="flex w-full flex-col items-start gap-1">
                  <FormLabel>Responde pelo cliente?</FormLabel>
                  <div
                    className={'flex w-full items-center justify-start gap-4'}
                  >
                    {[
                      { label: 'Sim', value: 'true' },
                      { label: 'Não', value: 'false' },
                    ].map((item, index) => (
                      <div
                        className="my-2 flex w-full items-center justify-start gap-4 "
                        key={index}
                      >
                        <RadioGroupItem value={item.value}>
                          <RadioGroupIndicator />
                        </RadioGroupItem>
                        <span>{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </RadioGroup>
            )}
          />
          <Button type="button" onClick={handleNextStep}>
            Continuar
          </Button>
          {activeStep > 0 && (
            <Button
              type="button"
              variant="outline"
              onClick={handlePreviousStep}
            >
              Voltar
            </Button>
          )}
        </div>
      </div>
    </li>
  )
}
