import { useState, FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import Card from '../components/common/Card'
import ErrorMessage from '../components/common/ErrorMessage'

export default function Signup() {
  const navigate = useNavigate()
  const { signup, isLoading, error } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [localError, setLocalError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLocalError(null)

    if (!name || !email || !password || !confirmPassword) {
      setLocalError('Please fill in all fields')
      return
    }

    if (password !== confirmPassword) {
      setLocalError('Passwords do not match')
      return
    }

    if (password.length < 6) {
      setLocalError('Password must be at least 6 characters')
      return
    }

    try {
      await signup({ name, email, password })
      navigate('/dashboard')
    } catch (err) {
      // Error is handled by AuthContext
      console.error('Signup error:', err)
    }
  }

  const displayError = localError || error

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
          <p className="mt-2 text-gray-600">Sign up to get started</p>
        </div>

        {displayError && (
          <div className="mb-4">
            <ErrorMessage message={displayError} onDismiss={() => setLocalError(null)} />
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            label="Full Name"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <Input
            type="email"
            label="Email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            type="password"
            label="Password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Input
            type="password"
            label="Confirm Password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <Button type="submit" className="w-full" isLoading={isLoading}>
            Create Account
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
            Sign in
          </Link>
        </div>
      </Card>

      <div className="mt-4 text-center text-sm text-gray-500">
        <p>Demo: Use any credentials to create an account (stubbed auth)</p>
      </div>
    </div>
  )
}
