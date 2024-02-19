import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { UserAuthForm } from '@/components/sign-in/sign-in-component'
import { redirect } from 'next/navigation'

export default function Page() {
  redirect('/dashboard')
  // return (
  //   <>
  //     <div className="md:hidden">
  //       <Image
  //         src="/emitte-mais-logo.svg"
  //         width={1280}
  //         height={843}
  //         alt="Authentication"
  //       />
  //     </div>
  //     <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
  //       <div className="bg-primary flex h-full items-center justify-center text-lg font-medium">
  //         <Image
  //           src="/emitte-mais-logo.svg"
  //           width={600}
  //           height={600}
  //           alt="Authentication"
  //         />
  //       </div>
  //       <div className="lg:p-8">
  //         <div className="mx-auto flex w-full flex-col items-center justify-center space-y-6 sm:w-[350px]">
  //           <div className="flex flex-col space-y-2 text-center">
  //             <h1 className="text-2xl font-semibold tracking-tight">
  //               Seja bem-vindo de volta
  //             </h1>
  //             <p className="text-muted-foreground text-sm">
  //               Olá parceiro, vamos produzir?
  //             </p>
  //           </div>
  //           <UserAuthForm />
  //           <p className="text-muted-foreground px-8 text-center text-sm">
  //             Ao continuar, voce concorda com nossos{' '}
  //             <Link
  //               href="/terms"
  //               className="hover:text-primary underline underline-offset-4"
  //             >
  //               Termos de serviço
  //             </Link>{' '}
  //             e{' '}
  //             <Link
  //               href="/privacy"
  //               className="hover:text-primary underline underline-offset-4"
  //             >
  //               Politica de privacidade
  //             </Link>
  //             .
  //           </p>
  //         </div>
  //       </div>
  //     </div>
  //   </>
  // )
}
