# Codebase Index

## Overview

- Project: Bonjour Brew Cafe marketing site
- Stack: React 18 + TypeScript + Vite 6 + Tailwind CSS 4
- App type: Landing site with lightweight path-based view switching (`/` and `/menu`)
- Entry flow: `index.html` -> `src/main.tsx` -> `src/app/App.tsx`

## Runbook

- Install: `npm i` (or `pnpm i`)
- Dev server: `npm run dev`
- Build: `npm run build`

## Top-Level Structure

- `src/main.tsx`: React root mount and global stylesheet import
- `src/app/App.tsx`: Primary app shell and pathname-based view switching
- `src/app/components/`: Feature/section components used by App
- `src/lib/`: Shared frontend API helpers and content fallbacks
- `src/app/components/ui/`: Shadcn/Radix UI primitives (library layer)
- `src/styles/`: Global style pipeline (`fonts.css`, `tailwind.css`, `theme.css`)
- `src/imports/`: Static image assets used by sections
- `vite.config.ts`: Vite setup, React plugin, Tailwind plugin, `@` alias to `src`

## Page Composition (App)

Rendered in this order from `src/app/App.tsx`:

1. `Navbar`
2. `Hero`
3. `About`
4. `MenuPreview`
5. `Instagram`
6. `SpecialHighlight`
7. `Testimonials`
8. `Contact`
9. `Footer`
10. `FloatingButtons`

Alternate app view:

1. `FullMenu` (rendered when path is `/menu`)

## Component Index

- `src/app/components/Navbar.tsx`
  - Sticky navbar with scroll-aware style changes
  - Mobile menu toggle state
  - Smooth scroll navigation to section IDs (`menu`, `about`, `instagram`, `contact`)

- `src/app/components/Hero.tsx`
  - Full-screen hero with auto-rotating local slideshow background (`image.jpeg` to `image6.jpeg`)
  - CTA buttons scroll to menu/contact sections
  - Falls back to local hero images if backend data is unavailable
  - Intro animation (`animate-fadeIn`)

- `src/app/components/About.tsx`
  - Story section with logo and descriptive copy
  - Uses brand palette variables from `theme.css`

- `src/app/components/MenuPreview.tsx`
  - Menu cards loaded from backend `/api/content/menu` with local fallback items
  - Uses `ImageWithFallback` for resilient image rendering
  - Category badge + price display + CTA button that opens `/menu`

- `src/app/components/FullMenu.tsx`
  - Dedicated full menu screen (path: `/menu`)
  - Menu data loaded from backend `/api/content/menu` with the same fallback items
  - Back button that returns to homepage view (`/`)

- `src/app/components/Instagram.tsx`
  - Gallery grid loaded from backend `/api/content/gallery` with local fallback images
  - Hover overlay displays caption text from MongoDB records
  - External Instagram link CTA

- `src/app/components/SpecialHighlight.tsx`
  - Promotional gradient banner section
  - Decorative background shapes and message-only content (CTA buttons removed)

- `src/app/components/Testimonials.tsx`
  - Auto-advancing testimonial carousel (5s interval)
  - Review data loaded from backend `/api/content/reviews` with local fallback reviews
  - Local `currentIndex` state and dot navigation

- `src/app/components/Contact.tsx`
  - Address/hours/phone blocks and action buttons
  - Embedded Google Maps iframe in the map panel

- `src/app/components/Footer.tsx`
  - Brand/signature footer with quick links and social links (Instagram + WhatsApp)
  - Section-scroll quick links and static contact details (phone + address)

- `src/app/components/FloatingButtons.tsx`
  - Persistent WhatsApp quick-contact button
  - Scroll-to-top button appears after scrolling
  - Desktop-only "Visit Us Today" anchor link

- `src/app/components/figma/ImageWithFallback.tsx`
  - Shared image helper used in visual grids/cards

## Styling and Theme Index

- `src/styles/index.css`
  - Imports `fonts.css`, `tailwind.css`, and `theme.css`

- `src/styles/fonts.css`
  - Imports Google fonts: Playfair Display (headings), Poppins (body)

- `src/styles/tailwind.css`
  - Tailwind v4 setup and source scanning

- `src/styles/theme.css`
  - CSS variables for system and brand colors
  - Tailwind theme token mapping via `@theme inline`
  - Base typography defaults + custom animations + scrollbar styling
  - Global smooth scrolling and mobile font-size adjustment

## Data and State Notes

- Data is local/static in component files (menu items, posts, testimonials)
- No API calls, no backend integration, no state management library
- Interactive behavior is mostly local `useState/useEffect` and DOM scrolling

## External Dependencies (Practical Use)

- Core runtime: React, React DOM, Vite
- Styling: Tailwind CSS v4, tw-animate-css
- UI utility layer present: Radix UI + shadcn component set
- Motion package installed (`motion`) but not currently central in main sections

## Current Architecture Snapshot

- Routing: lightweight pathname handling in app state (`/` and `/menu`)
- Forms: no form submission pipeline yet
- Maps: embedded Google Maps iframe in Contact section
- Content source: backend content APIs with local fallbacks in `src/lib/content.ts`

## Backend Content APIs

- `backend/src/routes/publicContent.js`
  - `GET /api/content/hero-slides`
  - `GET /api/content/menu`
  - `GET /api/content/gallery`
  - `GET /api/content/reviews`
- `backend/src/routes/adminContent.js`
  - Firebase-protected CRUD for hero slides, menu items, gallery images, and reviews
  - Cloudinary upload endpoint at `/api/admin/upload-image`

## Fast Navigation

- Start here: `src/app/App.tsx`
- Section behavior: `src/app/components/*.tsx`
- Theme customization: `src/styles/theme.css`
- Build/dev config: `package.json`, `vite.config.ts`