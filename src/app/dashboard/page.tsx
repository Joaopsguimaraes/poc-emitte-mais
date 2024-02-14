import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CalendarDateRangePicker } from '@/components/dashboard/date-range-picker'
import { Overview } from '@/components/dashboard/overview'
import { RenderCards } from '@/components/dashboard/render-cards'
import { InvoicesFromCustomer } from '@/components/dashboard/tables/invoices-from-customers'

export default function DashboardPage() {
  return (
    <main>
      <Tabs defaultValue="account" className="mt-5 w-full">
        <div className="hidden flex-col md:flex">
          <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex w-full items-center justify-between space-y-4">
              <h2 className="text-secondary text-2xl font-bold tracking-tight">Visão geral</h2>
              <TabsList className="bg-primary flex items-center justify-end p-2">
                <TabsTrigger value="account">Notas Fiscais</TabsTrigger>
                <TabsTrigger value="password">Gestão</TabsTrigger>
              </TabsList>
            </div>
            <div className="flex w-full flex-col space-y-4">
              <RenderCards />
              <div className="row-auto my-2 grid w-full space-y-4">
                <Card className="col-span-full">
                  <CardHeader>
                    <CardTitle>Overview das notas emitidas</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Overview />
                  </CardContent>
                </Card>
                <div className="col-span-full flex w-full items-center gap-5">
                  <Card className="w-full">
                    <CardHeader>
                      <CardTitle>Notas emitidas por cliente</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <InvoicesFromCustomer />
                    </CardContent>
                  </Card>
                  <Card className="w-full">
                    <CardHeader>
                      <CardTitle>Certificados proximo ao vencimento</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <InvoicesFromCustomer />
                    </CardContent>
                  </Card>
                </div>
                <div className="col-span-full flex w-full items-center gap-5">
                  <Card className="w-full">
                    <CardHeader>
                      <CardTitle>
                        Relação de Notas Validadas x Canceladas
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <InvoicesFromCustomer />
                    </CardContent>
                  </Card>
                  <Card className="w-full">
                    <CardHeader>
                      <CardTitle>Clientes Inativos</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <InvoicesFromCustomer />
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Tabs>
    </main>
  )
}
