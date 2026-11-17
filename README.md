# QuickAssist

Web-first, cross-platform task marketplace prototype built on Expo, React Native, React Native Web and strict TypeScript.

## Current integrated prototype

One app with role-based workspaces:
- Customer: Home, Services, task-specific booking, dynamic estimate, Bookings, Membership, Profile and support ticket creation.
- Helper: Availability, shared task board, accept/advance/complete workflow, earnings preview and partner profile.
- Admin: Overview, shared booking management, helper availability/verification toggles, editable demo base tariffs, support ticket management and operational settings.

Role workspaces are deliberately isolated in:
- `src/features/customer`
- `src/features/helper`
- `src/features/admin`

Shared models, quote calculations and app state are in:
- `src/core/models`
- `src/core/pricing`
- `src/core/state`

This separation is intended to make future customer/helper app extraction easier. Each workspace can later become its own Expo entry point while reusing shared UI, types, pricing and API packages.

## Demo access

Choose a role on the sign-in screen. Quick demo access opens the selected workspace without real credentials:
- Customer: customer@quickassist.demo
- Helper: helper@quickassist.demo
- Admin: admin@quickassist.demo

The sign-in screen is a local prototype. It is not secure authentication. Role changes and all marketplace state are held in memory and reset on refresh.

## Test the connected flow

1. Sign in as Customer, create a booking and confirm the indicative quote.
2. Use “Switch demo role” to open Helper workspace.
3. Accept the new task, start journey, start task and complete it.
4. Switch to Admin to inspect booking status, helper status, price overrides and support tickets.
5. Switch back to Customer and inspect the booking record.

## Run locally

```bash
npm install
npm run web
```

Native development:
```bash
npm run android
npm run ios
```

Validation:
```bash
npm run typecheck
npm run build:web
```

## Not production-enabled yet

This prototype does not include a secured backend, real customer/helper authentication, OTP, persistent database, multi-device sync, payment gateway, refund/settlement ledger, real dispatch engine, live GPS, push/SMS provider, KYC provider, document storage, or legally reviewed marketplace terms. These require backend services, provider credentials, privacy/security engineering, operating procedures and acceptance testing before public launch. Demo values, sample data and local role switching must not be used for live customer operations.
