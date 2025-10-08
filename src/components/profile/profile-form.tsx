'use client'

import config from '@/config/constants.json'
import { AvatarSection } from './avatar-section'
import { PasswordFields } from './password-fields'

interface ProfileFormProps {
  user: any
  name: string
  setName: (value: string) => void
  email: string
  setEmail: (value: string) => void
  avatarPreview: string
  handleAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  currentPassword: string
  setCurrentPassword: (value: string) => void
  newPassword: string
  setNewPassword: (value: string) => void
  confirmPassword: string
  setConfirmPassword: (value: string) => void
  saving: boolean
  message: string
  onSubmit: (e: React.FormEvent) => void
  onSignOut: () => void
  onCancel: () => void
}

export const ProfileForm = ({
  user,
  name,
  setName,
  email,
  setEmail,
  avatarPreview,
  handleAvatarChange,
  currentPassword,
  setCurrentPassword,
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  saving,
  message,
  onSubmit,
  onSignOut,
  onCancel,
}: ProfileFormProps) => {
  return (
    <div className="bg-background-secondary rounded-lg border border-background-tertiary overflow-hidden">
      <form onSubmit={onSubmit}>
        <div className="p-8 space-y-8">
          <div className="flex items-start gap-8">
            <AvatarSection
              user={user}
              avatarPreview={avatarPreview}
              handleAvatarChange={handleAvatarChange}
            />

            <div className="flex-1 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    {config.profile.nameLabel}
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-background-tertiary text-white rounded border border-text-secondary/20 focus:border-primary focus:outline-none"
                    disabled={saving}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    {config.profile.emailLabel}
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value.toLowerCase())}
                    className="w-full px-4 py-3 bg-background-tertiary text-white rounded border border-text-secondary/20 focus:border-primary focus:outline-none"
                    disabled={saving}
                  />
                </div>
              </div>
            </div>
          </div>

          <PasswordFields
            currentPassword={currentPassword}
            setCurrentPassword={setCurrentPassword}
            newPassword={newPassword}
            setNewPassword={setNewPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            saving={saving}
          />

          {message && (
            <div
              className={`px-4 py-3 rounded ${
                message.includes('success')
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
              }`}
            >
              {message}
            </div>
          )}
        </div>

        <div className="bg-background-tertiary px-8 py-4 flex items-center justify-between border-t border-background-tertiary">
          <button
            type="button"
            onClick={onSignOut}
            className="text-text-secondary hover:text-white transition-colors"
          >
            {config.profile.signOutLabel}
          </button>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 text-white hover:text-text-secondary transition-colors"
              disabled={saving}
            >
              {config.profile.cancelButton}
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-primary text-white rounded hover:bg-red-700 disabled:bg-red-900 disabled:cursor-not-allowed transition-colors"
            >
              {saving ? config.profile.savingButton : config.profile.saveButton}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
