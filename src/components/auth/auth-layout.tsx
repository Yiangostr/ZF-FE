'use client'

import Link from 'next/link'
import config from '@/config/constants.json'

interface AuthLayoutProps {
  children: React.ReactNode
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-black relative">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{
          backgroundImage: `url('${config.auth.backgroundImage}')`,
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />

      <div className="relative z-10 px-4 py-6">
        <div className="max-w-md mx-auto">
          <Link href="/">
            <h1 className="text-red-600 text-4xl font-bold mb-8">{config.app.name}</h1>
          </Link>
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-center px-4 pb-20">
        <div className="bg-black/75 rounded-md p-16 w-full max-w-md">{children}</div>
      </div>
    </div>
  )
}

