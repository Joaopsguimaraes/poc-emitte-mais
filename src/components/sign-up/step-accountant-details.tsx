import { Controller, useFormContext } from 'react-hook-form'

import { cn } from '@/lib/utils'
import { useSignUp } from '@/hooks/use-sign-up'

import { Button } from '../ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { RadioGroupIndicator } from '@radix-ui/react-radio-group'
import { SignUpFormSchema } from '@/validations/sign-up'

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
              <FormItem className="flex w-full flex-col gap-2">
                <FormLabel>Serviço fornecido</FormLabel>
                <FormControl>
                  <Input
                    className={cn('h-12 bg-white dark:bg-black')}
                    onChange={field.onChange}
                    value={field.value}
                    width="full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="number_clients"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-2">
                <FormLabel>Numero de clientes</FormLabel>
                <FormControl>
                  <Input
                    className={cn('h-12 bg-white dark:bg-black')}
                    onChange={field.onChange}
                    value={field.value}
                    width="full"
                  />
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
                <div className={'flex w-full items-center justify-start gap-4'}>
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
                <div className={'flex w-full items-center justify-start gap-4'}>
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
                <div className={'flex w-full items-center justify-start gap-4'}>
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
              </RadioGroup>
            )}
          />
          <Controller
            control={form.control}
            name="source_information"
            render={({ field }) => (
              <RadioGroup
                onBlur={field.onBlur}
                onValueChange={field.onChange}
                value={field.value}
              >
                <div className={'flex w-full items-center justify-start gap-4'}>
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
