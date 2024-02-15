import { useEffect } from 'react'
import { FormRender } from '@/shared/form/FormRender'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDebounce } from '@uidotdev/usehooks'
import { useForm } from 'react-hook-form'

import { brasilApi } from '@/lib/axios/brasil-api'
import { useCustomers } from '@/hooks/use-customers'
import {
  StepTwoCreateCustomerSchema,
  stepTwoCreateCustomerSchema,
  useNewCustomer,
} from '@/hooks/use-new-customer'

import { Button } from '../ui/button'
import { useToast } from '../ui/use-toast'

export function SecondStepCreateCustomer({
  activeStep,
  setActiveStep,
}: {
  activeStep: number
  setActiveStep: (step: number) => void
}) {
  const { toast } = useToast()
  const { storageSecondNewCustomer, setStorageSecondNewCustomer } =
    useCustomers()
  const form = useForm<StepTwoCreateCustomerSchema>({
    resolver: zodResolver(stepTwoCreateCustomerSchema),
    defaultValues: {
      address: {
        street: '',
        number: '',
        complement: '',
        district: '',
        city: '',
        state: '',
        country: '',
        cep: '',
      },
    },
  })
  const { fields } = useNewCustomer<StepTwoCreateCustomerSchema>(form)

  function handleSetStorageValues() {
    if (!!storageSecondNewCustomer) {
      form.setValue('address.street', storageSecondNewCustomer.address.street)
      form.setValue('address.number', storageSecondNewCustomer.address.number)
      form.setValue(
        'address.complement',
        storageSecondNewCustomer.address.complement
      )
      form.setValue(
        'address.district',
        storageSecondNewCustomer.address.district
      )
      form.setValue('address.city', storageSecondNewCustomer.address.city)
      form.setValue('address.state', storageSecondNewCustomer.address.state)
      form.setValue('address.country', storageSecondNewCustomer.address.country)
      form.setValue('address.cep', storageSecondNewCustomer.address.cep)
    }
  }

  function onSubmit(data: StepTwoCreateCustomerSchema) {
    setStorageSecondNewCustomer(data)
    setActiveStep(activeStep + 1)
  }

  function prevStep() {
    setActiveStep(activeStep - 1)
  }

  async function searchZipCode() {
    try {
      if (form.watch('address.cep').length > 8) {
        const { data } = await brasilApi(form.watch('address.cep'))

        form.setValue('address.street', data.street)
        form.setValue('address.district', data.neighborhood)
        form.setValue('address.city', data.city)
        form.setValue('address.state', data.state)
        form.setValue('address.country', 'Brasil')
      }
    } catch (error) {
      console.log(error)
      toast({
        title: 'CEP inválido',
        description: 'Por favor, informe um CEP válido',
        variant: 'destructive',
      })
    }
  }

  useEffect(() => {
    searchZipCode()
  }, [form.watch('address.cep')])

  useEffect(() => {
    handleSetStorageValues()
  }, [storageSecondNewCustomer])

  return (
    <div className="grid w-full">
      <FormRender<StepTwoCreateCustomerSchema>
        constant={fields.stepTwo}
        form={form}
        onSubmit={onSubmit}
      >
        <div className="flex w-full items-center justify-end gap-4">
          <Button type="button" variant="outline" onClick={prevStep}>
            Voltar
          </Button>
          <Button type="submit">Proximo</Button>
        </div>
      </FormRender>
    </div>
  )
}
