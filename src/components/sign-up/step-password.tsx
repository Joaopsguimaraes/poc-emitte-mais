import { SignUpFormSchema } from '@/validations/sign-up'
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

export function StepPassword() {
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
            name="password"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-2">
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input
                    className={cn('h-12 bg-white dark:bg-black')}
                    onChange={field.onChange}
                    value={field.value}
                    width="full"
                    placeholder="********"
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password_confirmation"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-2">
                <FormLabel>Confirme a senha</FormLabel>
                <FormControl>
                  <Input
                    className={cn('h-12 bg-white dark:bg-black')}
                    onChange={field.onChange}
                    value={field.value}
                    width="full"
                    placeholder="********"
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Cadastrar</Button>
        </div>
      </div>
    </li>
  )
}
