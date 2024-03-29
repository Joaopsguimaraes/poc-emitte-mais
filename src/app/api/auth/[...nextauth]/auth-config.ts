import NextAuth, { type AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'E-mail',
          type: 'text',
          placeholder: 'empresa@email.com',
        },
        password: { label: 'Senha', type: 'password' },
      },
      async authorize(credentials, req) {
        const response = await fetch('http://localhost:3333/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials),
        })

        const user = await response.json()

        if (user) {
          return user
        } else {
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: '/',
  },
}

export default NextAuth(authOptions)
