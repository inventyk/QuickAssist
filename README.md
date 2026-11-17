# QuickAssist

One Expo React Native + TypeScript application with three role-based workspaces. The customer, helper and admin feature modules are intentionally isolated so they can later become separate app entry points without rewriting shared models and business logic.

## Roles in this build
- **Customer**: Home, Services, task-specific booking, live indicative quote, Bookings, Membership, Profile and support ticket creation.
- **Helper**: Online availability, shared task board, accept/start/complete task flow, earnings preview and partner profile.
- **Admin**: Overview, shared booking management, helper online/verification controls, editable base prices, support tickets and operational settings.

## Demo sign-in
Select any role and choose **Quick demo access**.
- Customer: customer@quickassist.demo
- Helper: helper@quickassist.demo
- Admin: admin@quickassist.demo

## End-to-end demo test
1. Sign in as Customer and create a booking.
2. Tap **Switch demo role** to enter Helper. Accept the request, start journey, start task and complete it.
3. Switch to Admin and inspect the same booking, helpers, pricing and support tickets.
4. Switch back to Customer to see the updated booking status.

The shared state is local/in-memory and resets on refresh. Demo credentials do not authenticate a real person.

## Run
```bash
npm install
npm run web
```

Native:
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
- `src/features/customer`, `src/features/helper`, `src/features/admin`: role-specific workspaces and screens.
- `src/core/models`: cross-role data contracts.
- `src/core/state`: shared prototype store; replace this adapter with backend API/repository calls.
- `src/core/pricing`: common quote calculation.
- `src/components`: shared design system and navigation frame.

## Not production-enabled
Real authentication/OTP, server-side RBAC, persistent database, multi-device sync, secure dispatch, live GPS, push/SMS, KYC verification, payments/refunds/settlements, audit logs, privacy requests and compliance approvals still require backend services, provider accounts, security review and real-world operational testing. Until then, use only demo data.
