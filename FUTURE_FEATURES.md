# Future Features

This document tracks features that are planned or partially implemented but not yet functional.

## Planned Features

### Dark Mode Implementation
**Status**: Placeholder UI exists
**Location**: Settings page (`src/pages/Settings.tsx`)
**Current State**:
- Theme dropdown exists in Settings with Light/Dark/System options
- No actual dark mode functionality connected
- Tailwind CSS is structured to support dark mode (can be enabled with `darkMode: 'class'` in config)

**To Implement**:
1. Create ThemeContext for managing light/dark/system state
2. Enable dark mode in `tailwind.config.js` (`darkMode: 'class'`)
3. Add dark mode variants to components (e.g., `dark:bg-gray-900`, `dark:text-white`)
4. Connect Settings dropdown to ThemeContext
5. Persist theme preference to localStorage
6. Apply/remove `dark` class on `<html>` element based on theme

**Estimated Effort**: 1-2 hours

---

### Modal/Dialog Component
**Status**: Listed in PROMPT.md but not implemented
**Location**: Would go in `src/components/common/Modal.tsx`
**Current State**: Not implemented

**To Implement**:
- Basic modal component with backdrop
- Close on click outside or ESC key
- Animations (fade in/out)
- Accessible (focus trap, ARIA attributes)

**Estimated Effort**: 30-60 minutes

---

### Two-Factor Authentication
**Status**: Mentioned in Profile page as placeholder
**Location**: Profile page (`src/pages/Profile.tsx`)
**Current State**: Shows "Not enabled" with "Enable" button, but button does nothing

**To Implement**:
- Would require backend support (QR code generation, TOTP validation)
- Frontend UI for setup flow
- Verification code input
- Recovery codes

**Estimated Effort**: Backend + Frontend, 4-6 hours

---

### Form Validation Enhancements
**Status**: Basic validation exists, could be enhanced
**Current State**:
- Login/Signup forms have basic validation (required fields, password length, match)
- Error messages are custom-coded per form

**Potential Improvements**:
- Use validation library (Zod, Yup, React Hook Form)
- Consistent validation patterns across all forms
- Real-time validation feedback
- Better error message UX

**Estimated Effort**: 2-3 hours

---

## Feature Requests

*User-requested features will be tracked here*

---

## Completed Features

*Move features here once implemented*

