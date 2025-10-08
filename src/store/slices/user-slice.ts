import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { authApi } from '@/features/auth/api'

interface User {
  id: string
  email: string
  name?: string
  profileImage?: string
}

interface UserState {
  isAuthenticated: boolean
  user: User | null
  token: string | null
  loading: boolean
  error: string | null
}

const initialState: UserState = {
  isAuthenticated: false,
  user: null,
  token: null,
  loading: false,
  error: null,
}

export const loginUser = createAsyncThunk(
  'user/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await authApi.login(credentials)

      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_token', response.access_token)
        localStorage.setItem('user', JSON.stringify(response.user))
      }

      return response
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

export const registerUser = createAsyncThunk(
  'user/register',
  async (data: { email: string; password: string; name?: string }, { rejectWithValue }) => {
    try {
      const response = await authApi.register(data)

      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_token', response.access_token)
        localStorage.setItem('user', JSON.stringify(response.user))
      }

      return response
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchUserProfile = createAsyncThunk('user/profile', async (_, { rejectWithValue }) => {
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null

    if (!token) {
      throw new Error('No token found')
    }

    const user = await authApi.getProfile(token)
    return { user, token }
  } catch (error: any) {
    return rejectWithValue(error.message)
  }
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.isAuthenticated = true
      state.user = action.payload.user
      state.token = action.payload.token
      state.error = null
    },
    clearUser: (state) => {
      state.isAuthenticated = false
      state.user = null
      state.token = null
      state.error = null
      authApi.logout()
    },
    loadUserFromStorage: (state) => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('auth_token')
        const userStr = localStorage.getItem('user')

        if (token && userStr) {
          state.isAuthenticated = true
          state.token = token
          state.user = JSON.parse(userStr)
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.isAuthenticated = true
        state.user = action.payload.user
        state.token = action.payload.access_token
        state.error = null
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false
        state.isAuthenticated = true
        state.user = action.payload.user
        state.token = action.payload.access_token
        state.error = null
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.isAuthenticated = true
        state.user = action.payload.user
        state.token = action.payload.token
      })
      .addCase(fetchUserProfile.rejected, (state) => {
        state.isAuthenticated = false
        state.user = null
        state.token = null
      })
  },
})

export const { setUser, clearUser, loadUserFromStorage } = userSlice.actions
export default userSlice.reducer
