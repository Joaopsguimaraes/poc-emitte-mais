'use client'

import { FormInput } from '@/shared/form/FormInput'
import { CustomerDetailsSchema } from '@/validations/customer-details'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { cn } from '@/lib/utils'

import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from '../ui/dialog'
import { Switch } from '../ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { InvoiceList } from './invoice-list'

const createUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
})

type CreateUserSchema = z.infer<typeof createUserSchema>

interface CustomerDetailProps {
  customer: CustomerDetailsSchema
}

export function CustomerDetail({ customer }: CustomerDetailProps) {
  const form = useForm<CreateUserSchema>({
    resolver: zodResolver(createUserSchema),
  })

  function onSubmit(data: CreateUserSchema) {
    console.log(data)
  }

  return (
    <div className="size-full flex items-start flex-row gap-10">
      <Card className="w-1/4">
        <CardHeader>
          <CardTitle>Detalhes</CardTitle>
          <CardDescription>Informações do cliente</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="font-bold font-sans text-sm">Nome: </span>
            <span className="font-sans text-sm font-normal">
              {customer.fullName}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold font-sans text-sm">Email: </span>
            <span className="font-sans text-sm font-normal">
              {customer.email}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold font-sans text-sm">Telefone: </span>
            <span className="font-sans text-sm font-normal">
              {customer.phone}
            </span>
          </div>
          <div className="flex items-center flex-col gap-2">
            <div className="w-full flex flex-col items-start gap-2">
              <div className="w-full flex flex-row gap-4">
                <span className="font-bold font-sans text-sm">Rua:</span>
                <span className="font-sans text-sm font-normal">
                  {customer.address.street}
                </span>
              </div>
              <div className="w-full flex flex-row gap-4">
                <span className="font-bold font-sans text-sm">Bairro:</span>
                <span className="font-sans text-sm font-normal">
                  {customer.address.district}
                </span>
              </div>
              <div className="w-full flex flex-row gap-4">
                <span className="font-bold font-sans text-sm">Cidade:</span>
                <span className="font-sans text-sm font-normal">
                  {customer.address.city}
                </span>
              </div>
              <div className="w-full flex flex-row gap-4">
                <span className="font-bold font-sans text-sm">Estado:</span>
                <span className="font-sans text-sm font-normal">
                  {customer.address.state}
                </span>
              </div>
              <div className="w-full flex flex-row gap-4">
                <span className="font-bold font-sans text-sm">País:</span>
                <span className="font-sans text-sm font-normal">
                  {customer.address.country}
                </span>
              </div>
              <div className="w-full flex flex-row gap-4">
                <span className="font-bold font-sans text-sm">CEP:</span>
                <span className="font-sans text-sm font-normal">
                  {customer.address.cep}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 mb-3">
            <span className="font-bold font-sans text-sm">Módulos:</span>
            <div className="flex flex-row items-center gap-4 flex-wrap">
              {customer.modules.map((module) => (
                <div className="flex items-center gap-2">
                  <span className="font-sans text-sm">{module}</span>
                  <Switch key={module} value={module} />
                </div>
              ))}
            </div>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default" type="button" className="w-full ">
                Cadastrar usuário
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <span className="font-bold font-sans text-sm">
                  Cadastro de usuário
                </span>
              </DialogHeader>
              <DialogDescription>
                Preencha os campos abaixo para cadastrar um novo usuário
              </DialogDescription>
              <FormProvider {...form}>
                <form
                  className="flex flex-col gap-2"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <FormInput
                    label="Nome"
                    name="name"
                    type="text"
                    placeholder="Nome"
                    className={cn('input', 'w-full')}
                  />
                  <FormInput
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    className={cn('input', 'w-full')}
                  />
                  <div className="w-full flex flex-row gap-2">
                    <DialogClose asChild>
                      <Button
                        variant="outline"
                        type="button"
                        className="w-full"
                      >
                        Cancelar
                      </Button>
                    </DialogClose>
                    <Button variant="default" type="submit" className="w-full">
                      Cadastrar
                    </Button>
                  </div>
                </form>
              </FormProvider>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
      <Card className="w-3/4">
        <CardContent className="pt-3">
          <Tabs defaultValue="tab-1">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="tab-1" className='text-sm font-sans'>Notas Fiscais</TabsTrigger>
              <TabsTrigger value="tab-2" className='text-sm font-sans'>Vencimentos</TabsTrigger>
            </TabsList>
            <TabsContent value="tab-1">
              <InvoiceList />
            </TabsContent>
            <TabsContent value="tab-2">Tab 2 content</TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
