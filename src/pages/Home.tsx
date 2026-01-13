import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Button from '../components/common/Button'
import Card from '../components/common/Card'

export default function Home() {
  const { isAuthenticated, user } = useAuth()

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
          Welcome to React Vite Skeleton
        </h1>
        <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
          A minimal, production-ready React + Vite application template with authentication,
          routing, and FastAPI integration points.
        </p>
        {isAuthenticated ? (
          <div className="mt-8">
            <p className="text-lg text-gray-700 mb-4">
              Welcome back, <span className="font-semibold">{user?.name}</span>!
            </p>
            <Link to="/dashboard">
              <Button size="lg">Go to Dashboard</Button>
            </Link>
          </div>
        ) : (
          <div className="mt-8 flex justify-center gap-4">
            <Link to="/signup">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg">Login</Button>
            </Link>
          </div>
        )}
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <Card>
          <div className="text-center">
            <div className="mx-auto h-12 w-12 text-primary-600 mb-4">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Lightning Fast</h3>
            <p className="text-gray-600">Built with Vite for instant HMR and optimized builds</p>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <div className="mx-auto h-12 w-12 text-primary-600 mb-4">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure Auth</h3>
            <p className="text-gray-600">Ready-to-integrate authentication with FastAPI backend</p>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <div className="mx-auto h-12 w-12 text-primary-600 mb-4">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Type Safe</h3>
            <p className="text-gray-600">Full TypeScript support with strict mode enabled</p>
          </div>
        </Card>
      </div>
    </div>
  )
}
