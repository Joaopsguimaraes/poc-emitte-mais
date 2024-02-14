import { useSearchParams } from 'next/navigation'
import { AccountantCreateDTO } from '@/@types/accountant/accountant-create-dto'
import { AccountantCreateResponse } from '@/@types/accountant/accountant-create-response'
import { SignUpFormSchema } from '@/validations/sign-up'
import { useMutation } from '@tanstack/react-query'
import { useFormContext } from 'react-hook-form'

import { telMask } from '@/lib/maskter'
import { cn } from '@/lib/utils'
import { useAccountant } from '@/hooks/use-accountant'
import { useSignUp } from '@/hooks/use-sign-up'
import { useUrl } from '@/hooks/use-url'

import { Button } from '../ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { toast } from '../ui/use-toast'

export function StepPersonalDetails() {
  const { updateSearchParams } = useUrl()
  const { createAccountant } = useAccountant()
  const { activeStep, setActiveStep } = useSignUp()
  const { getValues, control } = useFormContext<SignUpFormSchema>()
  const { mutateAsync } = useMutation({
    mutationFn: handleCreateAccountant,
    onError: handleThrowError,
    onSuccess: handleNextStep,
  })

  function handleNextStep(data: AccountantCreateResponse) {
    updateSearchParams({ accountantId: data.id })
    setActiveStep(activeStep + 1)
  }

  function handleThrowError(error: any) {
    toast({
      title: 'Erro',
      description: Array.isArray(error) ? error[0].message : error.message,
    })
  }

  async function handleCreateAccountant() {
    return await createAccountant({
      firstName: getValues('firstName'),
      lastName: getValues('lastName'),
      email: getValues('email'),
      whatsapp: getValues('phone'),
    })
  }

  return (
    <li>
      <div className="my-2 grid gap-5">
        <div className="flex flex-col space-y-2">
          <FormField
            control={control}
            name="firstName"
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
            control={control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-2">
                <FormLabel>Sobrenome</FormLabel>
                <FormControl>
                  <Input
                    className={cn('h-12 bg-white dark:bg-black')}
                    onChange={field.onChange}
                    value={field.value}
                    width="full"
                    placeholder="Digite seu sobrenome"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
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
            control={control}
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
                    placeholder="(XX) XXXXX-XXXX"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="button" onClick={() => mutateAsync()}>
            Continuar
          </Button>
        </div>
      </div>
    </li>
  )
}
