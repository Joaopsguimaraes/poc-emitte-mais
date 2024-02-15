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
    color: 'bg-background text-primary',
  },
  {
    title: 'Clientes ativos',
    value: 90,
    icon: <Users className="size-5" />,
    color: 'bg-background text-primary',
  },
  {
    title: 'Clientes bloqueados',
    value: 15,
    icon: <Users className="size-5" />,
    color: 'bg-background text-secondary',
  },
  {
    title: 'Clientes inativos',
    value: 5,
    icon: <Users className="size-5" />,
    color: 'bg-background text-secondary',
  },
]

export default function page() {
  return (
    <div className="hidden flex-col gap-4 md:flex">
      <span className="text-primary font-semibold text-xl mt-4 mb-2">Clientes</span>
      <div className="w-full flex flex-row gap-10 my-2">
        {cards.map((card, index) => (
          <Card key={index} className={cn(card.color, 'w-full')}>
            <CardContent className="pt-5 flex flex-col w-full gap-2">
              <div className="flex flex-row items-center w-full justify-between">
                <div className="w-full">
                  <div className="flex w-full justify-between items-center">
                    <span className="text-2xl">{card.value}</span>
                    {card.icon}
                  </div>
                </div>
              </div>
              <span className="text-sm font-semibold opacity-70">
                {card.title}
              </span>
            </CardContent>
          </Card>
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
