# Project Health Report — Unbox Robotics Website

**Report Date:** May 1, 2026  
**Project:** Unbox Robotics — Public Marketing Website  
**Repository:** `unbox` (React SPA)  
**Prepared by:** 4tysixapplabs Development Team  
**Report Type:** Technical Health Assessment

## 1. Executive Summary

The Unbox Robotics marketing website is a **React-based Single Page Application (SPA)**. The codebase is in **good overall health** — it is actively maintained, well-structured, and production-ready. The project covers 22 pages including product, industry, resource (blogs/case studies/whitepapers), contact, and compliance pages.

**Key Strengths:**

- Clean, well-organized codebase with no outstanding technical debt markers
- Strong security posture (bot protection, XSS prevention, input sanitization)
- Efficient performance patterns (lazy loading, code splitting, asset caching)
- Comprehensive documentation (DOCS.md)
- Active development history (297 commits, multiple contributors)

## 2. Overall Health Score

| Category           | Score      | Status       |
| ------------------ | ---------- | ------------ |
| Architecture       | 9/10       | Excellent    |
| Code Quality       | 8/10       | Good         |
| Security           | 9/10       | Excellent    |
| Performance        | 8/10       | Good         |
| Dependency Health  | 7/10       | Satisfactory |
| Deployment & CI/CD | 8/10       | Good         |
| SEO & Metadata     | 9/10       | Excellent    |
| Documentation      | 9/10       | Excellent    |
| **Overall**        | **8.3/10** | **Good**     |

> **Verdict:** The project is production-ready and stable. The primary area of concern is the absence of automated tests, which should be addressed to ensure long-term maintainability.

## 3. Project Overview

| Property             | Value                                           |
| -------------------- | ----------------------------------------------- |
| Application Type     | Public-facing marketing & informational website |
| Framework            | React 19.1.0 (Create React App)                 |
| Routing              | Client-side (React Router DOM 7.6.2)            |
| Total Pages          | 22 page routes                                  |
| Total Source Files   | 459 files                                       |
| Total JSX Components | 109 components                                  |
| Staging Platform     | Netlify                                         |
| Backend API          | `unboxadmin.4tysixapplabs.com`                  |
| Live URL             | `https://www.unboxrobotics.com`                 |
| Total Git Commits    | 297                                             |

### Pages Covered

| Section         | Pages                                                |
| --------------- | ---------------------------------------------------- |
| Core            | Home, Technology, Product                            |
| Solutions       | Solutions overview + industry-specific landing pages |
| Industry        | E-commerce, Retail, 3PL, CEP, and more               |
| Resources       | Blogs, Case Studies, Whitepapers                     |
| Company         | About, Careers, Events                               |
| Lead Generation | Get in Touch, Survey, Marketing pages                |
| Legal           | Privacy Policy, Terms & Conditions, GDPR, DPA        |
| Utility         | Success Page, Error Page (404)                       |

---

## 4. Tech Stack & Architecture

### Core Technologies

| Layer            | Technology                       | Version | Status  |
| ---------------- | -------------------------------- | ------- | ------- |
| UI Framework     | React                            | 19.1.0  | Current |
| Routing          | React Router DOM                 | 7.6.2   | Current |
| State Management | Redux + Redux Persist + Thunk    | 5.0.1   | Current |
| Build Tool       | Create React App (react-scripts) | 5.0.1   | Stable  |
| Server           | Express.js (SSR metadata)        | 4.22.1  | Current |

### UI & Styling

| Library       | Version | Status   | Notes                         |
| ------------- | ------- | -------- | ----------------------------- |
| Material UI   | 7.1.2   | Outdated | v9 available (2 major behind) |
| Bootstrap     | 5.3.7   | Current  |                               |
| Tailwind CSS  | 3.4.17  | Outdated | v4 available (1 major behind) |
| Framer Motion | 12.19.1 | Current  |                               |
| Emotion       | 11.14.0 | Current  |                               |

### Architecture Highlights

- **Lazy Loading:** Every page is loaded on-demand using `React.lazy()` and `Suspense`, reducing the initial JS bundle.
- **State Persistence:** Redux store is persisted to `localStorage` via `redux-persist`, eliminating redundant API calls on repeat visits.
- **Centralized Config:** All environment variables and shared constants flow through `/src/helpers/config.js` — no scattered `process.env` calls in components.
- **Dual SEO Strategy:** Client-side `react-helmet-async` + server-side Express/Netlify serverless function (used in staging) for dynamic content pages.

## 5. Code Quality

### Summary

| Metric                     | Value            | Assessment    |
| -------------------------- | ---------------- | ------------- |
| TODO / FIXME comments      | 0                | Excellent     |
| Console.log statements     | 19               | Acceptable    |
| Commented-out code blocks  | ~1               | Minor         |
| Typo in directory name     | 1 (`indusry/`)   | Minor         |
| Mixed package managers     | Yes (npm + yarn) | Should fix    |
| Functional components only | Yes              | Best Practice |
| Custom hooks               | 2                | Appropriate   |
| ESLint config              | CRA default      | Basic         |

### Positive Observations

- All components use **functional component** pattern (no class components)
- **Custom hooks** (`useResources`, `useWindowWidth`) correctly abstract shared stateful logic
- **Form validation** uses React Hook Form + Zod — a robust, type-safe approach
- **HTML sanitization** properly uses DOMPurify for any raw HTML rendered via `dangerouslySetInnerHTML`
- **Zero technical debt markers** — no TODO/FIXME comments indicating pending work
- **Centralized constants** in `config.js` prevent duplication across components

### Code Conventions

| Convention                     | Followed |
| ------------------------------ | -------- |
| Functional components only     | Yes      |
| Lazy loading for all routes    | Yes      |
| Centralized env/config         | Yes      |
| Axios for HTTP requests        | Yes      |
| SWR for cached data fetching   | Yes      |
| Zod schema validation on forms | Yes      |
| DOMPurify for raw HTML         | Yes      |

### Minor Issues

1. **Commented-out component:** `<EventPopup />` is commented out in `App.js` — should be removed or restored

## 6. Security Assessment

### Overall Security Rating: **Strong (9/10)**

The project demonstrates a mature, multi-layered security approach.

### Bot & CAPTCHA Protection

**Implementation:** Cloudflare Turnstile (privacy-friendly CAPTCHA)

- All public-facing forms are gated behind Turnstile verification
- `HumanGate.jsx` handles the verification flow
- Tokens are validated server-side via `/security/verify` endpoint
- Verified sessions persist for 24 hours in `localStorage` (no re-challenge on repeat visits)
- Available in full-page gate mode and compact inline widget mode

### XSS Prevention

Four independent layers protect against Cross-Site Scripting:

| Layer | Mechanism                                    | Coverage                               |
| ----- | -------------------------------------------- | -------------------------------------- |
| 1     | React JSX auto-escaping                      | All JSX-rendered content               |
| 2     | `escapeHtml()` in `renderMeta.js`            | Server-side injected meta tags         |
| 3     | DOMPurify sanitization                       | Raw HTML via `dangerouslySetInnerHTML` |
| 4     | `cleanHtml()` / `cleanQuillHtml()` utilities | CMS-sourced HTML content               |

### Input Validation

- **Client-side:** Zod schemas validate format, length, and required fields before any network request
- **Phone numbers:** Non-digit characters stripped via `/\D/g` regex before submission
- **Text fields:** Whitespace trimmed to prevent blank-looking submissions
- **Server-side:** Backend API performs final authoritative validation

### Credentials & Secrets Management

- All API keys and tokens stored in `.env` (never committed — in `.gitignore`)
- `.env.example` provides safe template for team onboarding
- No hard-coded credentials found in source code
- All environment values centralized through `config.js`

### Third-Party Integrations

| Service              | Usage                       | Risk Level |
| -------------------- | --------------------------- | ---------- |
| Cloudflare Turnstile | Bot/CAPTCHA protection      | Low        |
| ipinfo.io            | IP geolocation detection    | Low        |
| Salesforce           | Web-to-Lead form submission | Low-Medium |

### CORS & Cookies

- Axios configured with `withCredentials: true` for cross-origin cookie support
- Backend enforces CORS allowlist (server-side control)

### Recommendations

1. Run `npm audit` regularly and apply security patches promptly
2. Consider adding Content Security Policy (CSP) headers on the production server configuration
3. Review Salesforce Web-to-Lead integration for any PII transmission concerns

---

## 7. Performance

### Overall Performance Rating: **Good (8/10)**

### Code Splitting & Lazy Loading

Every one of the 22 page routes is lazy-loaded:

```js
const HomePage = React.lazy(() => import("./pages/home/HomePage"));
```

This means the browser only downloads code for the current page — significantly reducing initial load time.

### Image Optimization

- `react-lazy-load-image-component` defers off-screen image loading
- Assets use modern formats: 76 WebP, 60 PNG (WebP preferred where supported)
- 106 SVG icons (vector, resolution-independent)

### Static Asset Caching

Cache headers are configured in `netlify.toml` for the staging environment:

| Asset Type       | Cache Strategy             |
| ---------------- | -------------------------- |
| JS / CSS / Media | 1 year, immutable          |
| HTML files       | No cache (must-revalidate) |
| JSON / Manifest  | No cache (must-revalidate) |

Hashed filenames ensure users always receive the latest assets after deployment. The same caching strategy should be applied in the production environment.

### Redux Persistence

Content data (blogs, case studies, whitepapers) is stored in `localStorage` via `redux-persist`. Repeat visitors load this data instantly without an API call, then revalidate in the background.

### Recommendations

1. Audit media assets — 11 MP4 video files may impact page weight; consider lazy loading or replacing with HLS streams
2. Consider next-gen image optimization (e.g., AVIF alongside WebP)
3. Add Lighthouse CI to the deployment pipeline for automated performance regression detection

---

## 8. Dependency Health

### Summary

| Category                | Count   | Status            |
| ----------------------- | ------- | ----------------- |
| Dependencies            | 38      | Generally current |
| Dev Dependencies        | 3       | Current           |
| Critically outdated     | 1 (MUI) | Action needed     |
| Moderately outdated     | 4       | Monitor           |
| Current / Minor updates | 33      | Good              |

### Outdated Packages

| Package                     | Current | Latest | Gap     | Priority |
| --------------------------- | ------- | ------ | ------- | -------- |
| @mui/material               | 7.1.2   | 9.0.0  | 2 major | High     |
| tailwindcss                 | 3.4.17  | 4.x    | 1 major | Medium   |
| web-vitals                  | 2.1.4   | 5.x    | 3 major | Medium   |
| @testing-library/user-event | 13.5.0  | 14.x   | 1 major | Low      |
| express                     | 4.22.1  | 5.x    | 1 major | Low      |
| react-helmet-async          | 2.0.5   | 3.x    | 1 major | Low      |

### Current / Healthy Packages

| Package          | Version | Status  |
| ---------------- | ------- | ------- |
| React            | 19.1.0  | Current |
| React Router DOM | 7.6.2   | Current |
| Redux            | 5.0.1   | Current |
| Axios            | 1.14.0  | Current |
| React Hook Form  | 7.70.0  | Current |
| Zod              | 4.3.5   | Current |
| Framer Motion    | 12.19.1 | Current |
| DOMPurify        | 3.3.3   | Current |
| SWR              | 2.4.1   | Current |

---

## 9. Deployment & CI/CD

### Overall Deployment Rating: **Good (8/10)**

### Staging Environment: Netlify

Netlify is used exclusively as the **staging environment**. Every push to the connected Git branch triggers an automatic build and deploy on Netlify, making it the primary platform for reviewing and testing changes before they go to production.

| Property             | Value                             |
| -------------------- | --------------------------------- |
| Build Command        | `npm run build`                   |
| Publish Directory    | `build/`                          |
| Serverless Functions | `netlify/functions/`              |
| Auto Deploy          | Yes (on push to connected branch) |
| Post-build           | Sitemap auto-generated            |

### Staging Serverless Functions (Netlify)

| Function  | Purpose                                                                 |
| --------- | ----------------------------------------------------------------------- |
| `meta.js` | Server-side rendering of HTML meta tags for dynamic content pages (SEO) |

### Staging Redirect Strategy

Configured in `netlify.toml` for the staging environment:

| Route            | Redirected To                                       | Purpose      |
| ---------------- | --------------------------------------------------- | ------------ |
| `/blogs/*`       | `/.netlify/functions/meta?path=/blogs/:splat`       | SSR metadata |
| `/case-study/*`  | `/.netlify/functions/meta?path=/case-study/:splat`  | SSR metadata |
| `/white-paper/*` | `/.netlify/functions/meta?path=/white-paper/:splat` | SSR metadata |
| `/*`             | `/index.html`                                       | SPA fallback |

### Production Deployment

The production build is served via the Express SSR server (`server.js`) on a Node.js host, independent of Netlify.

```bash
npm run build
npm run start:ssr   # Runs on PORT env var or 3000 by default
```

## 10. SEO & Metadata

### Overall SEO Rating: **Excellent (9/10)**

### Implementation

The project uses a sophisticated dual-rendering strategy to ensure both users and search engine crawlers receive full metadata:

| Layer       | Technology                                              | Coverage                                           |
| ----------- | ------------------------------------------------------- | -------------------------------------------------- |
| Client-side | `react-helmet-async`                                    | All static pages                                   |
| Server-side | Express (`server.js`) + Netlify Function (staging only) | Dynamic content (blogs, case studies, whitepapers) |

### Sitemap

- `sitemap.xml` is auto-generated on every production build via `postbuild` script
- Includes all 13+ static routes with priority values
- Homepage priority: `1.0`
- All other pages: `0.8`

### robots.txt

- Present in `/public/robots.txt`
- Properly configured for crawler access

### Open Graph & Social Cards

- OG tags and Twitter Card tags set per page via `react-helmet-async`
- Dynamic content pages (blogs, case studies) have server-side injected meta tags for accurate social sharing previews

-
