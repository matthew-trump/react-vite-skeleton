import { Link } from 'react-router-dom'
import Button from '../components/common/Button'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-200">404</h1>
        <h2 className="mt-4 text-3xl font-bold text-gray-900">Page Not Found</h2>
        <p className="mt-4 text-lg text-gray-600 max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8">
          <Link to="/">
            <Button>Go Home</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
