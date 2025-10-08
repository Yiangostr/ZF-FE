import { StreamingContent } from '@/types'
import { store } from '@/store'
import { selectApiUrls } from '@/store/slices/app-settings-slice'

const getApiBaseUrl = () => {
  const state = store.getState()
  const { api } = selectApiUrls(state)
  return api || 'http://localhost:3001/api'
}

export const streamingApi = {
  async fetchAll(signal?: AbortSignal, search?: string): Promise<StreamingContent[]> {
    const apiUrl = getApiBaseUrl()
    const url = search
      ? `${apiUrl}/streaming?search=${encodeURIComponent(search)}`
      : `${apiUrl}/streaming`

    const response = await fetch(url, {
      signal: signal ?? null,
    })

    if (!response.ok) {
      throw new Error('Failed to fetch streaming content')
    }

    return response.json()
  },

  async fetchById(id: string, signal?: AbortSignal): Promise<StreamingContent> {
    const apiUrl = getApiBaseUrl()
    const response = await fetch(`${apiUrl}/streaming/${id}`, {
      signal: signal ?? null,
    })

    if (!response.ok) {
      throw new Error('Failed to fetch content details')
    }

    return response.json()
  },
}
