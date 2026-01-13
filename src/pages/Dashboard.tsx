import { useAuth } from '../hooks/useAuth'
import Card from '../components/common/Card'

export default function Dashboard() {
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">Welcome back, {user?.name}!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">1,234</p>
            </div>
            <div className="h-12 w-12 text-primary-600">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Sessions</p>
              <p className="text-2xl font-bold text-gray-900">42</p>
            </div>
            <div className="h-12 w-12 text-primary-600">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">API Calls</p>
              <p className="text-2xl font-bold text-gray-900">8,765</p>
            </div>
            <div className="h-12 w-12 text-primary-600">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <div>
              <p className="font-medium text-gray-900">User logged in</p>
              <p className="text-sm text-gray-600">2 minutes ago</p>
            </div>
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
              Success
            </span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <div>
              <p className="font-medium text-gray-900">API request completed</p>
              <p className="text-sm text-gray-600">5 minutes ago</p>
            </div>
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
              Info
            </span>
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium text-gray-900">Database backup completed</p>
              <p className="text-sm text-gray-600">1 hour ago</p>
            </div>
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
              Success
            </span>
          </div>
        </div>
      </Card>
    </div>
  )
}
