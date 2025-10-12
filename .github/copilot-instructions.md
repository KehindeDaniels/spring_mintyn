# Copilot Instructions for AI Agents

## Project Overview
This is a Next.js 14+ (App Router, TypeScript) dashboard and authentication system for "Mintyn" using the Mint Frontend Test API. The UI is modern (ShadCN, Tailwind), with real API data (TanStack Query) and a maintainable file structure.

## Architecture & Key Patterns
- **App Router**: Pages are in `src/app/` (e.g., `login/page.tsx`, `dashboard/page.tsx`).
- **Authentication**: Manual (no NextAuth/Firebase). Login/signup POST to API, store `access_token` in cookies (prefer `js-cookie` or `next/headers`), fallback to localStorage. Use Axios interceptors to attach token.
- **Protected Routes**: `/dashboard`, `/transactions`, `/settings` require auth. Protect via SSR middleware (`middleware.ts`) or client-side redirect if no token.
- **State Management**: Use Zustand (`store/useAuthStore.ts`) or Context API for auth state.
- **Data Fetching**: Use TanStack Query (`useQuery`, `useMutation`) for all API calls. QueryClientProvider is set in `layout.tsx`.
- **UI Components**: ShadCN UI in `components/ui/`. Sidebar (`Sidebar.tsx`), Navbar (`Navbar.tsx`), DashboardCards, TransactionTable.
- **Table Logic**: TanStack Table for sorting/pagination, rendered with ShadCN Table components. Status badges: orange (pending), green (approved).
- **Styling**: Tailwind CSS, ShadCN components, Lucide-react icons for nav.

## API Integration
- **Base URL**: `https://mint-frontend-test.onrender.com`
- **Endpoints**:
  - Signup: `POST /api/v1/auth/signup`
  - Login: `POST /api/v1/auth/login`
  - Current User: `GET /api/v1/auth/user`
  - Dashboard Stats: `GET /api/v1/dashboard/stats`
  - Transactions: `GET /api/v1/dashboard/transactions`

## Developer Workflows
- **Build**: `npm run build`
- **Dev**: `npm run dev`
- **Lint**: `npm run lint`
- **Test**: (Add if needed)
- **Install UI**: Use ShadCN CLI for new components.
- **Global Styles**: In `src/styles/globals.css`.

## Conventions & Examples
- **File Structure**: See suggested folders above. Keep logic modular (API in `lib/api.ts`, queries in `lib/queries.ts`).
- **Token Handling**: Always check for token before API calls. Use helpers in `lib/auth.ts`.
- **Error Handling**: Use ShadCN Toast for errors. Show Skeletons for loading states.
- **Formatting**: Use `Intl.NumberFormat` for amounts, `date-fns` for dates.
- **Logout**: Clear token, redirect to `/login`, use ShadCN Dialog for confirmation.

## Integration Points
- **Axios**: Centralized instance in `lib/api.ts` with interceptors.
- **TanStack Query**: All data fetching/caching.
- **Zustand**: Auth state management.
- **ShadCN**: UI consistency.

## References
- **Screenshots**: See `public/home.jpg` and `public/login.jpg` for UI inspiration.
- **Icons**: Use Lucide-react for sidebar/nav.

---

**For new features, follow the established folder/component patterns. Always use TanStack Query for API data and ShadCN for UI.**

---

> If any section is unclear or missing, please provide feedback for further refinement.