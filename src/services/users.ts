import apiClient from './api'
import { User } from '../types'

/**
 * User service for FastAPI backend integration
 * Example service showing how to structure API calls
 *
 * FASTAPI INTEGRATION POINTS:
 * - GET /users - List users
 * - GET /users/:id - Get user by ID
 * - PUT /users/:id - Update user
 * - DELETE /users/:id - Delete user
 */

export const userService = {
  /**
   * Get user by ID
   * FastAPI endpoint: GET /users/:id
   */
  async getUser(id: string): Promise<User> {
    const response = await apiClient.get<User>(`/users/${id}`)
    return response.data
  },

  /**
   * Update user
   * FastAPI endpoint: PUT /users/:id
   */
  async updateUser(id: string, data: Partial<User>): Promise<User> {
    const response = await apiClient.put<User>(`/users/${id}`, data)
    return response.data
  },

  /**
   * Delete user
   * FastAPI endpoint: DELETE /users/:id
   */
  async deleteUser(id: string): Promise<void> {
    await apiClient.delete(`/users/${id}`)
  },
}
