# Testing Guide

This document outlines the testing strategy for the React Vite Skeleton project. Since this is a template generator, we have two distinct but equally important testing loops.

## Overview

This project serves two purposes:
1. **Reference Implementation** - A working example of the skeleton app
2. **Generation Template** - PROMPT.md that can generate fresh instances

Both must be kept in sync and thoroughly tested.

## Testing Loop 1: Feature Testing

Test the current reference implementation to ensure all features work correctly.

### Manual Feature Tests

Run through these scenarios in the current app:

#### Authentication Flow
```bash
# Start the dev server
npm run dev
```

1. **Signup Flow**
   - Navigate to http://localhost:5173
   - Click "Sign Up"
   - Enter any credentials (auth is stubbed)
   - Verify redirect to Dashboard
   - Verify user name appears in header dropdown

2. **Logout Flow**
   - Click user name in header
   - Click "Logout"
   - Verify redirect to home page
   - Verify header shows Login/Sign Up buttons

3. **Login Flow**
   - Click "Login"
   - Enter any credentials
   - Verify redirect to Dashboard
   - Verify auth persists on page refresh (localStorage)

4. **Protected Routes**
   - While logged out, navigate to http://localhost:5173/dashboard
   - Verify redirect to /login
   - Login and verify access to Dashboard
   - Test /profile and /settings routes

#### Navigation & Layout
1. **Desktop Navigation**
   - Verify all nav links work (Home, About, Dashboard)
   - Test user dropdown menu (Profile, Settings, Logout)
   - Verify mobile menu works at narrow widths

2. **Responsive Design**
   - Test at mobile width (< 768px)
   - Verify hamburger menu appears and works
   - Verify layout remains readable

#### UI Components
1. **Forms**
   - Test Login form validation (empty fields)
   - Test Signup form validation (password mismatch, min length)
   - Verify error messages display correctly
   - Test input focus states

2. **Loading States**
   - Watch for loading spinner during auth operations
   - Verify button loading state during form submission

### Build & Type Checking

```bash
# Verify TypeScript compilation
npm run build

# Should complete without errors
# Check for any warnings that should be addressed
```

### Linting

```bash
# Run ESLint
npm run lint

# Should have 0 errors
# Warnings are acceptable but should be documented
```

## Testing Loop 2: Generation Testing

Test that PROMPT.md can reliably generate a fresh, working application.

### Why This Matters

The whole purpose of this project is to have a reliable template generator. If PROMPT.md can't generate a working app, the project has failed its primary goal.

### Generation Test Procedure

#### Handling Existing Test Directories

**Important**: If a test directory already exists from a previous test, you must handle it before running a new test to ensure a clean slate.

**Recommended Approach (Option 1): Delete and Recreate**
```bash
# Remove existing test directory completely
rm -rf /Users/matthewtrump/Developer/react-vite-skeleton-test

# This ensures:
# - No leftover files from previous tests
# - Clean npm install (no cached node_modules)
# - Accurate comparison to reference implementation
# - Repeatable test results
```

**Alternative Approaches:**

*Option 2: Timestamped Directories*
```bash
# Create uniquely named directory with timestamp
mkdir react-vite-skeleton-test-$(date +%Y%m%d-%H%M%S)
# Pros: Keep multiple test runs for comparison
# Cons: Takes up more disk space, need to track which is latest
```

*Option 3: Manual Decision*
- Check if directory exists first
- Prompt user to decide: delete, keep and abort, or use timestamp
- Useful for comparing test runs side-by-side

**For Automated Tests**: Always use Option 1 (delete and recreate) to ensure consistency.

#### Setup Test Environment

```bash
# Clean up any existing test directory (recommended)
rm -rf /Users/matthewtrump/Developer/react-vite-skeleton-test

# Create a fresh test directory (outside this repo)
cd ..
mkdir react-vite-skeleton-test
cd react-vite-skeleton-test

# Copy only the PROMPT.md
cp ../react-vite-skeleton/PROMPT.md .
```

#### Generate Fresh App

**Manual Approach:**

1. Start a new Claude Code session in the test directory
2. Give Claude this instruction:
   ```
   Please read PROMPT.md and generate the complete React Vite skeleton application
   following all specifications. Build it from scratch.
   ```
3. Wait for generation to complete
4. Run the setup commands:
   ```bash
   npm install
   cp .env.example .env
   npm run dev
   ```

**Automated Approach (Recommended):**

Stay in the main repo directory and tell Claude Code:
```
Run a generation test
```

Claude will automatically:
1. Delete existing test directory (if present)
2. Create fresh test directory
3. Copy PROMPT.md
4. Generate complete app
5. Run npm install, build, and start dev server
6. Compare to reference implementation
7. Update GENERATION_TEST_LOG.md with results
8. Report pass/fail with details

This approach ensures:
- Clean slate every time (no leftover files)
- Single-session execution (no manual steps)
- Automatic logging of results
- Comparison with reference implementation

**Note**: The automated approach will clean up the test directory before starting, implementing Option 1 (delete and recreate) automatically.

#### Verify Generation Success

**Build & Start Checks:**
- [ ] `npm install` completes without errors
- [ ] `.env.example` exists and can be copied
- [ ] `npm run dev` starts without errors
- [ ] Server runs at http://localhost:5173
- [ ] `npm run build` completes without TypeScript errors
- [ ] No console errors in browser

**Feature Parity Checks:**
Compare generated app to reference implementation:
- [ ] All routes exist and work (/, /about, /login, /signup, /dashboard, /profile, /settings, /404)
- [ ] Authentication flow works (signup, login, logout, protected routes)
- [ ] Layout matches (Header with nav, Footer, responsive)
- [ ] UI components exist (Button, Input, Card, Loading, ErrorMessage)
- [ ] Design aesthetic matches (minimal, classy, Tailwind-based)
- [ ] FastAPI integration points are marked with comments
- [ ] API service layer structure matches

**File Structure Checks:**
- [ ] All expected directories exist (components/common, components/layout, components/auth, contexts, hooks, pages, services, types, utils)
- [ ] All expected files exist (App.tsx, routes.tsx, main.tsx, index.css)
- [ ] Configuration files correct (vite.config.ts, tsconfig.json, tailwind.config.js, etc.)

#### Document Results

After each generation test, document:
1. **Date & Time** - When test was performed
2. **Success/Failure** - Did generation work?
3. **Issues Found** - Any discrepancies from reference
4. **PROMPT.md Version** - Git commit hash or version number

Keep a log in this repository (could be GENERATION_TEST_LOG.md or similar).

### When to Run Generation Tests

Run generation tests:
- **After major PROMPT.md changes** - Always verify changes work
- **After reference app updates** - Ensure PROMPT.md still generates matching app
- **Before releases/major milestones** - Final verification
- **Periodically** (monthly?) - Catch any drift over time

## Keeping Reference and Template in Sync

This is the critical challenge: the reference implementation and PROMPT.md must stay synchronized.

### Workflow for Changes

When adding features or making changes:

1. **Update Reference Implementation First**
   - Make changes to this codebase
   - Test thoroughly (Testing Loop 1)
   - Commit changes

2. **Update PROMPT.md**
   - Document new features/changes in PROMPT.md
   - Be specific about implementation details
   - Include any new file structure or dependencies

3. **Test Generation**
   - Run Testing Loop 2
   - Verify fresh generation matches reference
   - Iterate on PROMPT.md if needed

4. **Update CLAUDE.md if needed**
   - Document architecture changes
   - Update development commands
   - Add integration notes

5. **Commit Everything Together**
   - Reference implementation + PROMPT.md + CLAUDE.md in same commit
   - Use descriptive commit message

### Red Flags

Watch for these warning signs:
- Generated app has different structure than reference
- Generated app has different dependencies
- Generated app missing features present in reference
- PROMPT.md describes features not in reference
- Build/test commands differ between apps

## Continuous Improvement

### Learning from Tests

After each testing cycle:
1. Note what works well
2. Note what breaks or causes confusion
3. Identify ambiguities in PROMPT.md
4. Look for ways to make generation more reliable

### Version Control

Consider tagging stable versions:
```bash
git tag -a v1.0.0 -m "Stable template with auth, routing, FastAPI integration"
git push origin v1.0.0
```

This lets you track which PROMPT.md versions are known-good.

## Test Automation Possibilities

Future enhancements could include:
- Script to automate generation testing
- Automated comparison of file structures
- Integration tests for auth flows
- Visual regression testing for UI
- CI/CD pipeline that tests generation on every PROMPT.md change

For now, manual testing is sufficient, but document everything to enable automation later.

## Questions to Ask During Testing

### For Feature Testing:
- Does this feel like a production-ready starting point?
- Is the code clean and well-organized?
- Would I want to build on top of this?
- Are the integration points clear?

### For Generation Testing:
- Could someone with just PROMPT.md recreate this app?
- Is the prompt unambiguous?
- Are there any implicit assumptions?
- Would this work 6 months from now with updated dependencies?

## Success Criteria

**This template is successful when:**
1. Reference app builds and runs without errors
2. PROMPT.md reliably generates matching apps
3. Generated apps can be immediately used as project starters
4. FastAPI integration is straightforward
5. Code quality is high and maintainable
6. Documentation is clear and complete

Test regularly, document findings, and iterate continuously.
