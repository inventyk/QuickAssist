# QuickAssist

A web-first, cross-platform personal errand and local assistance experience built with Expo, React Native, React Native Web, and TypeScript.

## Current website
- Responsive landing page
- Service catalogue with filters and service detail modal
- Individual task starting prices
- Optional monthly membership plans
- FAQ and service journey sections
- Cross-platform entrance and floating animations using React Native Animated

## Pricing approach
Prices shown on the website are indicative starting prices. Final quotes depend on task scope, distance, duration, waiting, urgency, item count and complexity. Product purchases and transport costs are separate where applicable. A small platform fee is included in the displayed price and disclosed in the final breakdown.

Memberships are optional convenience plans. They do not include free tasks; each task is priced separately.

## Development
```bash
npm install
npm run web
```

Native development:
```bash
npm run android
npm run ios
```

Checks:
```bash
npm run typecheck
npm run build:web
```

## Architecture
- `src/app`: app root and top-level navigation
- `src/components`: reusable layout and animation components
- `src/features`: feature-specific pages, components and data
- `src/config`: pricing and application configuration

This version is a frontend prototype. It does not yet process bookings, payments, user authentication, helper allocation, or live tracking. Do not advertise these as active capabilities until a backend is connected.
