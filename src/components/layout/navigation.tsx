'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import config from '@/config/constants.json'

interface NavigationProps {
  className?: string
}

export const Navigation = ({ className }: NavigationProps) => {
  const pathname = usePathname()

  return (
    <div className={className}>
      <Link
        href={config.routes.home}
        className={`text-sm font-medium transition-colors ${
          pathname === config.routes.home
            ? 'text-text-primary'
            : 'text-text-secondary hover:text-text-primary'
        }`}
      >
        {config.navigation.home}
      </Link>
      <Link
        href={config.routes.trending}
        className={`text-sm font-medium transition-colors ${
          pathname === config.routes.trending
            ? 'text-text-primary'
            : 'text-text-secondary hover:text-text-primary'
        }`}
      >
        {config.navigation.trending}
      </Link>
      <Link
        href={config.routes.myList}
        className={`text-sm font-medium transition-colors ${
          pathname === config.routes.myList
            ? 'text-text-primary'
            : 'text-text-secondary hover:text-text-primary'
        }`}
      >
        {config.navigation.myList}
      </Link>
      <Link
        href={config.routes.notFound}
        className={`text-sm font-medium transition-colors ${
          pathname === config.routes.notFound
            ? 'text-text-primary'
            : 'text-text-secondary hover:text-text-primary'
        }`}
      >
        {config.navigation.notFound}
      </Link>
    </div>
  )
}
