import { useState, FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import Card from '../components/common/Card'
import ErrorMessage from '../components/common/ErrorMessage'

export default function Login() {
  const navigate = useNavigate()
  const { login, isLoading, error } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [localError, setLocalError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLocalError(null)

    if (!email || !password) {
      setLocalError('Please fill in all fields')
      return
    }

    try {
      await login({ email, password })
      navigate('/dashboard')
    } catch (err) {
      // Error is handled by AuthContext
      console.error('Login error:', err)
    }
  }

  const displayError = localError || error

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="mt-2 text-gray-600">Sign in to your account</p>
        </div>

        {displayError && (
          <div className="mb-4">
            <ErrorMessage message={displayError} onDismiss={() => setLocalError(null)} />
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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

          <Button type="submit" className="w-full" isLoading={isLoading}>
            Sign In
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="text-primary-600 hover:text-primary-700 font-medium">
            Sign up
          </Link>
        </div>
      </Card>

      <div className="mt-4 text-center text-sm text-gray-500">
        <p>Demo: Use any email and password to login (stubbed auth)</p>
      </div>
    </div>
  )
}
