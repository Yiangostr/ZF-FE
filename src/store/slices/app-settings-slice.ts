import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AppSettingsState {
  API_BASE_URL?: string
  isInitialized?: boolean
}

const defaultSettings: AppSettingsState = {
  API_BASE_URL: 'http://localhost:3001/api',
  isInitialized: false,
}

const initialState: AppSettingsState = {
  ...defaultSettings,
}

const appSettingsSlice = createSlice({
  name: 'appSettings',
  initialState,
  reducers: {
    setAppSettings: (state, action: PayloadAction<Partial<AppSettingsState>>) => {
      return { ...state, ...action.payload }
    },
    hydrateSettings: (state, action: PayloadAction<Partial<AppSettingsState>>) => {
      return {
        ...state,
        ...action.payload,
        isInitialized: true,
      }
    },
  },
})

export const { setAppSettings, hydrateSettings } = appSettingsSlice.actions

export const selectAppSettings = (state: { appSettings: AppSettingsState }) => state.appSettings

export const selectApiUrls = (state: { appSettings: AppSettingsState }) => ({
  api: state.appSettings.API_BASE_URL || '',
})

export const selectIsInitialized = (state: { appSettings: AppSettingsState }) =>
  state.appSettings.isInitialized

export default appSettingsSlice.reducer
