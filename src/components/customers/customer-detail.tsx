'use client'

import { FormInput } from '@/shared/form/FormInput'
import { CustomerDetailsSchema } from '@/validations/customer-details'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  BookMarkedIcon,
  Contact,
  Mail,
  MapPinned,
  NotepadText,
  Phone,
  User2,
} from 'lucide-react'
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
import { Label } from '../ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
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
    <div className="flex size-full flex-row items-start gap-10">
      <Card className="w-1/4">
        <CardHeader>
          <CardTitle>Detalhes</CardTitle>
          <CardDescription>Informações do cliente</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <User2 className="size-6" />
            <div className="flex flex-col items-start">
              <span className="font-sans text-sm font-bold">Nome: </span>
              <span className="font-sans text-sm font-light">
                {customer.fullName}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="size-6" />
            <div className="flex flex-col items-start">
              <span className="font-sans text-sm font-bold">Email: </span>
              <span className="font-sans text-sm font-light">
                {customer.email}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Phone className="size-6" />
            <div className="flex flex-col items-start">
              <span className="font-sans text-sm font-bold">Telefone: </span>
              <span className="font-sans text-sm font-light">
                {customer.phone}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <MapPinned className="size-6" />
            <div className="flex flex-col items-start">
              <span className="font-sans text-sm font-bold">Endereço: </span>
              <span className="font-sans text-sm font-light">
                {`${customer.address.cep} - ${customer.address.street}, 
                ${customer.address.district}, 
                ${customer.address.city} / ${customer.address.state}
                 - ${customer.address.country}`}
              </span>
            </div>
          </div>
          <div className="mb-3 flex flex-col gap-2">
            <span className="font-sans text-sm font-bold">Módulos:</span>
            <div className="flex flex-row flex-wrap items-center gap-4">
              {customer.modules.map((module) => (
                <div key={module} className="flex items-center gap-2">
                  <span className="font-sans text-sm">{module}</span>
                  <Switch key={module} value={module} />
                </div>
              ))}
            </div>
          </div>
          <div>
            <Label>Status</Label>
            <div>
              <Select>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Ativo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup className="max-h-52">
                    {[
                      {
                        label: 'Ativo',
                        value: '1',
                      },
                      {
                        label: 'Inativo',
                        value: '0',
                      },
                      {
                        label: 'Bloqueado',
                        value: '2',
                      },
                    ].map((item, index) => {
                      return (
                        <SelectItem key={index} value={String(item.value)}>
                          {item.label}
                        </SelectItem>
                      )
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
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
                <span className="font-sans text-sm font-bold">
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
                  <div className="flex w-full flex-row gap-2">
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
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="tab-1" className="font-sans text-sm">
                Notas Fiscais
              </TabsTrigger>
              <TabsTrigger value="tab-2" className="font-sans text-sm">
                DAS/MEI
              </TabsTrigger>
              <TabsTrigger value="tab-3" className="font-sans text-sm">
                Certificado
              </TabsTrigger>
            </TabsList>
            <TabsContent value="tab-1">
              <InvoiceList />
            </TabsContent>
            <TabsContent value="tab-2">Tab 2 content</TabsContent>
            <TabsContent value="tab-3">Tab 3 content</TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
