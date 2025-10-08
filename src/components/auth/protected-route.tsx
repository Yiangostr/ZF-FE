'use client'

import { useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useAppSelector, useAppDispatch } from '@/hooks/use-app-settings'
import { loadUserFromStorage } from '@/store/slices/user-slice'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { isAuthenticated, user } = useAppSelector((state) => state.user)

  const isReady = useMemo(() => !!user || isAuthenticated, [user, isAuthenticated])

  useEffect(() => {
    dispatch(loadUserFromStorage())
  }, [dispatch])

  useEffect(() => {
    if (isReady && !isAuthenticated) {
      router.replace('/login')
    }
  }, [isReady, isAuthenticated, router])

  if (!isReady || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-background-primary">
        <div className="animate-pulse">
          <div className="h-16 bg-background-secondary border-b border-background-tertiary" />

          <div className="pt-20 px-4 md:px-8 lg:px-12 space-y-8">
            <div className="h-96 bg-gradient-to-r from-background-secondary to-background-tertiary rounded-lg" />

            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-4">
                  <div className="h-6 bg-background-secondary rounded w-48" />
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((j) => (
                      <div key={j} className="aspect-video bg-background-secondary rounded-lg" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
