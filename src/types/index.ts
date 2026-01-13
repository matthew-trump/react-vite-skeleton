// User types
export interface User {
  id: string
  email: string
  name: string
  createdAt?: string
}

// Auth types
export interface LoginCredentials {
  email: string
  password: string
}

export interface SignupCredentials extends LoginCredentials {
  name: string
}

export interface AuthResponse {
  access_token: string
  token_type: string
  user: User
}

// API types
export interface ApiError {
  message: string
  detail?: string
  status?: number
}
