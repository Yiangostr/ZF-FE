import { useReducer, useMemo, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useAppDispatch } from '@/hooks/use-app-settings'
import { loginUser } from '@/store/slices/user-slice'
import config from '@/config/constants.json'

interface LoginFormState {
  email: string
  password: string
  loading: boolean
  error: string
}

type LoginFormAction =
  | { type: 'SET_EMAIL'; payload: string }
  | { type: 'SET_PASSWORD'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string }

const initialState: LoginFormState = {
  email: '',
  password: '',
  loading: false,
  error: '',
}

const loginFormReducer = (state: LoginFormState, action: LoginFormAction): LoginFormState => {
  switch (action.type) {
    case 'SET_EMAIL':
      return { ...state, email: action.payload }
    case 'SET_PASSWORD':
      return { ...state, password: action.payload }
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    default:
      return state
  }
}

export const useLoginForm = () => {
  const [state, dispatch] = useReducer(loginFormReducer, initialState)
  const router = useRouter()
  const appDispatch = useAppDispatch()

  const isFormValid = useMemo(() => {
    return state.email.includes('@') && state.password.length >= 6
  }, [state.email, state.password])

  const setEmail = useCallback((email: string) => {
    dispatch({ type: 'SET_EMAIL', payload: email })
  }, [])

  const setPassword = useCallback((password: string) => {
    dispatch({ type: 'SET_PASSWORD', payload: password })
  }, [])

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()

      if (!isFormValid) return

      dispatch({ type: 'SET_LOADING', payload: true })
      dispatch({ type: 'SET_ERROR', payload: '' })

      try {
        await appDispatch(loginUser({ email: state.email, password: state.password })).unwrap()
        router.push('/')
      } catch (err: any) {
        dispatch({ type: 'SET_ERROR', payload: err.message || config.auth.loginFailedError })
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false })
      }
    },
    [isFormValid, state.email, state.password, appDispatch, router]
  )

  return {
    email: state.email,
    password: state.password,
    loading: state.loading,
    error: state.error,
    isFormValid,
    setEmail,
    setPassword,
    handleSubmit,
  }
}
