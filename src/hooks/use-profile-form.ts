import { useState, useCallback } from 'react'
import { useAppSelector } from '@/hooks/use-app-settings'
import { store } from '@/store'
import config from '@/config/constants.json'

export const useProfileForm = () => {
  const user = useAppSelector((state) => state.user.user)
  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [avatarPreview, setAvatarPreview] = useState(user?.profileImage || '')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  const handleAvatarChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const updateProfile = useCallback(async () => {
    const token = store.getState().user.token
    if (!token) {
      setMessage(config.profile.notAuthenticatedError)
      return false
    }

    const profileUpdates: { email?: string; name?: string; profileImage?: string } = {}
    if (name !== user?.name) profileUpdates.name = name
    if (email !== user?.email) profileUpdates.email = email
    if (avatarPreview !== user?.profileImage) profileUpdates.profileImage = avatarPreview

    if (Object.keys(profileUpdates).length > 0) {
      const { authApi } = await import('@/features/auth/api')
      const updatedUser = await authApi.updateProfile(token, profileUpdates)

      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(updatedUser))
      }
    }

    return true
  }, [name, email, avatarPreview, user])

  return {
    user,
    name,
    setName,
    email,
    setEmail,
    avatarPreview,
    handleAvatarChange,
    saving,
    setSaving,
    message,
    setMessage,
    updateProfile,
  }
}
