'use client'

import Link from 'next/link'
import { Navigation } from './navigation'
import { SearchBar } from './search-bar'
import { ProfileMenu } from './profile-menu'
import config from '@/config/constants.json'

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-background-primary to-transparent">
      <nav className="px-4 md:px-8 lg:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href={config.routes.home} className="flex items-center">
            <h1 className="text-2xl md:text-3xl font-bold text-primary">{config.app.name}</h1>
          </Link>

          <Navigation className="hidden md:flex items-center gap-6" />
        </div>

        <div className="flex items-center gap-4">
          <SearchBar />
          <ProfileMenu />
        </div>
      </nav>
    </header>
  )
}
