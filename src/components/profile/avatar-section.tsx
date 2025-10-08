'use client'

import { useMemo } from 'react'
import Image from 'next/image'
import config from '@/config/constants.json'

interface AvatarSectionProps {
  user: any
  avatarPreview: string
  handleAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const AvatarSection = ({ user, avatarPreview, handleAvatarChange }: AvatarSectionProps) => {
  const userInitial = useMemo(() => {
    if (user?.name) return user.name.charAt(0).toUpperCase()
    if (user?.email) return user.email.charAt(0).toUpperCase()
    return 'U'
  }, [user])

  return (
    <div className="flex-shrink-0">
      <div className="relative">
        {avatarPreview ? (
          <div className="w-32 h-32 rounded-lg overflow-hidden bg-background-tertiary">
            <Image
              src={avatarPreview}
              alt="Profile"
              width={128}
              height={128}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-32 h-32 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-4xl font-bold text-white">{userInitial}</span>
          </div>
        )}
        <label
          htmlFor="avatar-upload"
          className="absolute bottom-0 right-0 bg-white text-black p-2 rounded-full cursor-pointer hover:bg-gray-200 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
        </label>
      </div>
      <p className="text-xs text-text-secondary mt-2 text-center">
        {config.profile.avatarChangeLabel}
      </p>
    </div>
  )
}
