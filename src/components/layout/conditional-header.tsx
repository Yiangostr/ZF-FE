'use client'

import { usePathname } from 'next/navigation'
import { Header } from './header'

const PUBLIC_ROUTES = ['/login', '/register']

export function ConditionalHeader() {
  const pathname = usePathname()
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname)

  if (isPublicRoute) {
    return null
  }

  return <Header />
}
