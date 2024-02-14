'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { AccountantUpdateDTO } from '@/@types/accountant/accountant-update-dto'
import { SignUpFormSchema } from '@/validations/sign-up'
import { useMutation } from '@tanstack/react-query'
import { useFormContext } from 'react-hook-form'

import { brasilApi } from '@/lib/axios/brasil-api'
import { findFromZipCode } from '@/lib/find-from-zip-code'
import { zipCodeMask } from '@/lib/maskter'
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
import { Skeleton } from '../ui/skeleton'
import { useToast } from '../ui/use-toast'

export function StepAddressDetails() {
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const { activeStep, setActiveStep } = useSignUp()
  const [isLoading, setIsLoading] = useState(false)
  const { getValues, control, setValue } = useFormContext<SignUpFormSchema>()
  const { updateAccountant } = useAccountant()
  const { mutateAsync } = useMutation({
    mutationFn: handleSubmitStep,
    onSuccess: handleNextStep,
    onError: (error: any) => {
      toast({
        title: 'Erro ao informar o endereço',
        description: Array.isArray(error) ? error[0].message : error.message,
        variant: 'destructive',
      })
    },
  })

  async function handleSubmitStep() {
    const dto: AccountantUpdateDTO = {
      step: activeStep + 1,
      address: {
        zip: getValues('address.zip'),
        street: getValues('address.street'),
        neighborhood: getValues('address.neighborhood'),
        city: getValues('address.city'),
        state: getValues('address.state'),
        country: getValues('address.country'),
      },
    }

    await updateAccountant(searchParams.get('accountantId') as string, dto)
  }

  function handleNextStep() {
    setActiveStep(activeStep + 1)
  }

  function handlePreviousStep() {
    setActiveStep(activeStep - 1)
  }

  async function handleChangeZipCode(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const { value } = event.target

    try {
      setIsLoading(true)

      if (value.length > 8) {
        const { data } = await brasilApi(value)

        setValue('address.street', data.street)
        setValue('address.neighborhood', data.neighborhood)
        setValue('address.city', data.city)
        setValue('address.state', data.state)
        setValue('address.country', 'Brasil')
      }
    } catch (error) {
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <li>
      <div className="my-2 grid gap-5">
        <div className="flex flex-col space-y-2">
          <FormField
            control={control}
            name="address.zip"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-2">
                <FormLabel>CEP</FormLabel>
                <FormControl>
                  <Input
                    className={cn('h-12 bg-white dark:bg-black')}
                    onChange={(e) => {
                      handleChangeZipCode(e)
                      field.onChange(zipCodeMask.onChange(e))
                    }}
                    value={field.value}
                    width="full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {isLoading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <Skeleton className="my-1 h-14" key={index} />
            ))
          ) : (
            <>
              <FormField
                control={control}
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
                control={control}
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
                control={control}
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
                control={control}
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
                control={control}
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
            </>
          )}
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
