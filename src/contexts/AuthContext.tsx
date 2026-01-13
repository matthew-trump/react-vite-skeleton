import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User, LoginCredentials, SignupCredentials } from '../types'
import { authService } from '../services/auth'
import { TOKEN_KEY, USER_KEY } from '../utils/constants'

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  signup: (credentials: SignupCredentials) => Promise<void>
  logout: () => void
  error: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Initialize auth state from localStorage
  useEffect(() => {
    const initAuth = () => {
      try {
        const token = localStorage.getItem(TOKEN_KEY)
        const savedUser = localStorage.getItem(USER_KEY)

        if (token && savedUser) {
          setUser(JSON.parse(savedUser))
        }
      } catch (err) {
        console.error('Failed to initialize auth:', err)
        localStorage.removeItem(TOKEN_KEY)
        localStorage.removeItem(USER_KEY)
      } finally {
        setIsLoading(false)
      }
    }

    initAuth()
  }, [])

  const login = async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await authService.login(credentials)

      // Store token and user
      localStorage.setItem(TOKEN_KEY, response.access_token)
      localStorage.setItem(USER_KEY, JSON.stringify(response.user))

      setUser(response.user)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed'
      setError(message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (credentials: SignupCredentials) => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await authService.signup(credentials)

      // Store token and user
      localStorage.setItem(TOKEN_KEY, response.access_token)
      localStorage.setItem(USER_KEY, JSON.stringify(response.user))

      setUser(response.user)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Signup failed'
      setError(message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    // Call backend logout if needed
    authService.logout().catch(console.error)

    // Clear local state
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    setUser(null)
    setError(null)
  }

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout,
    error,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
