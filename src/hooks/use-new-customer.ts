import { useEffect, useState } from 'react'
import { FormFieldsConstant } from '@/@types/form-field'
import { OptionsField } from '@/@types/options-field'
import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'

import { brasilApi } from '@/lib/axios/brasil-api'
import { getStates } from '@/lib/get-states'

export const stepThreeCreateNewCustomerSchema = z.object({
  isProdutorRural: z
    .boolean({
      required_error: 'Produtor rural é obrigatório',
    })
    .or(
      z.string({
        required_error: 'Produtor rural é obrigatório',
      })
    )
    .transform((val) => (val === 'true' ? true : false)),
  crt: z.string({
    required_error: 'CRT é obrigatório',
  }),
  regimeEspecial: z.string({
    required_error: 'Regime especial é obrigatório',
  }),
})

export const stepOneCreateCustomerSchema = z.object({
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

export const stepTwoCreateCustomerSchema = z.object({
  address: z.object({
    street: z.string({
      required_error: 'Rua é obrigatório',
    }),
    number: z.string().optional(),
    complement: z.string().optional(),
    district: z.string({
      required_error: 'Bairro é obrigatório',
    }),
    city: z.string({
      required_error: 'Cidade é obrigatório',
    }),
    state: z.string({
      required_error: 'Estado é obrigatório',
    }),
    country: z.string({
      required_error: 'País é obrigatório',
    }),
    cep: z.string({
      required_error: 'CEP é obrigatório',
    }),
  }),
})

export type StepOneCreateCustomerSchema = z.infer<
  typeof stepOneCreateCustomerSchema
>
export type StepTwoCreateCustomerSchema = z.infer<
  typeof stepTwoCreateCustomerSchema
>
export type StepThreeCreateNewCustomerSchema = z.infer<
  typeof stepThreeCreateNewCustomerSchema
>

export function useNewCustomer<T>(form: UseFormReturn<T | any>) {
  const [states, setStates] = useState<OptionsField[]>([])

  async function getStatesAsync() {
    const states = await getStates()
    return states
  }

  useEffect(() => {
    getStatesAsync().then((states) => setStates(states))
  }, [])

  const STEP_ONE_FIELDS: FormFieldsConstant<StepOneCreateCustomerSchema> = [
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

  const STEP_TWO_FIELDS: FormFieldsConstant<StepTwoCreateCustomerSchema> = [
    [
      {
        name: 'address.cep' as keyof StepTwoCreateCustomerSchema,
        translateKey: 'CEP',
        placeholderKey: 'Ex: 00000-000',
        type: 'zipcode',
        className: 'col-span-10 md:col-span-6',
      },
      {
        name: 'address.street' as keyof StepTwoCreateCustomerSchema,
        translateKey: 'Rua',
        placeholderKey: 'Ex: Rua Lorem Ipsum',
        type: 'text',
        className: 'col-span-10 md:col-span-6',
      },
      {
        name: 'address.number' as keyof StepTwoCreateCustomerSchema,
        translateKey: 'Número',
        placeholderKey: 'Ex: 000',
        type: 'text',
        className: 'col-span-10 md:col-span-6',
      },
      {
        name: 'address.complement' as keyof StepTwoCreateCustomerSchema,
        translateKey: 'Complemento',
        placeholderKey: 'Ex: Casa, Apartamento, Bloco',
        type: 'text',
        className: 'col-span-10 md:col-span-6',
      },
      {
        name: 'address.district' as keyof StepTwoCreateCustomerSchema,
        translateKey: 'Bairro',
        placeholderKey: 'Ex: Lorem Ipsum',
        type: 'text',
        className: 'col-span-10 md:col-span-6',
      },
      {
        name: 'address.city' as keyof StepTwoCreateCustomerSchema,
        translateKey: 'Cidade',
        placeholderKey: 'Ex: Goiânia',
        type: 'text',
        className: 'col-span-10 md:col-span-6',
      },
      {
        name: 'address.state' as keyof StepTwoCreateCustomerSchema,
        translateKey: 'Estado',
        placeholderKey: 'Ex: Goiás',
        type: 'text',
        className: 'col-span-10 md:col-span-6',
      },
      {
        name: 'address.country' as keyof StepTwoCreateCustomerSchema,
        translateKey: 'País',
        placeholderKey: 'Ex: Brasil',
        type: 'text',
        className: 'col-span-10 md:col-span-6',
      },
    ],
  ]

  const STEP_THREE_FIELDS: FormFieldsConstant<StepThreeCreateNewCustomerSchema> =
    [
      [
        {
          name: 'isProdutorRural',
          label: 'Produtor Rural',
          className: 'col-span-2',
          type: 'select',
          options: [
            { value: 'false', label: 'Não' },
            { value: 'true', label: 'Sim' },
          ],
          translateKey: 'Produtor Rural',
        },
        {
          name: 'crt',
          label: 'CRT',
          className: 'col-span-2',
          type: 'select',
          options: [
            { value: 'simples_nacional', label: 'Simples nacional' },
            {
              value: 'simples_nacional_receita_bruta',
              label: 'Simples nacional, excesso sublimite da receita bruta',
            },
            { value: 'regime_normal', label: 'Regime normal' },
          ],
          translateKey: 'CRT',
        },
        {
          name: 'regimeEspecial',
          label: 'Regime Especial',
          className: 'col-span-8',
          type: 'select',
          options: [
            { value: 'sem_regime', label: 'Sem regime especial' },
            {
              value: 'microempresa_municipal',
              label: 'Microempresa Municipal',
            },
            { value: 'estimativa', label: 'Estimativa' },
            {
              value: 'sociedade_profissionais',
              label: 'Sociedade de Profissionais',
            },
            { value: 'cooperativa', label: 'Cooperativa' },
            {
              value: 'microempresa_individual',
              label: 'Microempresa Individual (MEI)',
            },
            {
              value: 'microempresa_empresa_pequeno_porte',
              label: 'Microempresa e Empresa de Porte pequeno (ME / EPP)',
            },
          ],
          translateKey: 'Regime Especial',
        },
      ],
    ]

  return {
    fields: {
      stepOne: STEP_ONE_FIELDS,
      stepTwo: STEP_TWO_FIELDS,
      stepThree: STEP_THREE_FIELDS,
    },
  }
}
