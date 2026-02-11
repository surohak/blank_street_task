# Blank Street — Store Locator

A modern, mobile-first store locator for Blank Street Coffee, built with React 19, TypeScript, and Google Maps.

---

## ✨ Features

- **Real-Time Data** — Fetches live Blank Street Coffee locations from the Google Places API, with mock data fallback
- **Interactive Map** — Google Maps with custom markers, pan-to-location, and zoom animations
- **Mobile Drawer** — Responsive bottom sheet with expand/collapse and swipe-friendly design
- **Search & Filter** — Live search by name, address, or ZIP code
- **Geolocation** — "Use my current location" with distance-sorted results
- **Location Details** — Full detail view with hours, amenities, and status badges

---

## 🏗 Architecture

```
src/
├── components/
│   ├── icons/          # SVG icon components (SearchIcon, ChevronLeftIcon, etc.)
│   ├── layout/         # App shell: TabBar, SidebarHeader, FloatingButtons, MobileDrawer
│   ├── locations/      # LocationList, LocationCard, LocationDetail
│   ├── map/            # MapView with Google Maps integration
│   ├── search/         # SearchBar with auto-focus and clear
│   └── ui/             # Shared UI: Badge, Modal
├── constants/          # Centralized app constants (colors, hours, labels)
├── data/               # Mock location data
├── store/              # Zustand state management
├── types/              # TypeScript type definitions
└── utils/              # Geo utilities, Places API client
```

### Key Design Decisions

| Area | Choice | Why |
|------|--------|-----|
| **State** | Zustand | Lightweight, no boilerplate, selector-based reactivity |
| **Styling** | Tailwind CSS 3 + custom theme | Semantic color tokens (`brand-900`, `surface`, `border`) instead of raw hex |
| **Maps** | `@vis.gl/react-google-maps` | Official Google Maps React wrapper with AdvancedMarker support |
| **Data** | Places API (New) + mock fallback | Real locations when API key is valid, graceful fallback otherwise |
| **Icons** | Custom SVG components | Tree-shakeable, no icon library dependency |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A Google Maps API key with **Maps JavaScript API** and **Places API (New)** enabled

### Installation

```bash
npm install
```

### Environment

Create a `.env` file in the project root:

```env
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

### Development

```bash
npm run dev
```

Runs at `http://localhost:5173` with hot reload.

### Production Build

```bash
npm run build
npm run preview
```

---

## 🧰 Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 19 | UI framework |
| TypeScript | 5.9 | Type safety |
| Vite | 7 | Build tool & dev server |
| Tailwind CSS | 3.4 | Utility-first styling |
| Zustand | 5 | State management |
| Google Maps | Latest | Map rendering & markers |

---

## 📁 Project Structure

### Components

- **`AppShell`** — Root layout, composes sidebar (desktop) and drawer (mobile)
- **`TabBar`** — Nearby/Previous tabs with search toggle
- **`MobileDrawer`** — Expandable bottom sheet with handle
- **`LocationList`** — Filtered, sorted list of location cards
- **`LocationCard`** — Individual location with image, status, and select button
- **`LocationDetail`** — Full detail view with hours table and amenities
- **`MapView`** — Google Maps with custom markers
- **`Modal`** — Shared modal dialog (replaces native alerts)

### Data Flow

```
Google Places API → placesApi.ts → useLocationStore (Zustand) → Components
                                         ↑
                         Mock data (fallback) ──┘
```
