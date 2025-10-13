# Spring Mintyn

A modern, modular, and scalable **Next.js (App Router)** dashboard application built for the Mintyn Frontend Test.
This project demonstrates clean architecture, reusable components, and robust API integrations with **React Query**, **Zustand**, and **TypeScript** — all wrapped in a responsive and theme-aware UI powered by **Tailwind CSS v4**.



---

## Architecture & Logic Behind Structure

The project is intentionally structured to mirror real-world modularity and scalability:

| Layer                           | Purpose                                                                                                                            |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **`/app`**                      | Routes and layouts. Each route (e.g., `/login`, `/dashboard`) is isolated and can have its own layout and providers.               |
| **`/components/ui`**            | Reusable ShadCN-style components for buttons, cards, inputs, etc. Designed with `class-variance-authority` for extendable theming. |
| **`/components/Topbar.tsx`**    | Shared navigation bar — reused across auth and dashboard flows, conditionally rendering content based on route.                    |
| **`/hooks`**                    | Business logic separation. `useLogin` and `useSignup` abstract React Query mutations out of UI for better reusability.             |
| **`/store`**                    | Global state management using **Zustand**, for lightweight token and session management.                                           |
| **`/lib/api.ts`**               | Centralized Axios instance with interceptors and environment-based configuration.                                                  |
| **`/app/dashboard/components`** | Encapsulated dashboard UI modules (cards, filters, sidebar, tables) — making the dashboard view fully reusable as a component.     |
| **`/providers.tsx`**            | Wraps React Query and Theme providers globally for the entire app.                                                                 |
| **`/globals.css`**              | Tailwind theme tokens with CSS variables for dark/light color schemes using OKLCH color spaces.                                    |

This modular structure ensures that features like authentication, dashboard stats, and theme toggling remain independent and easy to extend.

---

## 🧩 Tech Stack

| Tool / Library                          | Purpose                 | Why                                                                           |
| --------------------------------------- | ----------------------- | ----------------------------------------------------------------------------- |
| **Next.js 15 (App Router + Turbopack)** | Framework               | Offers file-based routing, built-in API handling, and fast hot reloads.       |
| **React 19**                            | Core UI library         | Provides concurrent rendering and hooks API for managing state and lifecycle. |
| **TypeScript**                          | Static typing           | Ensures reliability and reduces runtime bugs.                                 |
| **Tailwind CSS v4**                     | Styling                 | Enables rapid, responsive design with theming via CSS variables.              |
| **Lucide React**                        | Icons                   | Lightweight, consistent SVG icon library.                                     |
| **Zustand**                             | Global state            | Minimalistic, simple, and scalable token/session management.                  |
| **@tanstack/react-query**               | Server state management | Handles caching, background refetching, and mutation states elegantly.        |
| **Axios**                               | HTTP client             | Simplifies API handling with interceptors for tokens and base URLs.           |
| **Sonner**                              | Toast notifications     | Provides sleek, color-coded success/error feedback.                           |
| **Next Themes**                         | Dark mode handling      | Lightweight system for theme persistence across reloads.                      |
| **tw-animate-css**                      | Tailwind animations     | Adds elegant transitions and subtle UI feedback.                              |

---

## 🎨 Theming

Theming from shadcn

The **ModeToggle** component interacts with these variables to seamlessly switch between dark and light modes.

---

##  Authentication Flow

- User credentials are handled through **React Query mutations** (`useLogin`, `useSignup`).
- Upon success, an access token is stored in Zustand’s `useAuthStore`.
- Routes are protected via a check in the Home page (`app/page.tsx`), redirecting unauthorized users to `/login`.
- Login and Signup pages each include a **manual Topbar** and validation logic with toast feedback.

---

## Dashboard Overview

The Dashboard is fully dynamic and modular:

- **Stat Cards** show total sales and commissions using the `/v1/dashboard/stats` API.
- **Transaction Table** lists all transactions with pagination and color-coded statuses.
- **Filters & Search** integrate with URL query params using `useSearchParams` for a reactive search UX.
- **Sidebar** and **Topbar** communicate via local `useState` toggles for mobile responsiveness.

The dashboard can also be rendered as a standalone `DashboardView` component and reused elsewhere — for example, as a home screen when authenticated.

---

## Challenges & Fixes

### 1. Handling CORS Errors

Initially, requests to `/api/v1/auth/*` failed with **CORS issues** during local development.
We resolved this by:

- Adding a local `next.config.ts` rewrite proxy for `/api` routes.
- Configuring `axios` to use the correct backend base URL with `withCredentials: false`.

### 2. HTTP Status Inconsistencies

The backend returned **HTTP 200** for failed login attempts instead of `401/400`.
To handle this gracefully, we relied on the `error` field in the API response instead of status codes — allowing clear toast feedback:

```ts
if (data.error) toast.error(data.error);
else toast.success("Login successful");
```

### 🧩 3. UI Consistency & Theming

Originally, components mixed raw color codes and Tailwind’s `dark:` variant.
We unified this by introducing **theme tokens** in `globals.css`, eliminating hardcoded values and ensuring perfect dark/light parity.

---

## 💡 Design Decisions

| Decision                                | Reason                                                                 |
| --------------------------------------- | ---------------------------------------------------------------------- |
| Separate `useLogin` / `useSignup` hooks | Keeps UI files clean and focused only on rendering logic.              |
| Zustand for auth                        | Lightweight and avoids Context boilerplate.                            |
| Custom `Topbar` per auth route          | Simpler and avoids conditional rendering in root layout.               |
| React Query over Context or SWR         | Provides better mutation control and caching.                          |
| Tailwind variable-based theming         | Consistent design across both dark/light modes with no inline styling. |

---

## 🎨 UI & Custom Design Work

- The **Signup page** was **manually designed** since it wasn’t provided in the original Figma.
- Both auth pages follow pixel-perfect alignment, spacing, and color consistency with the provided **login screen design**.
- Dashboard visuals (StatCard, Table, Filters) were styled based on the provided layout image with minor usability refinements.

---

## 🧰 Development Commands

```bash
# Run dev server (Turbopack)
npm run dev

# Build for production
npm run build

# Start production build
npm start

# Lint
npm run lint
```

---

## 🌗 Features Summary

✅ Dark/Light mode with CSS variable theming
✅ Auth (Login/Signup) with password toggle
✅ Zustand global token management
✅ Protected dashboard route with redirect logic
✅ API data fetching & caching with React Query
✅ Fully modular UI architecture
✅ Responsive Sidebar + Topbar
✅ Toast feedback via Sonner
✅ TypeScript-strict setup
✅ Clean, scalable file structure

---

##  Author

**👨‍💻 Kehinde Daniels**
Frontend Engineer — React, Next.js, TypeScript, and Fintech UI specialist.
Designed and implemented all views (including the Signup page) and handled architectural, state, and API integration decisions.

---
