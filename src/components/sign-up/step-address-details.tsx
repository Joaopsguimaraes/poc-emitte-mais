import { useFormContext } from 'react-hook-form'

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
import { SignUpFormSchema } from '@/validations/sign-up'

export function StepAddressDetails() {
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
            name="address.type"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-2">
                <FormLabel>Tipo do endereço</FormLabel>
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
            name="address.zip"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-2">
                <FormLabel>CEP</FormLabel>
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
            name="address.street"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-2">
                <FormLabel>Rua</FormLabel>
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
            name="address.neighborhood"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-2">
                <FormLabel>Bairro</FormLabel>
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
            name="address.city"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-2">
                <FormLabel>Cidade</FormLabel>
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
            name="address.state"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-2">
                <FormLabel>Estado</FormLabel>
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
            name="address.country"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-2">
                <FormLabel>Pais</FormLabel>
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
