import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (user) {
          const isValid = await bcrypt.compare(credentials.password, user.password);
          if (isValid) {
            return Promise.resolve(user);
          } else {
            return Promise.reject(new Error('Invalid password'));
          }
        } else {
          return Promise.reject(new Error('No user found'));
        }
      }
    })
  ],

  database: process.env.DATABASE_URL,

  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session(session, token) {
      session.userId = token.id;
      return session;
    }
  }
});
