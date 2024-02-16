import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Icons } from '@/components/ui/icons'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Overview } from '@/components/dashboard/overview'
import { RenderCards } from '@/components/dashboard/render-cards'
import { InvoicesFromCustomer } from '@/components/dashboard/tables/invoices-from-customers'

export default function DashboardPage() {
  return (
    <main>
      <Tabs defaultValue="account" className="mt-5 w-full">
        <div className="hidden flex-col gap-10 md:flex">
          <div className="flex flex-col gap-5 p-8 pt-6">
            <div className="flex w-full items-center justify-between">
              <h2 className="text-foreground text-2xl font-semibold tracking-tight">
                Visão geral
              </h2>
              <TabsList className="bg-primary flex items-center rounded-full justify-end p-2">
                <TabsTrigger value="account" className="rounded-full">
                  Notas Fiscais
                </TabsTrigger>
                <TabsTrigger value="password" className="rounded-full">
                  Gestão
                </TabsTrigger>
              </TabsList>
            </div>
            <div className="flex w-full flex-col gap-5">
              <RenderCards />
              <div className="col-auto my-2 flex items-start gap-10 w-full">
                <Card className="w-full h-full">
                  <CardHeader>
                    <CardTitle className="flex py-2 items-end gap-2">
                      <Icons.overview className="size-5" />
                      <span>Quantidade de Notas Emitidas por Tipo</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Overview />
                  </CardContent>
                </Card>
                <Card className="w-full h-full">
                  <CardHeader>
                    <CardTitle className="flex items-end gap-2">
                      <Icons.overview className="size-5" />
                      <span>Emissão de Notas em Tempo Real</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <InvoicesFromCustomer />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </Tabs>
    </main>
  )
}
