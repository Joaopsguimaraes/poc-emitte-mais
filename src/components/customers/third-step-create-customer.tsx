import { useEffect } from 'react'
import { FormRender } from '@/shared/form/FormRender'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { useCustomers } from '@/hooks/use-customers'
import {
  StepThreeCreateNewCustomerSchema,
  stepThreeCreateNewCustomerSchema,
  useNewCustomer,
} from '@/hooks/use-new-customer'

import { Button } from '../ui/button'
import { DialogClose } from '../ui/dialog'

export function ThirdStepCreateCustomer({
  activeStep,
  setActiveStep,
}: {
  activeStep: number
  setActiveStep: (step: number) => void
}) {
  const {
    storageThirdNewCustomer,
    setStorageThirdNewCustomer,
    setStorageSecondNewCustomer,
    setStorageStepOneNewCustomer,
  } = useCustomers()
  const form = useForm<StepThreeCreateNewCustomerSchema>({
    resolver: zodResolver(stepThreeCreateNewCustomerSchema),
  })
  const { fields } = useNewCustomer<StepThreeCreateNewCustomerSchema>(form)

  function handleSetStorageValues() {
    if (!!storageThirdNewCustomer) {
      form.setValue('crt', storageThirdNewCustomer.crt)
      form.setValue('isProdutorRural', storageThirdNewCustomer.isProdutorRural)
      form.setValue('regimeEspecial', storageThirdNewCustomer.regimeEspecial)
    }
  }

  function onSubmit(data: StepThreeCreateNewCustomerSchema) {
    setStorageThirdNewCustomer(data)
    setStorageSecondNewCustomer(null)
    setStorageStepOneNewCustomer(null)
  }

  function prevStep() {
    setActiveStep(activeStep - 1)
  }

  useEffect(() => {
    handleSetStorageValues()
  }, [storageThirdNewCustomer])

  return (
    <div className="grid w-full">
      <FormRender<StepThreeCreateNewCustomerSchema>
        constant={fields.stepThree}
        form={form}
        onSubmit={onSubmit}
      >
        <div className="flex w-full items-center justify-end gap-4">
          <Button type="button" variant="outline" onClick={prevStep}>
            Voltar
          </Button>
          <DialogClose asChild>
            <Button type="submit">Cadastrar</Button>
          </DialogClose>
        </div>
      </FormRender>
    </div>
  )
}
