# Unbox Robotics — Project Documentation

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Project Architecture](#3-project-architecture)
4. [Development Setup](#4-development-setup)
5. [Code Quality](#5-code-quality)
6. [Security](#6-security)
7. [Performance](#7-performance)
8. [SEO & Metadata](#8-seo--metadata)
9. [Deployment](#9-deployment)
10. [Environment & Configuration](#10-environment--configuration)

---

## 1. Project Overview

Unbox Robotics is a warehouse automation company. This repository is the **public-facing marketing and informational website** built with React. It covers:

- Product & solution pages
- Industry-specific landing pages
- Resource hub (blogs, case studies, whitepapers)
- Contact and lead generation forms
- Survey system with token-based access
- Events and company pages

The frontend communicates with a separate backend API hosted at `unboxadmin.4tysixapplabs.com`.

---

## 2. Tech Stack

### Core Framework

| Library          | Version | Purpose                        |
| ---------------- | ------- | ------------------------------ |
| React            | 19.1.0  | UI framework                   |
| React Router DOM | 7.6.2   | Client-side routing            |
| Redux            | 5.0.1   | Global state management        |
| Redux Persist    | 6.0.0   | Persists state to localStorage |
| Redux Thunk      | 3.1.0   | Async Redux actions            |

### UI & Styling

| Library         | Version | Purpose                     |
| --------------- | ------- | --------------------------- |
| Material UI     | 7.1.2   | Component library           |
| Bootstrap       | 5.3.7   | Responsive grid & utilities |
| React Bootstrap | 2.10.10 | Bootstrap React wrappers    |
| Tailwind CSS    | 3.4.17  | Utility-first CSS           |
| Emotion         | 11.14.0 | CSS-in-JS for MUI           |
| Framer Motion   | 12.19.1 | Animations                  |

### Forms & Validation

| Library             | Version | Purpose                         |
| ------------------- | ------- | ------------------------------- |
| React Hook Form     | 7.70.0  | Form state management           |
| Zod                 | 4.3.5   | Schema-based validation         |
| @hookform/resolvers | 5.2.2   | Connects Zod to React Hook Form |

### Data & Networking

| Library | Version | Purpose                    |
| ------- | ------- | -------------------------- |
| Axios   | 1.14.0  | HTTP client                |
| SWR     | 2.4.1   | Data fetching with caching |

### Security

| Library              | Version | Purpose                |
| -------------------- | ------- | ---------------------- |
| DOMPurify            | 3.3.3   | HTML sanitization      |
| Cloudflare Turnstile | —       | Bot/CAPTCHA protection |

### Media & Content

| Library        | Version | Purpose                      |
| -------------- | ------- | ---------------------------- |
| Swiper         | 11.2.8  | Touch carousels              |
| HLS.js         | 1.6.15  | Video streaming (HLS format) |
| React Markdown | 10.1.0  | Markdown rendering           |
| React KaTeX    | 3.1.0   | Math equation rendering      |

### Other Utilities

| Library               | Version  | Purpose                              |
| --------------------- | -------- | ------------------------------------ |
| React Helmet Async    | 2.0.5    | Document `<head>` management         |
| React LazyLoad        | 1.6.3    | Lazy image loading                   |
| libphonenumber-js     | 1.12.10  | Phone number formatting & validation |
| SweetAlert2           | 11.26.17 | Modals & alerts                      |

### Server

| Library | Version | Purpose                         |
| ------- | ------- | ------------------------------- |
| Express | 4.21.2  | Node.js server for SSR metadata |

### Testing

| Library                   | Version | Purpose                    |
| ------------------------- | ------- | -------------------------- |
| React Testing Library     | 16.3.0  | Component testing          |
| @testing-library/jest-dom | 6.6.3   | DOM matchers               |
| Jest (via react-scripts)  | —       | Test runner                |
| Web Vitals                | 2.1.4   | Core Web Vitals monitoring |

---

## 3. Project Architecture

```
unbox/
├── public/               # Static assets, index.html, sitemap.xml
├── src/
│   ├── App.js            # Root router — 20+ lazy-loaded routes
│   ├── index.js          # React entry point, Redux store setup
│   ├── components/       # Reusable UI components
│   │   ├── common/       # Navbar, footer, forms, loaders, cookie banner
│   │   ├── home/         # Homepage-specific components
│   │   ├── solutions/    # Solutions section components
│   │   ├── technology/   # Technology section components
│   │   ├── forms/        # Survey and form components
│   │   ├── loader/       # Loading state components
│   │   ├── warehouse/    # Warehouse feature components
│   │   ├── company/      # Company page components
│   │   └── indusry/      # Industry-specific components
│   ├── pages/            # Route-level page components (22 pages)
│   ├── helpers/
│   │   ├── config.js     # API base URLs and environment config
│   │   └── utils.js      # HTML cleaning, shared utilities
│   ├── actions/          # Redux action creators (blogs, resources, locations)
│   ├── reducers/         # Redux reducers
│   ├── store/            # Redux store with redux-persist configuration
│   ├── hooks/            # Custom React hooks
│   └── assets/           # Images, icons, videos, CSS
├── meta/
│   └── renderMeta.js     # Server-side HTML meta tag rendering (SSR)
├── netlify/
│   └── functions/        # Netlify serverless functions
├── scripts/
│   └── generate-sitemap.js  # Post-build sitemap generator
├── server.js             # Express server for SSR
├── netlify.toml          # Netlify deployment configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── package.json          # Dependencies and scripts
```

### Routing Strategy

All routes are **lazy-loaded** using `React.lazy()` and `Suspense`, which means each page is split into a separate JS bundle and only loaded on demand. This significantly reduces the initial bundle size.

### State Management

Redux is used for global state (blogs, case studies, whitepapers, location data). `redux-persist` automatically saves and rehydrates this state from `localStorage`, reducing redundant API calls across page navigations.

---

## 4. Development Setup

### Prerequisites

- Node.js v18+
- npm v9+

### Installation

```bash
git clone <repository-url>
cd unbox
npm install
```

### Running the App

```bash
# Start local development server (hot reload)
npm start

# Start SSR/Express server (for metadata rendering)
npm run start:ssr

# Production build
npm run build

# Run tests
npm test
```

### Build Process

1. `npm run build` — compiles the React app to `/build`
2. `postbuild` hook automatically runs `npm run generate:sitemap` — generates `/public/sitemap.xml`

---

## 5. Code Quality

### Linting

ESLint is configured via the `eslintConfig` key in `package.json`:

```json
"eslintConfig": {
  "extends": [
    "react-app",
    "react-app/jest"
  ]
}
```

This enforces:

- React Hooks rules (no rules-of-hooks violations)
- Import order consistency
- Common JavaScript anti-patterns
- Accessibility best practices (jsx-a11y subset)

Run ESLint manually:

```bash
npx eslint src/
```

### CSS Processing

**PostCSS** with `autoprefixer` automatically adds vendor prefixes (`-webkit-`, `-moz-`, etc.) to CSS properties, ensuring cross-browser compatibility without manual effort.

**Tailwind CSS** is configured to scan all `src/**/*.{js,jsx,ts,tsx}` files and purge unused CSS classes in production, keeping the stylesheet bundle minimal.

### Form Validation

All forms use **React Hook Form** combined with **Zod schemas** for validation. This approach:

- Validates on the client before any network request is made
- Provides type-safe schema definitions
- Keeps validation logic separate from component rendering logic

Example validation schema (contact form):

```js
const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(8).max(15, "Invalid phone number"),
  message: z.string().min(1, "Message is required"),
});
```

### HTML Sanitization

The `/src/helpers/utils.js` file provides three dedicated utilities for handling HTML content received from the CMS/API:

| Function            | What it does                                                                         |
| ------------------- | ------------------------------------------------------------------------------------ |
| `cleanQuillHtml()`  | Normalizes spaces, removes empty paragraphs, adds missing `alt` attributes to images |
| `cleanTiptapText()` | Preserves intentional formatting spaces                                              |
| `cleanHtml()`       | Strips all HTML tags — plain text output                                             |

**DOMPurify** (v3.3.3) is installed as a last-resort sanitizer for any raw HTML that must be rendered via `dangerouslySetInnerHTML`.

### Code Patterns & Conventions

- **Functional components only** — no class components
- **Custom hooks** in `/src/hooks/` for shared stateful logic
- **Lazy loading** for all route-level page components
- **Axios** for all HTTP requests with `withCredentials: true` where cookies are required
- **SWR** for data that benefits from automatic revalidation and caching

---

## 6. Security

### Bot & CAPTCHA Protection — Cloudflare Turnstile

All public-facing forms are protected by **Cloudflare Turnstile** (a privacy-friendly alternative to reCAPTCHA). The implementation (`HumanGate.jsx`) works as follows:

1. On first visit, a Turnstile challenge is presented.
2. Upon success, the token is sent to the backend endpoint `/security/verify` for server-side validation.
3. The verified session is persisted in `localStorage` for **24 hours**, so users are not challenged again on repeat visits within that window.
4. Forms check for a valid session via `/security/check` before allowing submission.

**Variants available:**

- Full-page gate (blocks access until verified)
- Compact inline widget (embedded in forms)

### Input Validation & Sanitization

**Two layers of protection:**

1. **Client-side** — Zod schemas validate all user inputs (format, length, required fields) before the form is submitted.
2. **Server-side** — The backend API is responsible for final validation. The frontend treats the server response as the source of truth.

**Phone number handling:** Raw input is stripped of all non-digit characters using `/\D/g` before submission.

**Text fields:** Leading and trailing whitespace is trimmed via the `TextField` component to prevent blank-looking submissions.

### XSS (Cross-Site Scripting) Prevention

Multiple layers protect against XSS:

1. **React JSX auto-escaping** — React escapes all values rendered inside JSX by default. A string like `<script>alert(1)</script>` will be rendered as plain text, not executed.
2. **`escapeHtml()` in `renderMeta.js`** — The server-side metadata renderer manually escapes `&`, `<`, `>`, `"`, and `'` before injecting values into the HTML `<head>`. This prevents injection through SEO metadata fields.
3. **DOMPurify** — Available for use anywhere raw HTML from an external source must be rendered.
4. **HTML cleaning utilities** — `cleanHtml()` strips all tags; `cleanQuillHtml()` normalizes CMS-generated HTML.

### Credentials & Sensitive Configuration

All API base URLs and third-party tokens are managed via environment variables. Values are read from `.env` (local) or from the Netlify environment variable settings (staging/production). The `.env` file is listed in `.gitignore` and is never committed.

Use `.env.example` as a reference when setting up a new environment:

```env
REACT_APP_ENVIRONMENT=staging
REACT_APP_SF_ORG_ID=your_salesforce_org_id_here
REACT_APP_BASE_URL=https://unboxadmin.4tysixapplabs.com/api
REACT_APP_BACKEND_URL=https://unboxadmin.4tysixapplabs.com
REACT_APP_FRONTEND_URL=https://www.unboxrobotics.com
REACT_APP_IPINFO_TOKEN=your_ipinfo_token_here
REACT_APP_TURNSTILE_SITE_KEY=your_turnstile_site_key_here
```

All values are consumed via `/src/helpers/config.js` — no component reads `process.env` directly.

### CORS & Cookies

Axios is configured with `withCredentials: true` on requests that require cookies (e.g., Turnstile verification, form submissions). This allows the browser to send session cookies cross-origin while the backend enforces its CORS allowlist.

### Third-Party Integrations (Security Considerations)

| Service                | Usage                                | Risk Level                                                                |
| ---------------------- | ------------------------------------ | ------------------------------------------------------------------------- |
| Cloudflare Turnstile   | CAPTCHA / bot protection             | Low — industry standard                                                   |
| ipinfo.io              | IP geolocation for country detection | Low — read-only, non-sensitive                                            |
| Salesforce Web-to-Lead | Lead form submission                 | Medium — form posts to Salesforce endpoint; no sensitive data transmitted |

### Dependencies & Supply Chain

- All dependencies are pinned to exact versions in `package-lock.json`, preventing unexpected version drift.
- `npm audit` should be run regularly to check for known vulnerabilities:
  ```bash
  npm audit
  npm audit fix
  ```

---

## 7. Performance

### Code Splitting

Every page component is lazy-loaded:

```js
const HomePage = React.lazy(() => import("./pages/home/HomePage"));
```

This ensures only the code needed for the current page is downloaded by the browser.

### Image Lazy Loading

`react-lazyload` defers off-screen image loading until the user scrolls near them, reducing initial page load time and bandwidth.

### Static Asset Caching

Netlify cache headers (configured in `netlify.toml`):

| Asset Type                      | Cache Strategy             |
| ------------------------------- | -------------------------- |
| JS/CSS/media (hashed filenames) | 1 year, immutable          |
| HTML files                      | No cache (must-revalidate) |
| JSON files                      | No cache (must-revalidate) |

Hashed filenames ensure users always get the latest JS/CSS after a deploy while benefiting from long-term caching between deployments.

### Redux Persistence

Global data (blogs, case studies, whitepapers) is persisted to `localStorage`. On repeat visits, this data loads instantly from local storage without an API round-trip, then revalidates in the background.

---

## 8. SEO & Metadata

### Strategy

This is a Single Page Application (SPA), which presents a challenge for SEO because search engine crawlers may not execute JavaScript. The project solves this with a **dual rendering strategy**:

1. **Client-side** — `react-helmet-async` sets `<title>`, `<meta>` description, Open Graph, and Twitter Card tags dynamically per page.
2. **Server-side** — A lightweight Express server (`server.js`) and Netlify serverless function (`netlify/functions/meta`) inject pre-rendered meta tags into the raw HTML for dynamic content pages (blogs, case studies, whitepapers) before they reach the crawler.

### Sitemap

A sitemap (`/public/sitemap.xml`) is automatically regenerated on every production build via the `postbuild` npm script. It includes all 13 static routes with appropriate priority values:

- Homepage: priority `1.0`
- All other pages: priority `0.8`

### Dynamic Route Handling (Netlify)

Netlify redirects dynamic content routes to the SSR function:

```
/blogs/*           → /.netlify/functions/meta?path=/blogs/:splat
/case-study/*      → /.netlify/functions/meta?path=/case-study/:splat
/white-paper/*     → /.netlify/functions/meta?path=/white-paper/:splat
/*                 → /index.html  (SPA fallback)
```

---

## 9. Deployment

### Platform: Netlify (Staging)

**Netlify is used as the staging environment.** Every push to the connected Git branch triggers an automatic build and deploy on Netlify, making it the primary platform for reviewing and testing changes before they go to production.

Netlify configuration (`netlify.toml`):

```toml
[build]
  command = "npm run build"
  publish = "build/"
  functions = "netlify/functions"
```

### Environment Variables on Netlify

All `REACT_APP_*` variables must be set in the Netlify dashboard under **Site Settings → Environment Variables**. They are injected at build time — changing a variable requires a redeploy to take effect.

| Variable                   | Description                        |
| -------------------------- | ---------------------------------- |
| `REACT_APP_ENVIRONMENT`    | Set to `staging` or `production`   |
| `REACT_APP_SF_ORG_ID`      | Salesforce Web-to-Lead Org ID      |
| `REACT_APP_BASE_URL`       | Backend API base URL               |
| `REACT_APP_BACKEND_URL`    | Backend server base URL            |
| `REACT_APP_FRONTEND_URL`   | Public frontend URL                |
| `REACT_APP_IPINFO_TOKEN`   | ipinfo.io API token                |
| `REACT_APP_TURNSTILE_SITE_KEY` | Cloudflare Turnstile site key  |

### Deployment Steps

1. Push code to the connected Git branch.
2. Netlify automatically triggers a build.
3. Build runs `npm run build` → compiles React app → generates sitemap.
4. Netlify deploys the `build/` directory as a static site with serverless functions.

### Manual Deploy (CLI)

```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

### SSR Server (Alternative)

For environments that require server-side rendering, the Express server can be used:

```bash
npm run build
npm run start:ssr
# Runs on PORT (env var) or 3000 by default
```

---

## 10. Environment & Configuration

### Central Configuration File

All environment-driven values and shared constants are managed in `/src/helpers/config.js`. No component reads `process.env` directly — everything goes through this file.

**Environment variables (read from `.env` or Netlify):**

```js
export const environment      = process.env.REACT_APP_ENVIRONMENT;
export const sfOrgId          = process.env.REACT_APP_SF_ORG_ID;
export const base_url         = process.env.REACT_APP_BASE_URL;
export const backendUrl       = process.env.REACT_APP_BACKEND_URL;
export const frontendUrl      = process.env.REACT_APP_FRONTEND_URL;
export const ipInfoToken      = process.env.REACT_APP_IPINFO_TOKEN;
export const turnstileSiteKey = process.env.REACT_APP_TURNSTILE_SITE_KEY;
```

**Shared constants (centralised to avoid duplication across components):**

```js
export const contactEmail  = "sales@unboxrobotics.com";
export const instagramUrl  = "https://www.instagram.com/lifeatunbox/";
export const linkedinUrl   = "https://www.linkedin.com/company/unboxrobotics/";
export const xUrl          = "https://x.com/RoboticsUnbox";
export const facebookUrl   = "https://www.facebook.com/unboxrobotics/";
export const youtubeUrl    = "https://www.youtube.com/@unboxrobotics";
```

### API Endpoints

| Endpoint                   | Method   | Purpose                           |
| -------------------------- | -------- | --------------------------------- |
| `/contact`                 | POST     | Contact form submission           |
| `/survey/validate/{token}` | GET/POST | Survey token verification         |
| `/front/blogs`             | GET      | Fetch blog posts                  |
| `/front/case-studies`      | GET      | Fetch case studies                |
| `/front/white-papers`      | GET      | Fetch whitepapers                 |
| `/privacy-policy`          | GET      | Privacy policy content            |
| `/terms-condition`         | GET      | Terms & conditions content        |
| `/gdpr-compliance`         | GET      | GDPR page content                 |
| `/dpa`                     | GET      | Data Processing Agreement content |
| `/security/check`          | GET      | Check Turnstile session validity  |
| `/security/verify`         | POST     | Verify Turnstile challenge token  |

### Available npm Scripts

| Script             | Command                            | Description                               |
| ------------------ | ---------------------------------- | ----------------------------------------- |
| `start`            | `react-scripts start`              | Local dev server with hot reload          |
| `build`            | `react-scripts build`              | Production build to `/build`              |
| `start:ssr`        | `node server.js`                   | Start Express SSR server                  |
| `test`             | `react-scripts test`               | Run Jest test suite                       |
| `generate:sitemap` | `node scripts/generate-sitemap.js` | Generate sitemap.xml                      |
| `postbuild`        | _(auto)_                           | Runs sitemap generation after every build |
