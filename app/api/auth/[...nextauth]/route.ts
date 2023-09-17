import { prisma } from '@/app/lib/prisma'
import { NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'

const authOption: NextAuthOptions = {
  session: {
    strategy: 'jwt'
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || '',
      clientSecret: process.env.GOOGLE_SECRET || ''
    })
  ],
  callbacks: {
    async signIn({ account, profile }) {
      console.log({ account, profile })

      if (!profile?.email) {
        throw new Error('No profile')
      }

      const user = await prisma.user.upsert({
        where: {
          email: profile.email,
        },
        create: {
          email: profile.email,
          name: profile.name,
          avatar: profile.image
        },
        update: {
          name: profile.name
        }
      })

      console.log("user", user)
      return true
    },
  }
}

const handler = NextAuth(authOption)
export { handler as GET, handler as POST }
