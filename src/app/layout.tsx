import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { Header } from '@/components/layout/header'
import { ToastContainer } from '@/components/ui/toast'
import config from '@/config/constants.json'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: config.app.title,
  description: config.app.description,
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon.svg',
  },
  manifest: '/manifest.json',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Providers>
          <Header />
          <main className="min-h-screen-nav">{children}</main>
          <ToastContainer />
        </Providers>
      </body>
    </html>
  )
}
