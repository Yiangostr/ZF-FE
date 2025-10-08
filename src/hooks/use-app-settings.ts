import {
  selectApiUrls,
  selectAppSettings,
  selectIsInitialized,
} from '@/store/slices/app-settings-slice'
import { useAppSelector } from '@/store'

export const useApiUrls = () => {
  return useAppSelector(selectApiUrls)
}

export const useAppSettingsState = () => {
  return useAppSelector(selectAppSettings)
}

export const useIsInitialized = () => {
  return useAppSelector(selectIsInitialized)
}
