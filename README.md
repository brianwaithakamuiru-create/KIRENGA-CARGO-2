# KIRENGA CARGO 2

Premium cargo & logistics platform — Vite + React + TypeScript + Firebase.

## Setup

1. Clone the repo
2. Copy environment variables:

```bash
cp .env.example .env
```

3. Fill Firebase config in `.env` (from Firebase Console → Project settings):

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

4. Install and run:

```bash
npm install
npm run dev
```

## Production (Vercel)

Add the same `VITE_FIREBASE_*` variables under **Project → Settings → Environment Variables**.

## Firebase setup

1. Create a Firebase project
2. Enable **Authentication** → Email/Password
3. Create **Firestore** database
4. Deploy rules: `firebase deploy --only firestore:rules,storage`
5. Create user accounts in Authentication, then add matching docs in `users/{uid}` with fields:

```json
{
  "email": "user@example.com",
  "displayName": "Name",
  "role": "admin",
  "status": "active",
  "createdAt": "...",
  "updatedAt": "..."
}
```

Roles: `admin` | `operations` | `dispatch` | `logistics` | `finance` | `documentation` | `fleet` | `support` | `hr` | `driver` | `customer`

## Stack

Vite · React 18 · TypeScript · Firebase · Lucide · DM Sans + Playfair Display
