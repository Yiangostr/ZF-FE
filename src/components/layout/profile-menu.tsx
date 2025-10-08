'use client'

import Link from 'next/link'
import { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useAppSelector, useAppDispatch } from '@/hooks/use-app-settings'
import { clearUser } from '@/store/slices/user-slice'
import config from '@/config/constants.json'

export const ProfileMenu = () => {
  const [profileOpen, setProfileOpen] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.user.user)

  const userInitial = useMemo(() => {
    if (user?.name) {
      return user.name.charAt(0).toUpperCase()
    }
    if (user?.email) {
      return user.email.charAt(0).toUpperCase()
    }
    return 'U'
  }, [user])

  const handleSignOut = useCallback(() => {
    dispatch(clearUser())
    setProfileOpen(false)
    router.push('/login')
  }, [dispatch, router])

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
        {userInitial}
      </button>

      {profileOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-background-secondary border border-text-secondary/20 rounded-lg shadow-xl overflow-hidden">
          {user?.name && (
            <div className="px-4 py-3 border-b border-text-secondary/20">
              <p className="text-sm font-semibold">{user.name}</p>
              <p className="text-xs text-text-secondary">{user.email}</p>
            </div>
          )}
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
            onClick={handleSignOut}
          >
            {config.profile.signOutLabel}
          </button>
        </div>
      )}
    </div>
  )
}
