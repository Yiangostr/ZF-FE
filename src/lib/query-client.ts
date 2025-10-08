import { QueryClient } from '@tanstack/react-query'
import config from '@/config/constants.json'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: config.api.defaultStaleTime,
      refetchOnWindowFocus: false,
      retry: config.api.defaultRetry,
    },
  },
})
