import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import NavbarLayout from './navbar/nav'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Progress Tracker',
  description: 'Track your progress',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavbarLayout>
          {children}
        </NavbarLayout>
      </body>
    </html>
  )
}
