'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { FormInput } from '@/shared/form/FormInput'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
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
  const router = useRouter()
  const form = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
  })

  async function onSubmit(data: SignInForm) {
    try {
      setIsLoading(true)

      await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      }).then((response) => {
        if (response?.ok) {
          router.replace('/dashboard')
        }
      })
    } catch (error) {
      console.error(error)
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Tabs defaultValue="sign-in" className="w-[500px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="sign-in">Entrar</TabsTrigger>
          <TabsTrigger value="sign-up">Cadastrar-se</TabsTrigger>
        </TabsList>
        <TabsContent value="sign-in">
          <Card>
            <CardHeader>
              <CardTitle>Entre com seu email e senha</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
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
                      type="password"
                    />
                  </div>
                </form>
              </FormProvider>
            </CardContent>
            <CardFooter className="grid gap-1">
              <Button disabled={isLoading} type="submit">
                {isLoading && (
                  <Icons.spinner className="mr-2 size-4 animate-spin" />
                )}
                Entrar
              </Button>
              <Button variant="outline" disabled={isLoading} type="button">
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
