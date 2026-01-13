# React+Vite Frontend Skeleton Generator

Create a minimal, production-ready React+Vite application that serves as a reusable skeleton for full-stack applications with FastAPI backends.

## Core Requirements

### Project Setup
- **Framework**: React 18+ with Vite 5+
- **Language**: TypeScript with strict mode enabled
- **Styling**: Tailwind CSS with a minimal, classy design aesthetic
- **Package Manager**: npm (or specify pnpm/yarn if preferred)
- **Dependencies**: Use latest stable versions of all packages

### Architecture Principles
- Clean separation of concerns
- API-ready structure for FastAPI backend integration
- Environment-based configuration
- Modular component structure
- Type-safe throughout

## Required Features

### 1. Authentication State Management
Implement a complete but generic authentication system:

- **Auth Context/Provider** with:
  - User state (authenticated, user object, loading states)
  - Login/logout methods (stubbed for now, ready to connect to FastAPI)
  - Token management (localStorage/sessionStorage)
  - Protected route wrapper component

- **Auth State Indicator** in navigation:
  - Show user info (name/email) when logged in
  - Login/Signup buttons when logged out
  - Clean dropdown menu for authenticated users (Profile, Settings, Logout)
  - Use a conventional UI pattern users will recognize

### 2. Routing Structure
Set up React Router v6 with:
- Public routes (Home, About, Login, Signup)
- Protected routes structure (Dashboard, Profile, Settings)
- 404 Not Found page
- Route guards using auth context

### 3. Layout & Navigation
Create a responsive layout with:
- **Header/Navbar**:
  - Logo/brand on left
  - Navigation links in center
  - Auth state indicator on right
  - Mobile-responsive hamburger menu
  
- **Main Content Area**: Clean, centered, with appropriate max-width
- **Footer**: Simple, minimal footer with copyright/links

### 4. Design System
Establish a minimal, classy aesthetic:
- **Color Palette**: Choose a sophisticated neutral base (grays, off-whites) with one accent color
- **Typography**: Clean, readable font stack (Inter, system fonts). Load Inter via Google Fonts CDN in index.html
- **Spacing**: Consistent spacing scale using Tailwind
- **Components**: Minimal shadows, subtle borders, understated hover states
- **Dark Mode Ready**: Structure CSS for easy dark mode addition later (Note: Settings page includes dark mode dropdown as placeholder, but functionality not yet implemented. See FUTURE_FEATURES.md)

### 5. API Integration Layer
Create a service layer ready for FastAPI:
- **API Client**: Axios (or fetch) wrapper with:
  - Base URL configuration from environment
  - Automatic token injection in headers
  - Request/response interceptors
  - Error handling utilities
  
- **API Service Structure**:
  ```
  src/services/
    api.ts          # Base API client
    auth.ts         # Auth endpoints (comment out apiClient import when stubbed)
    users.ts        # User endpoints (example)
  ```

  **Important**: In `auth.ts`, comment out the `import apiClient` line while using stubbed responses to avoid TypeScript "declared but never used" errors. Include a comment to uncomment it when connecting to the real backend.

### 6. Configuration
Set up environment configuration:
- `.env.example` with:
  - `VITE_API_BASE_URL`
  - `VITE_APP_NAME`
  - Any other config variables

- Copy `.env.example` to `.env` during setup (include in setup instructions)
- Environment type definitions for TypeScript in `src/types/env.d.ts`

### 7. Essential UI Components
Create reusable, styled components:
- Button (primary, secondary, variants)
- Input/Form fields with validation styling
- Card component
- Loading spinner
- Error message display
- Modal/Dialog (optional - can be added later, see FUTURE_FEATURES.md)

### 8. State Management Approach
Use React Context for global state (auth, theme, etc.), with:
- Clear provider hierarchy
- Custom hooks for accessing context
- Proper TypeScript types
- Comments indicating where to add Zustand/Redux if needed later

## Project Structure

```
react-vite-app/
├── src/
│   ├── components/
│   │   ├── common/        # Reusable UI components
│   │   ├── layout/        # Layout components (Header, Footer)
│   │   └── auth/          # Auth-specific components
│   ├── contexts/          # React contexts (AuthContext, etc.)
│   ├── hooks/             # Custom hooks
│   ├── pages/             # Page components
│   ├── services/          # API services
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Helper functions
│   ├── App.tsx
│   ├── main.tsx
│   ├── routes.tsx         # Route definitions
│   └── index.css          # Tailwind imports
├── public/
│   └── vite.svg           # Favicon (Vite logo)
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

## Deliverables

Provide the complete application with:

1. **All source files** organized per structure above
2. **package.json** with all dependencies
3. **Configuration files**: Vite, TypeScript, Tailwind, ESLint
4. **README.md** with:
   - Setup instructions (including copying .env.example to .env)
   - Available scripts
   - Environment configuration
   - Project structure explanation
   - Notes on FastAPI integration points
5. **Stub auth implementation** showing where to connect real FastAPI endpoints
6. **Verified build**: Ensure `npm run build` completes without TypeScript or build errors

## Design Aesthetic

The UI should feel:
- **Minimal**: Not cluttered, generous whitespace
- **Classy**: Professional, not flashy
- **Snappy**: Smooth transitions, responsive feel
- **Conventional**: Users should immediately understand the interface
- **Modern**: Current best practices, no dated patterns

Think: Linear, Vercel Dashboard, or Stripe Dashboard aesthetic.

## Additional Notes

- Use TypeScript interfaces for all data shapes
- Include PropTypes or proper typing for all components
- Add helpful comments at integration points (where FastAPI calls go)
- Keep dependencies minimal—only include what's truly needed
- Ensure the dev server starts cleanly with `npm run dev`
- Build should complete without errors: `npm run build`

## Authentication Flow (to implement)

The skeleton should anticipate this flow:
1. User lands on public page
2. Clicks login → navigates to login page
3. Submits credentials → API call to FastAPI `/auth/login`
4. Receives JWT token → stores in localStorage
5. Updates auth context → user marked as authenticated
6. Redirects to dashboard (protected route)
7. Token included in all subsequent API requests
8. Logout → clear token and context

Stub out these endpoints in comments, making it obvious where the FastAPI URLs go.

---

**Generate a complete, working React+Vite application following this specification.** Make it immediately runnable with:
```bash
npm install
cp .env.example .env
npm run dev
```

The application should:
- Start without errors at http://localhost:5173
- Build successfully with `npm run build` (no TypeScript errors)
- Look polished even with placeholder content
- Have all FastAPI integration points clearly marked with comments
- Include FUTURE_FEATURES.md file documenting any placeholder features (dark mode toggle, modal component, etc.)
