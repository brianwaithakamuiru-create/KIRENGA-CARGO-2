# KIRENGA CARGO 2

Premium cargo & logistics platform — clean rebuild with full portals.

## Features

- **Public site**: Landing, Services, Fleet gallery, Booking, Tracking
- **Admin Command Center**: Live stats, Bookings (confirm/cancel creates shipment), Shipments (advance lifecycle), Fleet gallery, Tracking
- **Staff workplace**: Role-filtered modules
- **Driver**: Assignments (accept → pickup → load → depart → transit → deliver), Delivery confirmation
- **Customer**: Dashboard, My bookings (create), Shipments, Tracking
- **Demo mode**: Works without Firebase (use demo logins below)
- **Security**: Server-side role checks via Cloud Functions + Firestore rules
- **CI**: GitHub Actions → Firebase Hosting

## Demo accounts

| Role     | Email                 | Password    |
|----------|-----------------------|-------------|
| Admin    | admin@kirenga.com     | admin123    |
| Staff    | ops@kirenga.com       | ops123      |
| Driver   | driver@kirenga.com    | driver123   |
| Customer | customer@kirenga.com  | customer123 |

Public tracking demo: **KC-DEMO-2026**

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Firebase (production)

```bash
cp .env.example .env
# Fill VITE_FIREBASE_* 

firebase login
firebase use <project-id>
firebase deploy --only firestore:rules,storage,functions
npm run build
firebase deploy --only hosting
```

### GitHub Actions secrets

Add to repo Settings → Secrets:

- `FIREBASE_SERVICE_ACCOUNT` (JSON service account)
- `FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_STORAGE_BUCKET`, `VITE_FIREBASE_MESSAGING_SENDER_ID`, `VITE_FIREBASE_APP_ID`

Push to `main` or `kirenga-2` to deploy.

## Shipment lifecycle

BOOKED → CONFIRMED → ASSIGNED → ACCEPTED → ARRIVED_AT_PICKUP → LOADING → LOADED → DEPARTED → IN_TRANSIT → CHECKPOINT → ARRIVED → DELIVERED

## Stack

Vite · React 18 · TypeScript · Firebase · Lucide · DM Sans + Playfair Display

---

KIRENGA CARGO 2 — security and UX from day one.
