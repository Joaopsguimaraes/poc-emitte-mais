import { useEffect, useState } from 'react'
import { FormRender } from '@/shared/form/FormRender'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDebounce } from '@uidotdev/usehooks'
import { Loader } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { searchCNPJ } from '@/lib/axios/search-cnpj'
import { cnpjMask } from '@/lib/maskter'
import { useCustomers } from '@/hooks/use-customers'
import {
  StepOneCreateCustomerSchema,
  stepOneCreateCustomerSchema,
  useNewCustomer,
} from '@/hooks/use-new-customer'

import { Button } from '../ui/button'
import { DialogClose } from '../ui/dialog'

export function FirstStepCreateCustomer({
  activeStep,
  setActiveStep,
}: {
  activeStep: number
  setActiveStep: (step: number) => void
}) {
  const { storageStepOneNewCustomer, setStorageStepOneNewCustomer } =
    useCustomers()
  const [isLoading, setIslLoading] = useState(false)
  const form = useForm<StepOneCreateCustomerSchema>({
    resolver: zodResolver(stepOneCreateCustomerSchema),
    defaultValues: {
      customerType: 'Jc',
      document: '',
    },
  })
  const { fields } = useNewCustomer<StepOneCreateCustomerSchema>(form)
  const debouncedSearchCNPJ = useDebounce(form.getValues('document'), 500)

  function handleSetStorageValues() {
    if (!!storageStepOneNewCustomer) {
      form.setValue('customerType', storageStepOneNewCustomer.customerType)
      form.setValue('document', storageStepOneNewCustomer.document)
      form.setValue('fullName', storageStepOneNewCustomer.fullName)
      form.setValue('shortName', storageStepOneNewCustomer.shortName)
      form.setValue('email', storageStepOneNewCustomer.email)
      form.setValue('phone', storageStepOneNewCustomer.phone)
    }
  }

  function onSubmit(data: StepOneCreateCustomerSchema) {
    setStorageStepOneNewCustomer(data)
    setActiveStep(activeStep + 1)
  }

  async function handleSearchCNPJ() {
    try {
      setIslLoading(true)
      const response = await searchCNPJ(cnpjMask.unmask(form.watch('document')))
      console.log(response.data)
    } catch (error: any) {
      setIslLoading(false)
      console.log(error)
    } finally {
      setIslLoading(false)
    }
  }

  useEffect(() => {
    if (
      debouncedSearchCNPJ.length === 18 &&
      form.watch('customerType') === 'J'
    ) {
      handleSearchCNPJ()
    }
  }, [debouncedSearchCNPJ])

  useEffect(() => {
    handleSetStorageValues()
  }, [storageStepOneNewCustomer])

  return (
    <div className="grid w-full">
      <FormRender<StepOneCreateCustomerSchema>
        constant={fields.stepOne}
        form={form}
        onSubmit={onSubmit}
      >
        <div className="flex w-full items-center justify-end gap-4">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? <Loader className="animate-spin" /> : 'Proximo'}
          </Button>
        </div>
      </FormRender>
    </div>
  )
}
