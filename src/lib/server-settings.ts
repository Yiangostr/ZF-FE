import { AppSettingsState } from '@/store/slices/app-settings-slice'

export const createServerSettings = (): AppSettingsState => {
  return {
    API_BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
    isInitialized: true,
  }
}
