import { StepAccountantDetails } from './step-accountant-details'
import { StepAddressDetails } from './step-address-details'
import { StepCompanyDetails } from './step-company-details'
import { StepPassword } from './step-password'
import { StepPersonalDetails } from './step-personal-details'
import { StepValidationCode } from './step-validation-code'

export function RenderCurrentStep({ step }: { step: string }) {
  switch (step) {
    case 'Dados pessoais':
      return <StepPersonalDetails />
    case 'Código de validação':
      return <StepValidationCode />
    case 'Dados da empresa':
      return <StepCompanyDetails />
    case 'Endereço':
      return <StepAddressDetails />
    case 'Dados do contador':
      return <StepAccountantDetails />
    case 'Senha':
      return <StepPassword />
    default:
      return <></>
  }
}
