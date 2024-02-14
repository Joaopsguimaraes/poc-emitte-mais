'use client'

import * as React from 'react'
import { FormInput } from '@/shared/form/FormInput'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { cn } from '@/lib/utils'
import { useSignUp } from '@/hooks/use-sign-up'

import { SignUpForm } from '../sign-up/sign-up-form'
import { Button } from '../ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Icons } from '../ui/icons'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

type SignInForm = z.infer<typeof signInSchema>

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const form = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
  })
  const { tabsTrigger } = useSignUp()

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Tabs defaultValue="sign-in" className="w-[500px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="sign-in">Entrar</TabsTrigger>
          <TabsTrigger value="sign-up">Cadastrar-se</TabsTrigger>
        </TabsList>
        <TabsContent value={tabsTrigger}>
          <Card>
            <CardHeader>
              <CardTitle>Entre com seu email e senha</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <FormProvider {...form}>
                <form onSubmit={onSubmit}>
                  <div className="grid gap-5">
                    <FormInput
                      label="E-mail"
                      name="email"
                      placeholder="lorem@email.com"
                    />
                    <FormInput
                      label="Senha"
                      name="password"
                      placeholder="********"
                      type=""
                    />
                  </div>
                </form>
              </FormProvider>
            </CardContent>
            <CardFooter className="grid gap-1">
              <Button disabled={isLoading}>
                {isLoading && (
                  <Icons.spinner className="mr-2 size-4 animate-spin" />
                )}
                Entrar
              </Button>
              <Button variant="outline" disabled={isLoading}>
                {isLoading && (
                  <Icons.spinner className="mr-2 size-4 animate-spin" />
                )}
                Esqueceu sua senha?
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="sign-up">
          <Card>
            <CardHeader>
              <CardTitle>Cadastra-se conosco</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <SignUpForm />
            </CardContent>
            <CardFooter className="grid gap-1"></CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
