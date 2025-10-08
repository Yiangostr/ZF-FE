'use client'

import { useCallback } from 'react'
import { useAppDispatch } from '@/hooks/use-app-settings'
import { clearUser } from '@/store/slices/user-slice'
import { useRouter } from 'next/navigation'
import ProtectedRoute from '@/components/auth/protected-route'
import { useProfileForm } from '@/hooks/use-profile-form'
import { usePasswordChange } from '@/hooks/use-password-change'
import { ProfileForm } from '@/components/profile/profile-form'
import { AccountInfo } from '@/components/profile/account-info'
import config from '@/config/constants.json'

function ProfilePageContent() {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const {
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
  } = useProfileForm()

  const {
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    validateAndChangePassword,
  } = usePasswordChange()

  const handleSave = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      setSaving(true)
      setMessage('')

      try {
        await updateProfile()
        await validateAndChangePassword()

        setMessage(config.profile.successMessage)
        setTimeout(() => {
          window.location.reload()
        }, 1500)
      } catch (error: any) {
        setMessage(error.message || config.profile.updateFailedError)
        setSaving(false)
      }
    },
    [updateProfile, validateAndChangePassword, setSaving, setMessage]
  )

  const handleSignOut = useCallback(() => {
    dispatch(clearUser())
    router.push('/login')
  }, [dispatch, router])

  return (
    <div className="min-h-screen bg-background-primary pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{config.profile.pageTitle}</h1>
          <p className="text-text-secondary">{config.profile.pageDescription}</p>
        </div>

        <ProfileForm
          user={user}
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          avatarPreview={avatarPreview}
          handleAvatarChange={handleAvatarChange}
          currentPassword={currentPassword}
          setCurrentPassword={setCurrentPassword}
          newPassword={newPassword}
          setNewPassword={setNewPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          saving={saving}
          message={message}
          onSubmit={handleSave}
          onSignOut={handleSignOut}
          onCancel={() => router.back()}
        />

        <AccountInfo user={user} />
      </div>
    </div>
  )
}

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfilePageContent />
    </ProtectedRoute>
  )
}
