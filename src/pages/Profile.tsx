import { useAuth } from '../hooks/useAuth'
import Card from '../components/common/Card'
import Button from '../components/common/Button'

export default function Profile() {
  const { user } = useAuth()

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
        <p className="mt-2 text-gray-600">Manage your account information</p>
      </div>

      <Card>
        <div className="flex items-center space-x-6">
          <div className="h-24 w-24 rounded-full bg-primary-600 flex items-center justify-center text-white text-3xl font-bold">
            {user?.name?.[0]?.toUpperCase() || 'U'}
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">{user?.name}</h2>
            <p className="text-gray-600">{user?.email}</p>
            <p className="text-sm text-gray-500 mt-1">Member since {new Date().getFullYear()}</p>
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Account Information</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <p className="mt-1 text-gray-900">{user?.name}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <p className="mt-1 text-gray-900">{user?.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">User ID</label>
            <p className="mt-1 text-gray-900 font-mono text-sm">{user?.id}</p>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-gray-200">
          <Button variant="outline">Edit Profile</Button>
        </div>
      </Card>

      <Card>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Security</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Password</p>
              <p className="text-sm text-gray-600">Last changed 30 days ago</p>
            </div>
            <Button variant="outline" size="sm">Change</Button>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div>
              <p className="font-medium text-gray-900">Two-Factor Authentication</p>
              <p className="text-sm text-gray-600">Not enabled</p>
            </div>
            <Button variant="outline" size="sm">Enable</Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
