import { useRouter, useSearchParams } from 'next/navigation'
import { AccountantUpdateDTO } from '@/@types/accountant/accountant-update-dto'
import { SignUpFormSchema } from '@/validations/sign-up'
import { useMutation } from '@tanstack/react-query'
import { signIn, useSession } from 'next-auth/react'
import { useFormContext } from 'react-hook-form'

import { cn } from '@/lib/utils'
import { useAccountant } from '@/hooks/use-accountant'
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
import { useToast } from '../ui/use-toast'

export function StepPassword() {
  const router = useRouter()
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const { activeStep, setActiveStep } = useSignUp()
  const { getValues, control } = useFormContext<SignUpFormSchema>()
  const { updateAccountant } = useAccountant()
  const { mutateAsync } = useMutation({
    mutationFn: handleSubmitStep,
    onSuccess: handleNextStep,
    onError: (error: any) => {
      toast({
        title: 'Erro ao criar a senha',
        description: Array.isArray(error) ? error[0].message : error.message,
        variant: 'destructive',
      })
    },
  })

  async function handleSubmitStep() {
    const isValidPassword =
      getValues('password') === getValues('password_confirmation')

    if (!isValidPassword) {
      toast({
        title: 'As senhas não coincidem',
        description: 'As senhas devem ser iguais',
        variant: 'destructive',
      })
      return
    }

    const dto: AccountantUpdateDTO = {
      step: activeStep + 1,
      password: getValues('password'),
    }

    await updateAccountant(searchParams.get('accountantId') as string, dto)
  }

  async function handleNextStep() {
    const newParams = new URLSearchParams(searchParams)
    newParams.delete('accountantId')
    router.push(`/${newParams.toString()}`)

    await handleSignIn()
  }

  function handlePreviousStep() {
    setActiveStep(activeStep - 1)
  }

  async function handleSignIn() {
    await signIn('credentials', {
      email: getValues('email'),
      password: getValues('password'),
      redirect: false,
    }).then((response) => {
      if (response?.ok) {
        toast({
          title: 'Conta criada com sucesso',
          variant: 'default',
        })

        router.replace('/dashboard')
      }
    })
  }

  return (
    <li>
      <div className="my-2 grid gap-5">
        <div className="flex flex-col space-y-2">
          <FormField
            control={control}
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
            control={control}
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
          <Button type="button" onClick={() => mutateAsync()}>
            Cadastrar
          </Button>
          <Button type="button" onClick={handlePreviousStep}>
            Voltar
          </Button>
        </div>
      </div>
    </li>
  )
}
