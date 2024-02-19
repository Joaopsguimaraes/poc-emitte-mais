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
      <div className="my-2 flex w-full flex-row gap-10">
        {cards.map((card, index) => (
          <div
            key={index}
            className={cn(
              'bg-card shadow-default flex w-full flex-col items-start rounded-2xl py-5 pr-2'
            )}
          >
            <div
              className={cn(
                card.color,
                'bg-card flex w-full min-w-[220px] flex-col items-start rounded-e-2xl border-l-4 pl-4 '
              )}
            >
              <div className={cn('self-end rounded-full p-3')}>{card.icon}</div>
              <div className="text-2xl font-bold">{card.value}</div>
              <span
                className={cn('bg-none text-xs font-medium text-[#718EBF]/80')}
              >
                {card.title}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full">
        <Card className="w-full">
          <CardHeader className="mb-2 flex w-full flex-row items-center justify-end">
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
