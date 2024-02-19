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
        <CardContent className="space-y-2 gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold">Nome: </span>
            <span>{customer.fullName}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold">Email: </span>
            <span>{customer.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold">Telefone: </span>
            <span>{customer.phone}</span>
          </div>
          <div className="flex items-start flex-col gap-2">
            <div className="w-full flex flex-col items-start gap-2">
              <div className="w-full flex flex-row gap-4">
                <span className="font-bold">Rua:</span>
                <span>{customer.address.street}</span>
              </div>
              <div className="w-full flex flex-row gap-4">
                <span className="font-bold">Bairro:</span>
                <span>{customer.address.district}</span>
              </div>
              <div className="w-full flex flex-row gap-4">
                <span className="font-bold">Cidade:</span>
                <span>{customer.address.city}</span>
              </div>
              <div className="w-full flex flex-row gap-4">
                <span className="font-bold">Estado:</span>
                <span>{customer.address.state}</span>
              </div>
              <div className="w-full flex flex-row gap-4">
                <span className="font-bold">País:</span>
                <span>{customer.address.country}</span>
              </div>
              <div className="w-full flex flex-row gap-4">
                <span className="font-bold">CEP:</span>
                <span>{customer.address.cep}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 mb-4">
            <span className="font-bold">Módulos:</span>
            <div>
              {customer.modules.map((module) => (
                <Badge key={module} variant="tertiary" className="mr-1">
                  {module}
                </Badge>
              ))}
            </div>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default" type="button" className="w-full my-2">
                Cadastrar usuário
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <span className="font-bold">Cadastro de usuário</span>
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
              <TabsTrigger value="tab-1">Notas Fiscais</TabsTrigger>
              <TabsTrigger value="tab-2">Vencimentos</TabsTrigger>
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
