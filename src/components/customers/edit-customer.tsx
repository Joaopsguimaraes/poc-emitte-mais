import { FormFieldsConstant } from '@/@types/form-field'
import { FormRender } from '@/shared/form/FormRender'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '../ui/button'
import { DialogClose, DialogContent } from '../ui/dialog'

const editCustomerSchema = z.object({
  id: z.string(),
  customerType: z.string({
    required_error: 'Tipo pessoa é obrigatório, selecione física ou jurídica',
  }),
  document: z
    .string({
      required_error: 'CPF ou CNPJ é obrigatório',
    })
    .max(18, {
      message: 'CPF ou CNPJ inválido',
    })
    .min(9, {
      message: 'CPF ou CNPJ inválido',
    }),
  state: z
    .string({
      required_error: 'Estado é obrigatório',
    })
    .optional(),
  fullName: z.string({
    required_error: 'Razão social é obrigatório',
  }),
  shortName: z.string({
    required_error: 'Nome fantasia é obrigatório',
  }),
  email: z
    .string({
      required_error: 'E-mail é obrigatório',
    })
    .email(),
  phone: z.string({
    required_error: 'Telefone é obrigatório',
  }),
  inscricaoEstadual: z.string().optional(),
  inscricaoMunicipal: z.string().optional(),
})

export type EditCustomerSchema = z.infer<typeof editCustomerSchema>

export function EditCustomer() {
  const form = useForm<EditCustomerSchema>({
    resolver: zodResolver(editCustomerSchema),
  })

  function onSubmit(data: EditCustomerSchema) {
    console.log(data)
  }

  const FIELDS: FormFieldsConstant<EditCustomerSchema> = [
    [
      {
        name: 'customerType',
        label: 'Tipo pessoa',
        className: 'col-span-4',
        type: 'select',
        options: [
          { value: 'J', label: 'Juridica' },
          { value: 'F', label: 'Fisica' },
        ],
        translateKey: 'Tipo pessoa',
      },
      {
        name: 'document',
        translateKey: `${form.watch('customerType') === 'F' ? 'CPF' : 'CNPJ'}`,
        placeholderKey: `${form.watch('customerType') === 'F' ? 'Ex: 000.000.000-00' : 'Ex: 00.000.000/0000-00'}`,
        type: `${form.watch('customerType') === 'F' ? 'cpf' : 'cnpj'}`,
        className: 'col-span-8',
      },
    ],
    [
      {
        name: 'fullName',
        translateKey: 'Razão social',
        placeholderKey: 'Ex: Lorem Ipsum company',
        type: 'text',
        className: 'col-span-10 md:col-span-6',
      },
      {
        name: 'shortName',
        translateKey: 'Fantasia',
        placeholderKey: 'Ex: Lorem Ipsum',
        type: 'text',
        className: 'col-span-10 md:col-span-6',
      },
    ],
    [
      {
        name: 'inscricaoEstadual',
        translateKey: 'Inscrição Estadual',
        placeholderKey: 'Ex: 00000000',
        type: 'text',
        className: 'col-span-2',
      },
      {
        name: 'inscricaoMunicipal',
        translateKey: 'Inscrição Municipal',
        placeholderKey: 'Ex: 00000',
        type: 'text',
        className: 'col-span-2',
      },
      {
        name: 'email',
        translateKey: 'E-mail',
        placeholderKey: 'Ex: lorem.ipsum@lorem-company.com',
        type: 'text',
        className: 'col-span-4',
      },
      {
        name: 'phone',
        translateKey: 'Telefone',
        placeholderKey: 'Ex: (62) 99999-9999',
        type: 'tel',
        className: 'col-span-4',
      },
    ],
  ]
  return (
    <DialogContent>
      <FormRender<EditCustomerSchema>
        constant={FIELDS}
        form={form}
        onSubmit={onSubmit}
      >
        <div className="flex w-full items-center justify-end gap-4">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? (
              <Loader className="animate-spin" />
            ) : (
              'Editar'
            )}
          </Button>
        </div>
      </FormRender>
    </DialogContent>
  )
}
