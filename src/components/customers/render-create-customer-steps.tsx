import { FirstStepCreateCustomer } from './first-step-create-customer'
import { SecondStepCreateCustomer } from './second-step-create-customer'
import { ThirdStepCreateCustomer } from './third-step-create-customer'

export function RenderCreateCustomerSteps({ activeStep, setActiveStep }: any) {
  switch (activeStep) {
    case 0:
      return (
        <>
          <FirstStepCreateCustomer
            activeStep={activeStep}
            setActiveStep={setActiveStep}
          />
        </>
      )
    case 1:
      return (
        <>
          <SecondStepCreateCustomer
            activeStep={activeStep}
            setActiveStep={setActiveStep}
          />
        </>
      )
    case 2:
      return (
        <ThirdStepCreateCustomer
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
      )
    default:
      break
  }
}
