# Fidobytes

A pet daycare management web app for staff to check in pets, track daily attendance, and monitor vaccination compliance in real time.

---

## Purpose & Goals

**Fidobytes** streamlines operations for pet daycare and boarding facilities by:

- **Digital check-in** — Staff add pets to the daily roster by pet ID (typed or QR scanned), with automatic lookup of pet and owner details from Firestore
- **Vaccination compliance** — Each pet’s status (Here, Expiring Soon, Expired/Missing) is computed from vaccination records (Rabies, Bordetella, Distemper/Parvo) and shown in the daily view
- **Daily roster view** — Date-navigable list of pets checked in per day, with color-coded status and basic actions
- **Demo mode** — Public demo without Firebase credentials for portfolio and stakeholder previews

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 17, Redux |
| **Auth & Data** | Firebase Auth, Firestore, react-redux-firebase, redux-firestore |
| **Routing** | React Router v5 |
| **State** | Redux (auth, Firestore), React Context (demo mode) |
| **UI** | Custom CSS, Font Awesome |
| **Utilities** | Moment.js, react-qr-reader |
| **Build** | Create React App, Webpack |

---

## Features

- **Authentication** — Email/password and Google sign-in; protected routes; demo bypass for unauthenticated viewers
- **Daycare dashboard** — Daily roster by date; pet name, owner, service, vaccination status; color-coded indicators (green/yellow/red)
- **Pet check-in** — Manual entry by pet ID or QR scan; auto-fetch of pet and owner from Firestore; vaccination validation before adding
- **Vaccination logic** — Status derived from Bordetella, Rabies, Distemper, Parvo; supports “Here”, “Expiring Soon”, “Expired”, and “Missing Vax”
- **Responsive layout** — Mobile-friendly daycare view and navigation

---

## Project Structure

```
src/
├── components/       # AppBar, AddDC (check-in), QReader (QR scan), PrivateRoute
├── configs/          # Firebase config (env-based)
├── contexts/         # DemoContext for demo mode
├── helpers/          # Date utilities (fixDates)
├── pages/            # SignIn, Daycare
├── reducers/         # Redux root (firebase, firestore)
└── stores/           # Redux store setup
```

---

## Getting Started

### Prerequisites

- Node.js 16+ (or Node 17+ with `NODE_OPTIONS=--openssl-legacy-provider`)
- pnpm (or npm / yarn)

### Setup

1. Clone the repository.

2. Copy the environment template and add your Firebase config:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your Firebase project credentials (see Firebase Console → Project settings → General).

3. Install dependencies and start the dev server:
   ```bash
   pnpm install
   pnpm start
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000).

### Demo Mode

Use the **View Demo** button on the login screen, or sign in with `demo@example.com` / `demo123` to explore the app without Firebase authentication. Demo data is mocked client-side.

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `REACT_APP_FIREBASE_API_KEY` | Yes | Firebase API key |
| `REACT_APP_FIREBASE_AUTH_DOMAIN` | Yes | Auth domain |
| `REACT_APP_FIREBASE_PROJECT_ID` | Yes | Firebase project ID |
| `REACT_APP_FIREBASE_STORAGE_BUCKET` | Yes | Storage bucket |
| `REACT_APP_FIREBASE_MESSAGING_SENDER_ID` | Yes | Messaging sender ID |
| `REACT_APP_FIREBASE_APP_ID` | Yes | Firebase app ID |
| `REACT_APP_FIREBASE_MEASUREMENT_ID` | No | Analytics measurement ID |
| `REACT_APP_DEMO_EMAIL` / `REACT_APP_DEMO_PASSWORD` | No | Demo credentials (default: demo@example.com / demo123) |

---

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm start` | Run development server |
| `pnpm build` | Production build |
| `pnpm test` | Run tests |
| `pnpm eject` | Eject from Create React App (irreversible) |

---

## Design Decisions

- **Firestore collections** — Separate `daycare`, `pets`, and `customers` collections with referential links (e.g. `petID`, `customerID`)
- **Demo mode** — React Context plus conditional Firestore queries so the app can run without auth or backend for demos
- **Vaccination rules** — Centralized logic in `AddDC` for status computation and warning levels
- **Env-based config** — Firebase config loaded from environment variables for deployment and security

---

## License

Designed by [Taga Studios](https://tagastudios.com).