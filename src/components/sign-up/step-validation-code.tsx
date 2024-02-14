'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { AccountantUpdateDTO } from '@/@types/accountant/accountant-update-dto'
import { SignUpFormSchema } from '@/validations/sign-up'
import { useMutation } from '@tanstack/react-query'
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

export function StepValidationCode() {
  const router = useRouter()
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const { updateAccountant } = useAccountant()
  const { activeStep, setActiveStep } = useSignUp()
  const { getValues, control } = useFormContext<SignUpFormSchema>()
  const { mutateAsync } = useMutation({
    mutationFn: handleSubmitStep,
    onSuccess: handleNextStep,
    onError: (error: any) => {
      toast({
        title: 'Erro ao validar o codigo',
        description: Array.isArray(error) ? error[0].message : error.message,
        variant: 'destructive',
      })
    },
  })

  async function handleSubmitStep() {
    const dto: AccountantUpdateDTO = {
      step: activeStep + 1,
      validationCode: getValues('validationCode'),
    }

    await updateAccountant(searchParams.get('accountantId') as string, dto)
  }

  function handleNextStep() {
    toast({
      title: 'Codigo validado com sucesso',
      variant: 'default',
    })

    setActiveStep(activeStep + 1)
  }

  function handlePreviousStep() {
    setActiveStep(activeStep - 1)

    const newParams = new URLSearchParams(searchParams)
    newParams.delete('accountantId')
    router.push(`/${newParams.toString()}`)
  }

  return (
    <li>
      <div className="my-2 grid gap-5">
        <div className="flex flex-col space-y-2">
          <FormField
            control={control}
            name="validationCode"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-2">
                <FormLabel>Código de validação</FormLabel>
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
          <Button type="button" onClick={() => mutateAsync()}>
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
