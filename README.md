# QuickAssist

A web-first, cross-platform personal errand and local assistance experience built with Expo, React Native, React Native Web, and TypeScript.

## Development
```bash
npm install
npm run web
```

Use `npm run android` or `npm run ios` for native development.

## Checks
```bash
npm run typecheck
npm run build:web
```

The app is modular: `src/app` owns the root shell, `src/features` owns feature screens and data, `src/components` contains shared UI, and `src/config` contains brand/business configuration.

This first version uses local mock content only. Authentication, bookings, payments, helper availability, and notifications are not connected to a backend.
