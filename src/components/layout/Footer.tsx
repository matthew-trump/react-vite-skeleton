import { Link } from 'react-router-dom'
import { APP_NAME } from '../../utils/constants'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-gray-600">
            © {currentYear} {APP_NAME}. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <Link to="/about" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
              About
            </Link>
            <a href="#" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
              Privacy
            </a>
            <a href="#" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
              Terms
            </a>
            <a href="#" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
