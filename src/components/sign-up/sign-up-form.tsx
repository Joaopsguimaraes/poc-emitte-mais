import { SignUpFormSchema, signUpFormSchema } from '@/validations/sign-up'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'

import { useSignUp } from '@/hooks/use-sign-up'

import { RenderCurrentStep } from './render-current-step'

const signUpSteps = [
  'Dados pessoais',
  'Código de validação',
  'Dados da empresa',
  'Endereço',
  'Dados do contador',
  'Senha',
]

export function SignUpForm() {
  const { activeStep } = useSignUp()
  const form = useForm<SignUpFormSchema>({
    resolver: zodResolver(signUpFormSchema),
  })

  function onSubmit(data: any) {
    console.log(data)
  }

  return (
    <ol className="w-full space-y-4">
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {signUpSteps.map((step, index) =>
            activeStep === index || activeStep > index ? (
              <li key={index}>
                <div
                  className={`text-primary mb-4 mt-1 w-full rounded-lg bg-none ${
                    index === activeStep
                      ? 'border-primary dark:border-primary'
                      : ''
                  }`}
                  role="alert"
                >
                  <div className="flex w-full items-center gap-1">
                    <span className="sr-only">{step}</span>
                    <h3 className="text-sm font-semibold">{`${index + 1}. ${step}`}</h3>
                    {activeStep > index && (
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
                  <RenderCurrentStep step={step} key={index} />
                )}
              </li>
            ) : null
          )}
        </form>
      </FormProvider>
    </ol>
  )
}
