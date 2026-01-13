import { useState } from 'react'
import Card from '../components/common/Card'
import Button from '../components/common/Button'

export default function Settings() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(false)
  const [marketingEmails, setMarketingEmails] = useState(false)

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="mt-2 text-gray-600">Manage your application preferences</p>
      </div>

      <Card>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Notifications</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Email Notifications</p>
              <p className="text-sm text-gray-600">Receive notifications via email</p>
            </div>
            <button
              onClick={() => setEmailNotifications(!emailNotifications)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                emailNotifications ? 'bg-primary-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  emailNotifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div>
              <p className="font-medium text-gray-900">Push Notifications</p>
              <p className="text-sm text-gray-600">Receive push notifications in your browser</p>
            </div>
            <button
              onClick={() => setPushNotifications(!pushNotifications)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                pushNotifications ? 'bg-primary-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  pushNotifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div>
              <p className="font-medium text-gray-900">Marketing Emails</p>
              <p className="text-sm text-gray-600">Receive updates about new features and promotions</p>
            </div>
            <button
              onClick={() => setMarketingEmails(!marketingEmails)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                marketingEmails ? 'bg-primary-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  marketingEmails ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-gray-200">
          <Button>Save Preferences</Button>
        </div>
      </Card>

      <Card>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Appearance</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
            <select className="block w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500">
              <option>Light</option>
              <option>Dark</option>
              <option>System</option>
            </select>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-gray-200">
          <Button variant="outline">Reset to Defaults</Button>
        </div>
      </Card>

      <Card>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Danger Zone</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Delete Account</p>
              <p className="text-sm text-gray-600">Permanently delete your account and all data</p>
            </div>
            <Button variant="outline" className="text-red-600 border-red-300 hover:bg-red-50">
              Delete
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
