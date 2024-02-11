import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CalendarDateRangePicker } from '@/components/dashboard/date-range-picker'
import { Overview } from '@/components/dashboard/overview'
import { RenderCards } from '@/components/dashboard/render-cards'
import { InvoicesFromCustomer } from '@/components/dashboard/tables/invoices-from-customers'

export default function DashboardPage() {
  return (
    <main>
      <div className="hidden flex-col md:flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">Visão geral</h2>
            <div className="flex items-center space-x-2">
              <CalendarDateRangePicker />
            </div>
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
    </main>
  )
}
