'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAppSelector, useAppDispatch } from '@/hooks/use-app-settings'
import { loadUserFromStorage } from '@/store/slices/user-slice'

export function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return function AuthenticatedComponent(props: P) {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { isAuthenticated } = useAppSelector((state) => state.user)

    useEffect(() => {
      dispatch(loadUserFromStorage())
    }, [dispatch])

    useEffect(() => {
      if (!isAuthenticated) {
        router.push('/login')
      }
    }, [isAuthenticated, router])

    if (!isAuthenticated) {
      return (
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-white text-xl">Loading...</div>
        </div>
      )
    }

    return <Component {...props} />
  }
}
