import { SignUpFormSchema } from '@/validations/sign-up'
import { useFormContext } from 'react-hook-form'

import { telMask } from '@/lib/maskter'
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

export function StepPersonalDetails() {
  const form = useFormContext<SignUpFormSchema>()
  const { activeStep, setActiveStep } = useSignUp()

  function handleNextStep() {
    setActiveStep(activeStep + 1)
  }

  return (
    <li>
      <div className="my-2 grid gap-5">
        <div className="flex flex-col space-y-2">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-2">
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input
                    className={cn('h-12 bg-white dark:bg-black')}
                    onChange={field.onChange}
                    value={field.value}
                    width="full"
                    placeholder="Digite seu nome"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-2">
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input
                    className={cn('h-12 bg-white dark:bg-black')}
                    onChange={field.onChange}
                    value={field.value}
                    width="full"
                    placeholder="Digite seu e-mail"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-2">
                <FormLabel>Telefone</FormLabel>
                <FormControl>
                  <Input
                    className={cn('h-12 bg-white dark:bg-black')}
                    onChange={(e) => field.onChange(telMask.onChange(e))}
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
        </div>
      </div>
    </li>
  )
}
