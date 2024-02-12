import { useState } from 'react'
import { FormInput } from '@/shared/form/FormInput'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '../ui/button'

const signUpFormSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  phone: z.string().min(11),
  validation_code: z.string().min(6),
  document_type: z.string().min(3),
  document_id: z.string().min(11),
  company_name: z.string().min(3),
  trading_name: z.string().min(3),
  job_position: z.string().min(3),
  crc: z.string().min(3),
  address: z.object({
    type: z.string(),
    zip: z.string(),
    street: z.string(),
    neighborhood: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
  }),
  service_provided: z.string(),
  number_clients: z.string(),
  serve_mei: z.string(),
  serve_rural_producers: z.string(),
  indicates_certificate: z.string(),
  issued_by_customers: z.string(),
  source_information: z.string(),
  password: z.string(),
  password_confirmation: z.string(),
})

const signUpSteps = [
  'Dados pessoais',
  'Código de validação',
  'Dados da empresa',
  'Endereço',
  'Dados do contador',
  'Senha',
]

type SignUpForm = z.infer<typeof signUpFormSchema>

export function SignUpForm() {
  const [activeStep, setActiveStep] = useState(0)
  const form = useForm<SignUpForm>({
    resolver: zodResolver(signUpFormSchema),
  })

  return (
    <ol className="w-full space-y-4">
      <FormProvider {...form}>
        {signUpSteps.map((step, index) => (
          <li key={index}>
            <div
              className={`text-primary my-2 w-full rounded-lg bg-none ${
                index === activeStep ? 'border-primary dark:border-primary' : ''
              }`}
              role="alert"
            >
              <div className=" flex w-full items-center justify-between">
                <span className="sr-only">{step}</span>
                <h3 className="font-medium">{`${index + 1}. ${step}`}</h3>
                {activeStep > index  && (
                  <svg
                    className="size-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 16 12"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 5.917 5.724 10.5 15 1.5"
                    />
                  </svg>
                )}
              </div>
            </div>
            {index === activeStep && (
              <li key={index}>
                <div className="my-2 grid gap-5">
                  <div className="flex flex-col space-y-2">
                    <FormInput
                      label="Nome"
                      name="name"
                      placeholder="Nome completo"
                    />
                    <FormInput
                      label="E-mail"
                      name="email"
                      placeholder="lorem@email.com.br"
                    />
                    <FormInput
                      label="Telefone"
                      name="phone"
                      placeholder="Ex.: (99) 99999-9999"
                    />
                    <Button onClick={() => setActiveStep(activeStep + 1)}>
                      Continuar
                    </Button>
                    {activeStep > 0 && (
                      <Button
                        variant="outline"
                        onClick={() => setActiveStep(activeStep - 1)}
                      >
                        Voltar
                      </Button>
                    )}
                  </div>
                </div>
              </li>
            )}
          </li>
        ))}
      </FormProvider>
    </ol>
  )
}
