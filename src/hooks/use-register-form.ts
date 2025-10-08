import { useReducer, useMemo, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useAppDispatch } from '@/hooks/use-app-settings'
import { registerUser } from '@/store/slices/user-slice'
import config from '@/config/constants.json'

interface RegisterFormState {
  email: string
  password: string
  name: string
  loading: boolean
  error: string
}

type RegisterFormAction =
  | { type: 'SET_EMAIL'; payload: string }
  | { type: 'SET_PASSWORD'; payload: string }
  | { type: 'SET_NAME'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string }

const initialState: RegisterFormState = {
  email: '',
  password: '',
  name: '',
  loading: false,
  error: '',
}

const registerFormReducer = (
  state: RegisterFormState,
  action: RegisterFormAction
): RegisterFormState => {
  switch (action.type) {
    case 'SET_EMAIL':
      return { ...state, email: action.payload }
    case 'SET_PASSWORD':
      return { ...state, password: action.payload }
    case 'SET_NAME':
      return { ...state, name: action.payload }
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    default:
      return state
  }
}

export const useRegisterForm = () => {
  const [state, dispatch] = useReducer(registerFormReducer, initialState)
  const router = useRouter()
  const appDispatch = useAppDispatch()

  const isFormValid = useMemo(() => {
    return state.email.includes('@') && state.password.length >= 6 && state.name.length >= 2
  }, [state.email, state.password, state.name])

  const setEmail = useCallback((email: string) => {
    dispatch({ type: 'SET_EMAIL', payload: email })
  }, [])

  const setPassword = useCallback((password: string) => {
    dispatch({ type: 'SET_PASSWORD', payload: password })
  }, [])

  const setName = useCallback((name: string) => {
    dispatch({ type: 'SET_NAME', payload: name })
  }, [])

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()

      if (!isFormValid) return

      dispatch({ type: 'SET_LOADING', payload: true })
      dispatch({ type: 'SET_ERROR', payload: '' })

      try {
        await appDispatch(
          registerUser({ email: state.email, password: state.password, name: state.name })
        ).unwrap()
        router.push('/')
      } catch (err: any) {
        if (
          err.message?.includes('already registered') ||
          err.message?.includes('already in use')
        ) {
          dispatch({ type: 'SET_ERROR', payload: config.auth.emailExistsError })
        } else {
          dispatch({ type: 'SET_ERROR', payload: config.auth.registrationFailedError })
        }
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false })
      }
    },
    [isFormValid, state.email, state.password, state.name, appDispatch, router]
  )

  return {
    email: state.email,
    password: state.password,
    name: state.name,
    loading: state.loading,
    error: state.error,
    isFormValid,
    setEmail,
    setPassword,
    setName,
    handleSubmit,
  }
}
