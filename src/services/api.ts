import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import { API_BASE_URL, TOKEN_KEY } from '../utils/constants'
import { ApiError } from '../types'

// Create axios instance with default config
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

// Request interceptor - automatically inject auth token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem(TOKEN_KEY)
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// Response interceptor - handle common errors
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    if (error.response) {
      // Server responded with error status
      const apiError: ApiError = {
        message: error.response.data?.message || 'An error occurred',
        detail: error.response.data?.detail,
        status: error.response.status,
      }

      // Handle 401 Unauthorized - could trigger logout here
      if (error.response.status === 401) {
        // Optional: dispatch logout action or redirect to login
        localStorage.removeItem(TOKEN_KEY)
      }

      return Promise.reject(apiError)
    } else if (error.request) {
      // Request made but no response
      return Promise.reject({
        message: 'No response from server. Please check your connection.',
      })
    } else {
      // Request setup error
      return Promise.reject({
        message: error.message || 'Request failed',
      })
    }
  }
)

export default apiClient
