import { NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'

const authOption: NextAuthOptions = {
  session: {
    strategy: 'jwt'
  }, 
  providers:[
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || '',
      clientSecret: process.env.GOOGLE_SECRET || ''
    })
  ]
}

const handler = NextAuth(authOption)
export { handler as GET, handler as POST  }
