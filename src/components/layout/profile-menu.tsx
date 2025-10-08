'use client'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import config from '@/config/constants.json'

export const ProfileMenu = () => {
  const [profileOpen, setProfileOpen] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={profileRef}>
      <button
        onClick={() => setProfileOpen(!profileOpen)}
        className="w-8 h-8 rounded bg-primary flex items-center justify-center text-sm font-semibold hover:bg-primary/80 transition-colors"
        aria-label="Profile menu"
      >
        U
      </button>

      {profileOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-background-secondary border border-text-secondary/20 rounded-lg shadow-xl overflow-hidden">
          <Link
            href="/profile"
            className="block px-4 py-3 text-sm hover:bg-background-tertiary transition-colors"
            onClick={() => setProfileOpen(false)}
          >
            {config.profile.accountLabel}
          </Link>
          <Link
            href={config.routes.myList}
            className="block px-4 py-3 text-sm hover:bg-background-tertiary transition-colors"
            onClick={() => setProfileOpen(false)}
          >
            {config.profile.myListLabel}
          </Link>
          <hr className="border-text-secondary/20" />
          <button
            className="w-full text-left px-4 py-3 text-sm hover:bg-background-tertiary transition-colors"
            onClick={() => setProfileOpen(false)}
          >
            {config.profile.signOutLabel}
          </button>
        </div>
      )}
    </div>
  )
}
