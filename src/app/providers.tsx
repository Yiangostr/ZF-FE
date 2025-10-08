'use client'

import { useEffect } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Provider } from 'react-redux'
import { queryClient } from '@/lib/query-client'
import { store } from '@/store'
import { hydrateSettings } from '@/store/slices/app-settings-slice'
import { createServerSettings } from '@/lib/server-settings'

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const settings = createServerSettings()
    store.dispatch(hydrateSettings(settings))
  }, [])

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  )
}
