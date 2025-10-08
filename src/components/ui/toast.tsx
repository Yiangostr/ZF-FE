'use client'

import { useEffect, useState } from 'react'

export interface ToastProps {
  message: string
  type?: 'success' | 'error' | 'info'
  duration?: number
}

let toastHandler: ((toast: ToastProps) => void) | null = null

export const showToast = (toast: ToastProps) => {
  if (toastHandler) {
    toastHandler(toast)
  }
}

export const ToastContainer = () => {
  const [toasts, setToasts] = useState<(ToastProps & { id: number })[]>([])
  const [nextId, setNextId] = useState(0)

  useEffect(() => {
    toastHandler = (toast: ToastProps) => {
      const id = nextId
      setNextId((prev) => prev + 1)
      setToasts((prev) => [...prev, { ...toast, id }])

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
      }, toast.duration || 3000)
    }

    return () => {
      toastHandler = null
    }
  }, [nextId])

  return (
    <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`px-4 py-3 rounded-lg shadow-xl backdrop-blur-sm flex items-center gap-3 animate-in slide-in-from-bottom-5 ${
            toast.type === 'success'
              ? 'bg-green-600/90 text-white'
              : toast.type === 'error'
              ? 'bg-red-600/90 text-white'
              : 'bg-background-secondary/90 text-text-primary'
          }`}
        >
          {toast.type === 'success' && (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          )}
          {toast.type === 'error' && (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          )}
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      ))}
    </div>
  )
}
