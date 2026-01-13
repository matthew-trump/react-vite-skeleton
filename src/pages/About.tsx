import Card from '../components/common/Card'

export default function About() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">About This Project</h1>
        <p className="mt-4 text-xl text-gray-600">
          A production-ready React + Vite skeleton for full-stack applications
        </p>
      </div>

      <Card>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">What is this?</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          This is a minimal, classy React + Vite application template designed to be a reusable
          skeleton for full-stack applications with FastAPI backends. It includes all the
          essential features you need to get started quickly.
        </p>
        <p className="text-gray-700 leading-relaxed">
          The project follows modern best practices and includes authentication scaffolding,
          routing, API integration layer, and a clean, professional design system.
        </p>
      </Card>

      <Card>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Tech Stack</h2>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <span className="text-primary-600 mr-2">•</span>
            <span><strong>React 18+</strong> - Modern React with hooks and concurrent features</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary-600 mr-2">•</span>
            <span><strong>Vite 5+</strong> - Lightning-fast development and optimized builds</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary-600 mr-2">•</span>
            <span><strong>TypeScript</strong> - Type safety and better developer experience</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary-600 mr-2">•</span>
            <span><strong>Tailwind CSS</strong> - Utility-first styling with a custom design system</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary-600 mr-2">•</span>
            <span><strong>React Router v6</strong> - Client-side routing with protected routes</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary-600 mr-2">•</span>
            <span><strong>Axios</strong> - HTTP client ready for FastAPI integration</span>
          </li>
        </ul>
      </Card>

      <Card>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          <div>
            <h3 className="font-semibold mb-2">Authentication System</h3>
            <p className="text-sm">Complete auth context with login, signup, and logout</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Protected Routes</h3>
            <p className="text-sm">Route guards to protect authenticated pages</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">API Integration</h3>
            <p className="text-sm">Axios client with interceptors and error handling</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Reusable Components</h3>
            <p className="text-sm">Button, Input, Card, Loading, and more</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Responsive Design</h3>
            <p className="text-sm">Mobile-first layout with Tailwind CSS</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Type Safe</h3>
            <p className="text-sm">Full TypeScript support throughout</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
