import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DialogNewCustomer } from '@/components/customers/dialog-new-customer'
import { ListCustomers } from '@/components/customers/list-customers'

export default function page() {
  return (
    <div className="hidden flex-col md:flex">
      <div className="flex-1 space-y-4 p-8 pt-10">
        <div className="flex items-center justify-end space-y-4">
          <div className="flex items-center space-x-2">
            <DialogNewCustomer />
          </div>
        </div>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Clientes cadastrados</CardTitle>
          </CardHeader>
          <CardContent>
            <ListCustomers />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
