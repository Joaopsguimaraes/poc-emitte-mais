'use client'

import { useEffect, useState } from 'react'
import { SignUpFormSchema } from '@/validations/sign-up'
import { useFormContext } from 'react-hook-form'

import { brasilApi } from '@/lib/axios/brasil-api'
import { findFromZipCode } from '@/lib/find-from-zip-code'
import { zipCodeMask } from '@/lib/maskter'
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
import { Skeleton } from '../ui/skeleton'

export function StepAddressDetails() {
  const form = useFormContext<SignUpFormSchema>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { activeStep, setActiveStep } = useSignUp()

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

        form.setValue('address.street', data.street)
        form.setValue('address.neighborhood', data.neighborhood)
        form.setValue('address.city', data.city)
        form.setValue('address.state', data.state)
        form.setValue('address.country', 'Brasil')
      }
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <li>
      <div className="my-2 grid gap-5">
        <div className="flex flex-col space-y-2">
          <FormField
            control={form.control}
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
            </>
          )}
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
