import { sanitizeText, sanitizeUrl } from '@/lib/sanitize'

interface LoginRequest {
  email: string
  password: string
}

interface RegisterRequest {
  email: string
  password: string
  name?: string
}

interface AuthResponse {
  user: {
    id: string
    email: string
    name?: string
    profileImage?: string
  }
  access_token: string
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

export const authApi = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const controller = new AbortController()

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
        signal: controller.signal,
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Login failed')
      }

      return response.json()
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Request cancelled')
      }
      throw error
    }
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const controller = new AbortController()

    try {
      const sanitizedData = {
        email: sanitizeText(data.email),
        password: data.password,
        name: data.name ? sanitizeText(data.name) : undefined,
      }

      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sanitizedData),
        signal: controller.signal,
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Registration failed')
      }

      return response.json()
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Request cancelled')
      }
      throw error
    }
  },

  getProfile: async (token: string) => {
    const controller = new AbortController()

    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        signal: controller.signal,
      })

      if (!response.ok) {
        throw new Error('Failed to fetch profile')
      }

      return response.json()
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Request cancelled')
      }
      throw error
    }
  },

  updateProfile: async (
    token: string,
    data: { email?: string; name?: string; profileImage?: string }
  ) => {
    const controller = new AbortController()

    try {
      const sanitizedData: { email?: string; name?: string; profileImage?: string } = {}
      if (data.email) sanitizedData.email = sanitizeText(data.email)
      if (data.name) sanitizedData.name = sanitizeText(data.name)
      if (data.profileImage) sanitizedData.profileImage = sanitizeUrl(data.profileImage)

      const response = await fetch(`${API_URL}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(sanitizedData),
        signal: controller.signal,
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to update profile')
      }

      return response.json()
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Request cancelled')
      }
      throw error
    }
  },

  changePassword: async (token: string, data: { currentPassword: string; newPassword: string }) => {
    const controller = new AbortController()

    try {
      const response = await fetch(`${API_URL}/auth/password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
        signal: controller.signal,
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to change password')
      }

      return response.json()
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Request cancelled')
      }
      throw error
    }
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user')
    }
  },
}
