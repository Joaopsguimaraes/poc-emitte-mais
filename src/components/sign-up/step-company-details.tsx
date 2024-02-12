import { DocumentType, documentTypeOptions } from '@/constants/document-type'
import { SignUpFormSchema } from '@/validations/sign-up'
import { useFormContext } from 'react-hook-form'

import { cnpjMask, cpfMask, IEMask } from '@/lib/maskter'
import { cn } from '@/lib/utils'
import { useSignUp } from '@/hooks/use-sign-up'

import { Button } from '../ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

export function StepCompanyDetails() {
  const form = useFormContext<SignUpFormSchema>()
  const { activeStep, setActiveStep } = useSignUp()

  function handleNextStep() {
    setActiveStep(activeStep + 1)
  }

  function handlePreviousStep() {
    setActiveStep(activeStep - 1)
  }

  return (
    <li>
      <div className="my-2 grid gap-5">
        <div className="flex flex-col space-y-2">
          <FormField
            control={form.control}
            name="document_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de pessoa</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(event: string) => field.onChange(event)}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup className="max-h-52">
                        {documentTypeOptions.map((item, index) => {
                          return (
                            <SelectItem key={index} value={String(item.value)}>
                              {item.label}
                            </SelectItem>
                          )
                        })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="document_id"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-2">
                <FormLabel>CNPJ / CPF</FormLabel>
                <FormControl>
                  <Input
                    className={cn('h-12 bg-white dark:bg-black')}
                    onChange={(e) => {
                      form.watch('document_type') ===
                      DocumentType.NATURAL_PERSON
                        ? field.onChange(cpfMask.onChange(e))
                        : field.onChange(cnpjMask.onChange(e))
                    }}
                    value={field.value}
                    width="full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="company_name"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-2">
                <FormLabel>Razão Social</FormLabel>
                <FormControl>
                  <Input
                    className={cn('h-12 bg-white dark:bg-black')}
                    onChange={field.onChange}
                    value={field.value}
                    width="full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="trading_name"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-2">
                <FormLabel>Fantasia</FormLabel>
                <FormControl>
                  <Input
                    className={cn('h-12 bg-white dark:bg-black')}
                    onChange={field.onChange}
                    value={field.value}
                    width="full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="job_position"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-2">
                <FormLabel>Cargo</FormLabel>
                <FormControl>
                  <Input
                    className={cn('h-12 bg-white dark:bg-black')}
                    onChange={field.onChange}
                    value={field.value}
                    width="full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="crc"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-2">
                <FormLabel>CRC</FormLabel>
                <FormControl>
                  <Input
                    className={cn('h-12 bg-white dark:bg-black')}
                    onChange={(e) => field.onChange(IEMask.onChange(e))}
                    placeholder="Ex: SP-123456"
                    value={field.value}
                    width="full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="button" onClick={handleNextStep}>
            Continuar
          </Button>
          {activeStep > 0 && (
            <Button
              type="button"
              variant="outline"
              onClick={handlePreviousStep}
            >
              Voltar
            </Button>
          )}
        </div>
      </div>
    </li>
  )
}
