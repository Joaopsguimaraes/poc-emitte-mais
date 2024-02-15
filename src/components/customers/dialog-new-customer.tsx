'use client'

import { useState } from 'react'
import { Check, Info, MapPin } from 'lucide-react'

import { cn } from '@/lib/utils'

import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '../ui/dialog'
import { RenderCreateCustomerSteps } from './render-create-customer-steps'

const steps = [
  {
    title: 'Informações básicas',
    icon: <Info className="size-4" />,
  },
  {
    title: 'Endereço',
    icon: <MapPin className="size-4" />,
  },
  {
    title: 'Finalizar cadastro',
    icon: <Check className="size-4" />,
  },
]

export function DialogNewCustomer() {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" type="button">
          Novo cliente
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[1100px]">
        <DialogTitle className="flex items-center w-full my-2">
          <ol className="flex w-full items-center justify-between">
            {steps.map((step, index) => (
              <li
                key={index}
                className={cn(
                  'flex w-48 items-center gap-2 text-sm',
                  activeStep === index
                    ? 'font-bold text-primary'
                    : 'font-normal text-primary/30'
                )}
              >
                {step.icon}
                <span>{step.title}</span>
              </li>
            ))}
          </ol>
        </DialogTitle>
        <RenderCreateCustomerSteps
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
      </DialogContent>
    </Dialog>
  )
}
