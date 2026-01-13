# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React + Vite skeleton application designed to be a reusable template for full-stack applications with FastAPI backends. It includes authentication scaffolding, protected routes, and a complete API integration layer.

## Common Commands

### Development
```bash
npm run dev          # Start dev server at http://localhost:5173
npm run build        # TypeScript compilation + production build
npm run preview      # Preview production build locally
npm run lint         # Run ESLint on codebase
```

### Environment Setup
```bash
cp .env.example .env # Create local environment file (required on first setup)
npm install          # Install dependencies
```

## Architecture

### Authentication System

The app uses a **Context-based authentication pattern**:

1. **AuthContext** (`src/contexts/AuthContext.tsx`) provides global auth state
2. Auth state is persisted to localStorage (both token and user object)
3. **ProtectedRoute** component (`src/components/auth/ProtectedRoute.tsx`) wraps routes requiring authentication
4. On app initialization, AuthContext checks localStorage and restores auth state

**Important**: The auth service is currently STUBBED with mock responses. To connect to a real FastAPI backend:
- Update `VITE_API_BASE_URL` in `.env`
- Uncomment the commented `apiClient` import in `src/services/auth.ts`
- Uncomment actual API calls and remove stubbed Promise responses

### API Integration Layer

**Axios client** (`src/services/api.ts`) is configured with:
- Automatic JWT token injection via request interceptor
- Base URL from environment variables
- Response error handling (401 triggers token removal)
- Request/response interceptors for consistent behavior

**Service pattern**: Each API domain gets its own service file (e.g., `auth.ts`, `users.ts`) that imports and uses `apiClient`. All FastAPI endpoints should be called through these service files, never directly with axios in components.

### Routing Architecture

Routes are centralized in `src/routes.tsx`:
- Public routes render directly
- Protected routes are wrapped with `<ProtectedRoute>` component
- Protected route logic: if not authenticated → redirect to `/login`
- After login, users are redirected to `/dashboard`

**Layout**: All routes render inside `<Layout>` component which provides Header + Footer + main content area.

### State Management

**Current approach**: React Context for global state (auth only)

**Future considerations**: The codebase is structured to easily add:
- Zustand or Redux for complex state (see comments in code)
- React Query for server state management
- Contexts can be composed in `src/App.tsx` provider hierarchy

### Component Structure

**Common components** (`src/components/common/`):
- Reusable UI primitives (Button, Input, Card, etc.)
- Styled with Tailwind CSS utility classes
- Accept standard HTML props via spreading
- Button component includes loading state with spinner

**Layout components** (`src/components/layout/`):
- Header includes auth-aware navigation (shows user menu when logged in)
- Header has mobile-responsive hamburger menu
- Footer is minimal with copyright and links

**Design system**: Uses Tailwind with custom primary color palette (blue). Aesthetic is minimal and classy (inspired by Linear/Vercel). Modify colors in `tailwind.config.js`.

### TypeScript Patterns

- Strict mode enabled in `tsconfig.json`
- All types centralized in `src/types/`
- Environment variables typed in `src/types/env.d.ts`
- API response types match expected FastAPI response shapes
- Components use proper prop typing (extending HTML element props when applicable)

### File Organization

```
src/
├── components/     # UI components (common, layout, auth)
├── contexts/       # React contexts (currently just AuthContext)
├── hooks/          # Custom hooks (useAuth re-export)
├── pages/          # Route page components
├── services/       # API service layer (axios calls to FastAPI)
├── types/          # TypeScript type definitions
├── utils/          # Constants and helper functions
├── App.tsx         # Root component (Router + Providers + Layout)
├── routes.tsx      # Route definitions
└── main.tsx        # React app mount point
```

## Key Integration Points

### Connecting to FastAPI Backend

1. **Environment**: Set `VITE_API_BASE_URL=http://localhost:8000/api` in `.env`

2. **Auth service** (`src/services/auth.ts`):
   - Uncomment `import apiClient from './api'`
   - Replace stubbed Promise responses with actual `apiClient.post()` calls
   - FastAPI endpoints expected:
     - `POST /auth/login` → returns `{ access_token, token_type, user }`
     - `POST /auth/signup` → returns `{ access_token, token_type, user }`
     - `POST /auth/logout` (optional)
     - `GET /auth/me` → returns user object

3. **Token management**: The axios client automatically sends JWT in `Authorization: Bearer <token>` header for all requests after login.

### Adding New Features

**New API endpoints**: Create service files following the pattern in `src/services/users.ts`. Import `apiClient` and export an object with async methods.

**New pages**:
1. Create component in `src/pages/`
2. Add route in `src/routes.tsx`
3. Wrap with `<ProtectedRoute>` if auth required

**New components**: Add to appropriate subfolder in `src/components/`. Follow existing patterns for props and styling.

## Development Workflow

1. Start dev server: `npm run dev`
2. Make changes (HMR will auto-refresh)
3. Check types: `npm run build` (runs `tsc` before build)
4. Check linting: `npm run lint`

## Important Notes

- **Token storage**: Currently using localStorage. For higher security, consider httpOnly cookies.
- **Error handling**: Axios interceptor logs 401s and clears token. Expand error handling as needed.
- **Loading states**: AuthContext provides `isLoading` during initialization. Components should check this before rendering auth-dependent content.
- **Mobile menu**: Header component manages mobile menu state internally. Close on navigation is handled in each Link's onClick.
- **Protected routes**: Always check `isLoading` before checking `isAuthenticated` to avoid flash of redirect during initialization.

## Placeholder Features

Some UI elements are placeholders and not yet functional. See `FUTURE_FEATURES.md` for details.

**Notable placeholders**:
- **Dark mode toggle** in Settings page - UI exists but not connected to theme system
- **Two-factor authentication** in Profile page - Shows "Enable" button but not implemented
- **Modal/Dialog component** - Listed in original spec but not yet created

When implementing these features, update `FUTURE_FEATURES.md` by moving items to the "Completed Features" section.

## Documentation Files

- **README.md** - Setup instructions and FastAPI integration guide
- **CLAUDE.md** - This file, architecture reference for Claude Code sessions
- **PROMPT.md** - Generation template for creating fresh instances of this skeleton
- **TESTING.md** - Testing strategy with two testing loops (feature testing and generation testing)
- **GENERATION_TEST_LOG.md** - Audit trail of generation tests
- **FUTURE_FEATURES.md** - Planned features and placeholders

## Testing & Generation Workflow

This project serves as both a working app AND a generation template:

1. **Feature Testing**: Test the current implementation (see `TESTING.md` Testing Loop 1)
2. **Generation Testing**: Test that `PROMPT.md` can generate a fresh working app (see `TESTING.md` Testing Loop 2)
3. **Keep in sync**: When adding features, update both code AND `PROMPT.md`, then run generation test

**Important**: After significant changes, always:
- Update `CLAUDE.md` if architecture changes
- Update `PROMPT.md` if generation template needs changes
- Run generation test to verify `PROMPT.md` still works
- Update `GENERATION_TEST_LOG.md` with test results

## Customization

**Colors**: Edit `tailwind.config.js` primary color palette
**App name**: Set `VITE_APP_NAME` in `.env` (used in Header and Footer)
**Logo**: Replace text in Header component with actual logo component/image
**Fonts**: Inter is loaded via Google Fonts CDN in `index.html`. To self-host, add to `/public` and update CSS.
