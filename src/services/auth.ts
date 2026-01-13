// import apiClient from './api' // Uncomment when connecting to FastAPI backend
import { AuthResponse, LoginCredentials, SignupCredentials } from '../types'

/**
 * Authentication service for FastAPI backend integration
 *
 * FASTAPI INTEGRATION POINTS:
 * - POST /auth/login - User login endpoint
 * - POST /auth/signup - User registration endpoint
 * - POST /auth/logout - User logout endpoint (optional, mainly client-side)
 * - GET /auth/me - Get current user info
 */

export const authService = {
  /**
   * Login user with email and password
   * FastAPI endpoint: POST /auth/login
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // STUB: Replace with actual FastAPI call when backend is ready
    // const response = await apiClient.post<AuthResponse>('/auth/login', credentials)
    // return response.data

    // Simulated response for development
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          access_token: 'mock_jwt_token_' + Date.now(),
          token_type: 'bearer',
          user: {
            id: '1',
            email: credentials.email,
            name: 'Demo User',
          },
        })
      }, 500)
    })
  },

  /**
   * Register new user
   * FastAPI endpoint: POST /auth/signup
   */
  async signup(credentials: SignupCredentials): Promise<AuthResponse> {
    // STUB: Replace with actual FastAPI call when backend is ready
    // const response = await apiClient.post<AuthResponse>('/auth/signup', credentials)
    // return response.data

    // Simulated response for development
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          access_token: 'mock_jwt_token_' + Date.now(),
          token_type: 'bearer',
          user: {
            id: '1',
            email: credentials.email,
            name: credentials.name,
          },
        })
      }, 500)
    })
  },

  /**
   * Logout user
   * FastAPI endpoint: POST /auth/logout (optional)
   * Note: Mainly client-side (clear token), but can call backend to invalidate token
   */
  async logout(): Promise<void> {
    // STUB: Uncomment when backend is ready
    // await apiClient.post('/auth/logout')

    // Client-side logout
    return Promise.resolve()
  },

  /**
   * Get current user info
   * FastAPI endpoint: GET /auth/me
   */
  async getCurrentUser(): Promise<AuthResponse['user']> {
    // STUB: Replace with actual FastAPI call when backend is ready
    // const response = await apiClient.get<AuthResponse['user']>('/auth/me')
    // return response.data

    // Return null for now - will be replaced with actual API call
    throw new Error('Not authenticated')
  },
}
