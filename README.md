# React Vite Skeleton

A minimal, production-ready React + Vite application template with authentication, routing, and FastAPI backend integration points.

## Features

- **React 18+** with modern hooks and best practices
- **Vite 5+** for lightning-fast development and optimized builds
- **TypeScript** with strict mode for type safety
- **Tailwind CSS** with a minimal, classy design aesthetic
- **React Router v6** with protected routes
- **Authentication System** ready for FastAPI integration
- **API Service Layer** with Axios and request interceptors
- **Responsive Layout** with mobile-first design
- **Reusable Components** (Button, Input, Card, Loading, etc.)

## Quick Start

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173/`

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Project Structure

```
src/
├── components/
│   ├── common/           # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Loading.tsx
│   │   └── ErrorMessage.tsx
│   ├── layout/           # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Layout.tsx
│   └── auth/             # Auth-specific components
│       └── ProtectedRoute.tsx
├── contexts/             # React contexts
│   └── AuthContext.tsx
├── hooks/                # Custom hooks
│   └── useAuth.ts
├── pages/                # Page components
│   ├── Home.tsx
│   ├── About.tsx
│   ├── Login.tsx
│   ├── Signup.tsx
│   ├── Dashboard.tsx
│   ├── Profile.tsx
│   ├── Settings.tsx
│   └── NotFound.tsx
├── services/             # API services
│   ├── api.ts           # Axios client configuration
│   ├── auth.ts          # Authentication endpoints
│   └── users.ts         # User endpoints (example)
├── types/                # TypeScript type definitions
│   ├── index.ts
│   └── env.d.ts
├── utils/                # Helper functions
│   └── constants.ts
├── App.tsx
├── main.tsx
├── routes.tsx
└── index.css
```

## Environment Configuration

Copy `.env.example` to `.env` and configure:

```bash
# API Configuration
VITE_API_BASE_URL=http://localhost:8000/api

# Application Configuration
VITE_APP_NAME=React Vite Skeleton
```

## FastAPI Integration

The application is pre-configured to work with a FastAPI backend. The auth system is currently stubbed with mock responses for development.

### Authentication Flow

1. User submits login credentials
2. Frontend calls `authService.login()` → `POST /auth/login`
3. Backend validates and returns JWT token
4. Frontend stores token in localStorage
5. Token is automatically included in all subsequent API requests via axios interceptor
6. Protected routes require authentication to access

### Integration Points

#### Authentication Endpoints

Located in `src/services/auth.ts`:

- `POST /auth/login` - User login
- `POST /auth/signup` - User registration
- `POST /auth/logout` - User logout (optional)
- `GET /auth/me` - Get current user info

To connect to your FastAPI backend:

1. Update `VITE_API_BASE_URL` in `.env`
2. Uncomment the actual API calls in `src/services/auth.ts`
3. Remove or comment out the stubbed responses

#### Example Integration

```typescript
// Before (stubbed):
async login(credentials: LoginCredentials): Promise<AuthResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        access_token: 'mock_jwt_token',
        token_type: 'bearer',
        user: { id: '1', email: credentials.email, name: 'Demo User' }
      })
    }, 500)
  })
}

// After (connected to FastAPI):
async login(credentials: LoginCredentials): Promise<AuthResponse> {
  const response = await apiClient.post<AuthResponse>('/auth/login', credentials)
  return response.data
}
```

#### API Client Configuration

The axios client (`src/services/api.ts`) automatically:
- Injects JWT token in Authorization header
- Handles 401 Unauthorized responses
- Provides consistent error handling
- Sets base URL from environment variables

### Adding New API Endpoints

Follow the pattern in `src/services/users.ts`:

```typescript
export const myService = {
  async getData(): Promise<DataType> {
    const response = await apiClient.get<DataType>('/my-endpoint')
    return response.data
  },

  async postData(data: DataType): Promise<void> {
    await apiClient.post('/my-endpoint', data)
  }
}
```

## Authentication

The app includes a complete authentication system:

- **Login/Signup Pages** with form validation
- **Auth Context** for global auth state management
- **Protected Routes** that redirect to login if not authenticated
- **Token Management** with localStorage persistence
- **User Menu** in header with profile/settings/logout

For development, you can login with any credentials - the auth is stubbed.

## Design System

The application uses a minimal, classy design aesthetic inspired by Linear, Vercel, and Stripe dashboards:

- **Colors**: Neutral grays with blue accent color
- **Typography**: Inter font family
- **Components**: Minimal shadows, subtle borders, smooth transitions
- **Layout**: Generous whitespace, max-width containers

Customize the design in `tailwind.config.js`.

## Routing

Routes are defined in `src/routes.tsx`:

**Public Routes:**
- `/` - Home page
- `/about` - About page
- `/login` - Login page
- `/signup` - Signup page

**Protected Routes:**
- `/dashboard` - Dashboard (requires auth)
- `/profile` - User profile (requires auth)
- `/settings` - User settings (requires auth)

Add new routes by editing `src/routes.tsx`.

## Development Tips

1. **Hot Module Replacement**: Changes to components will update instantly without page refresh
2. **Type Safety**: TypeScript strict mode catches errors during development
3. **ESLint**: Run `npm run lint` to check for code issues
4. **Protected Routes**: Wrap any route with `<ProtectedRoute>` to require authentication

## Building for Production

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

The build output will be in the `dist/` directory, ready to deploy to any static hosting service.

## License

MIT
