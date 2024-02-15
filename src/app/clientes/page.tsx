import { Users } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DialogNewCustomer } from '@/components/customers/dialog-new-customer'
import { ListCustomers } from '@/components/customers/list-customers'

const cards = [
  {
    title: 'Clientes cadastrados',
    value: 120,
    icon: <Users className="size-5" />,
    color: 'bg-gray900 text-gray900 border-l-gray900',
  },
  {
    title: 'Clientes ativos',
    value: 90,
    icon: <Users className="size-5" />,
    color: 'bg-primary text-primary border-l-primary',
  },
  {
    title: 'Clientes bloqueados',
    value: 15,
    icon: <Users className="size-5" />,
    color: 'bg-[#C40062] text-[#C40062] border-l-[#C40062]',
  },
  {
    title: 'Clientes inativos',
    value: 5,
    icon: <Users className="size-5" />,
    color: 'bg-secondary text-secondary border-l-secondary',
  },
]

export default function page() {
  return (
    <div className="hidden flex-col gap-4 md:flex">
      <span className="text-primary font-semibold text-xl mt-4 mb-2">
        Clientes
      </span>
      <div className="w-full flex flex-row gap-10 my-2">
        {cards.map((card, index) => (
          <div
            className={cn(
              'bg-card w-full items-start flex pr-2 py-5 flex-col shadow-default rounded-2xl'
            )}
          >
            <div
              className={cn(
                card.color,
                'bg-card min-w-[220px] w-full items-start flex flex-col rounded-e-2xl pl-4 border-l-4 '
              )}
            >
              <div className={cn('self-end p-3 rounded-full')}>{card.icon}</div>
              <div className="text-2xl font-bold">{card.value}</div>
              <span
                className={cn('text-xs font-medium bg-none text-[#718EBF]/80')}
              >
                {card.title}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full">
        <Card className="w-full">
          <CardHeader className="flex mb-2 flex-row items-center w-full justify-end">
            <DialogNewCustomer />
          </CardHeader>
          <CardContent>
            <ListCustomers />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
