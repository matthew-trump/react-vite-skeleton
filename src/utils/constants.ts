// Environment variables with fallbacks
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'
export const APP_NAME = import.meta.env.VITE_APP_NAME || 'React Vite Skeleton'

// Auth constants
export const TOKEN_KEY = 'auth_token'
export const USER_KEY = 'auth_user'
