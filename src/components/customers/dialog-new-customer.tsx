'use client'

import { useEffect } from 'react'
import { FormRender } from '@/shared/form/FormRender'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import {
  newCustomerSchema,
  NewCustomerType,
  useNewCustomer,
} from '@/hooks/use-new-customer'

import { Button } from '../ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'

export function DialogNewCustomer() {
  const form = useForm<NewCustomerType>({
    resolver: zodResolver(newCustomerSchema),
    defaultValues: {
      customerType: 'juridica',
    },
  })
  const { fields } = useNewCustomer(form)

  function onSubmit(data: NewCustomerType) {}

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Novo cliente</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-screen-sm md:max-w-screen-sm lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-xl">
        <DialogTitle className="my-2">Novo cliente</DialogTitle>
        <FormRender<NewCustomerType>
          constant={fields}
          form={form}
          onSubmit={onSubmit}
        >
          <div className="flex w-full items-center justify-end gap-4">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit">Salvar</Button>
          </div>
        </FormRender>
      </DialogContent>
    </Dialog>
  )
}
