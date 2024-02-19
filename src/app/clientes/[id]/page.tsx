import { Metadata } from 'next'
import { CustomerDetailsSchema } from '@/validations/customer-details'
import { faker } from '@faker-js/faker'

import { CustomerDetail } from '@/components/customers/customer-detail'
import { PageListHeader } from '@/components/page-list-header'

const customerFaker: CustomerDetailsSchema = {
  id: faker.string.uuid(),
  status: 'Ativo',
  customerType: 'Pessoa Física',
  document: '000.000.000-00',
  fullName: faker.person.fullName(),
  shortName: faker.person.firstName(),
  email: faker.internet.email(),
  phone: faker.phone.number('(##) #####-####'),
  address: {
    state: faker.location.state(),
    street: faker.location.street(),
    district: faker.location.county(),
    city: faker.location.city(),
    country: faker.location.country(),
    cep: faker.location.zipCode(),
  },
  isProdutorRural: false,
  crt: 'Simples Nacional',
  regimeEspecial: 'Nenhum',
  modules: ['NFe', 'NFSe', 'CTe', 'MDFe'],
}

export async function generateMetadata({
  params: { id },
}: PageParams<{
  id: string
}>): Promise<Metadata> {
  return {
    title: 'Detalhes do cliente',
  }
}

type Props = PageParams<{ id: string }>

export default async function Page({ params }: Props) {
  return (
    <PageListHeader title={`${customerFaker.fullName}`}>
      <CustomerDetail customer={customerFaker} />
    </PageListHeader>
  )
}
