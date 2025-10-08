import { useState, useCallback } from 'react'
import { store } from '@/store'
import config from '@/config/constants.json'

export const usePasswordChange = () => {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const validateAndChangePassword = useCallback(async () => {
    if (!newPassword) return true

    if (newPassword !== confirmPassword) {
      throw new Error(config.profile.passwordsNotMatchError)
    }

    if (!currentPassword) {
      throw new Error(config.profile.currentPasswordRequiredError)
    }

    const token = store.getState().user.token
    if (!token) {
      throw new Error(config.profile.notAuthenticatedError)
    }

    const { authApi } = await import('@/features/auth/api')
    await authApi.changePassword(token, { currentPassword, newPassword })

    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')

    return true
  }, [currentPassword, newPassword, confirmPassword])

  return {
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    validateAndChangePassword,
  }
}
