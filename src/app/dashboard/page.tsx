import { DotsHorizontalIcon, DotsVerticalIcon } from '@radix-ui/react-icons'
import { Info, RefreshCw } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Icons } from '@/components/ui/icons'
import { Input } from '@/components/ui/input'
import { CustomerUsingCreditList } from '@/components/dashboard/customer-using-credit'
import { Overview } from '@/components/dashboard/overview'
import { RenderCards } from '@/components/dashboard/render-cards'
import { InvoicesFromCustomer } from '@/components/dashboard/tables/invoices-from-customers'

export default function DashboardPage() {
  return (
    <main>
      <div className="hidden flex-col gap-10 md:flex">
        <div className="flex flex-col gap-5 p-8 pt-6">
          <div className="flex w-full flex-col gap-5">
            <RenderCards />
            <div className="col-auto my-2 flex w-full items-start gap-10">
              <Card className="size-full">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between gap-2 py-2">
                    <div className="flex items-center gap-2">
                      <Icons.overview className="size-5" />
                      <span>Total de notas emitidas</span>
                      <Info className="text-primary/60 size-3" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Input
                        value={'Ano: 2024'}
                        className="w-28 bg-[#F1F5F9]"
                      />
                      <Button
                        variant="ghost"
                        className="bg-[#F1F5F9]"
                        size="icon"
                      >
                        <RefreshCw className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        className="bg-[#F1F5F9]"
                        size="icon"
                      >
                        <DotsVerticalIcon className="size-4" />
                      </Button>
                    </div>
                  </CardTitle>
                  <div className="flex w-full items-center justify-between">
                    <div className="flex flex-col">
                      <div className="flex flex-row items-center gap-1">
                        <span className="font-bold">Total:</span>
                        <span className="font-bold">1.589</span>
                      </div>
                      <span className="text-xs font-light">
                        Notas validadas
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1">
                        <div className="size-2 rounded-full bg-[#FF005A]" />
                        <span className="text-xs text-[#7D93B8]">NFe</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <div className="size-2 rounded-full bg-[#DC005F]" />
                        <span className="text-xs text-[#7D93B8]">NFCe</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <div className="size-2 rounded-full bg-[#B90064]" />
                        <span className="text-xs text-[#7D93B8]">NFSe</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <div className="size-2 rounded-full bg-[#950068]" />
                        <span className="text-xs text-[#7D93B8]">CTe</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <div className="size-2 rounded-full bg-[#72006D]" />
                        <span className="text-xs text-[#7D93B8]">CTe OS</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <div className="size-2 rounded-full bg-[#4F0072]" />
                        <span className="text-xs text-[#7D93B8]">MDFe</span>
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pl-2">
                  <Overview />
                </CardContent>
              </Card>
              <Card className="size-full">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between gap-2 py-2">
                    <div className="flex items-center gap-2">
                      <Icons.overview className="size-5" />
                      <span>Últimas Emissões de Notas</span>
                      <Info className="text-primary/60 size-3" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Input
                        value={'Ano: 2024'}
                        className="w-28 bg-[#F1F5F9]"
                      />
                      <Button
                        variant="ghost"
                        className="bg-[#F1F5F9]"
                        size="icon"
                      >
                        <RefreshCw className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        className="bg-[#F1F5F9]"
                        size="icon"
                      >
                        <DotsVerticalIcon className="size-4" />
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <InvoicesFromCustomer />
                </CardContent>
              </Card>
            </div>
            <Card className="size-full">
              <CardHeader>
                <CardTitle className="flex items-center justify-between gap-2 py-2">
                  <div className="flex items-center gap-2">
                    <Icons.overview className="size-5" />
                    <span>
                      Clientes que Mais Utilizaram os Créditos da Assinatura
                    </span>
                    <Info className="text-primary/60 size-3" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Input value={'Ano: 2024'} className="w-28 bg-[#F1F5F9]" />
                    <Button
                      variant="ghost"
                      className="bg-[#F1F5F9]"
                      size="icon"
                    >
                      <RefreshCw className="size-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      className="bg-[#F1F5F9]"
                      size="icon"
                    >
                      <DotsVerticalIcon className="size-4" />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <CustomerUsingCreditList />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
