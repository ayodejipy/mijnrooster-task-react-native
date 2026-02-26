# Mijn Rooster

A React Native mobile application for hospital staff to manage their work schedules, browse publications, and view team information.

---

## Getting Started

### Prerequisites

- Node.js 18+
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (Xcode) or Android Emulator (Android Studio)
- EAS CLI `>= 18.0.3` for builds

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
EXPO_PUBLIC_API_URL=http://localhost:3000
```

The app defaults to `http://localhost:3000` if this variable is not set. The current implementation uses seeded mock data with simulated network delays — no running backend is required to develop locally.

### Running the App

```bash
# Start the Expo development server
npm start

# Run directly on a platform
npm run ios
npm run android
npm run web
```

### Other Scripts

```bash
npm run lint           # Run ESLint
npm run reset-project  # Reset to baseline state
```

---

## Tech Stack

| Category | Library | Version |
|---|---|---|
| Framework | Expo | ~54.0.33 |
| Runtime | React Native | 0.81.5 |
| Language | TypeScript | 5.9.2 |
| Routing | Expo Router | 6.0.23 |
| State Management | Zustand | 5.0.11 |
| Styling | NativeWind | 5.0.0-preview.2 |
| Styling | Tailwind CSS | 4.2.0 |
| Animations | React Native Reanimated | 4.1.1 |
| Gestures | React Native Gesture Handler | — |
| Icons | HugeIcons React Native | 1.0.11 |
| Fonts | @expo-google-fonts/manrope | — |
| Navigation | React Navigation (bottom-tabs) | — |

---

## Project Structure

```
mijnrooster/
├── app/                        # Expo Router file-based routing
│   ├── _layout.tsx             # Root layout — providers, font loading
│   ├── modal.tsx               # Modal screen
│   └── (app)/                  # App shell group
│       ├── _layout.tsx         # Bottom tab navigator
│       ├── index.tsx           # Home tab
│       ├── rooster/index.tsx   # Schedule tab
│       ├── publications/       # Publications tab
│       └── profile/index.tsx   # Profile tab
│
├── features/                   # Feature modules (co-located types, hooks, components)
│   ├── home/
│   ├── schedule/
│   ├── publications/
│   └── profile/
│
├── components/
│   └── ui/                     # Shared design system components
│
├── store/                      # Zustand global state
├── services/                   # API service layer
├── hooks/                      # Shared React hooks
├── lib/                        # Utilities, date helpers, mock data
└── styles/                     # Global CSS, design tokens
```

### Feature Module Structure

Each feature follows a consistent internal structure:

```
features/<feature>/
├── components/
│   └── index.tsx       # Screen entry component
├── hooks/
│   └── use<Feature>.ts # Data + state logic for this feature
└── types/
    └── index.ts        # TypeScript interfaces
```

---

## Architecture

### Routing

Expo Router is used for file-based routing. The app is structured under a `(app)` route group which renders the bottom tab shell. This keeps the tab navigator isolated from the root layout, making it straightforward to add unauthenticated routes (onboarding, login) at the root level in the future.

### State Management

Zustand manages global schedule state (selected day, active shift, room filter). It was chosen over Context API for its minimal boilerplate and direct selector access without re-render overhead.

Local UI state (loading, error, search query) lives inside custom hooks per feature rather than in the global store, keeping the store lean.

### Data Layer

The service layer (`services/`) provides typed async functions for each API resource. It reads `EXPO_PUBLIC_API_URL` and returns typed responses or throws a typed `ApiError`. Components never call fetch directly — they go through the service layer or the hooks that wrap it.

Currently, services return mock seed data with a 1.5s simulated delay. Replacing the mock with real API calls requires only changes inside `services/` — no component changes needed.

### Caching

The publications feature implements a module-level cache outside the React tree. This means navigating away from the Publications tab and back does not re-fetch data. The cache is only invalidated when the user explicitly calls `refresh()`. This pattern avoids a dedicated server-state library (React Query, SWR) while still preventing redundant requests.

### Custom Text Component

React Native requires the exact loaded font family name to be set on each `Text` node — unlike the web, you cannot rely on CSS inheritance or `font-weight` to select between font files. The custom `Text` component (`components/ui/text.tsx`) handles this by accepting a `weight` prop and mapping it to the correct Manrope font family name at the style level:

```tsx
<Text weight="semibold" className="text-lg text-gray-800">Title</Text>
<Text weight="medium" className="text-sm text-gray-500">Body</Text>
```

This was necessary because NativeWind 5.0.0-preview.2 does not reliably resolve CSS variable-based font families in the React Native environment.

### Animations

The custom tab bar uses React Native Reanimated for smooth icon scale and active indicator animations. The `ShiftDetailsModal` is a manually animated bottom sheet built with `Gesture.Pan()` and `withSpring`/`withTiming`, giving full control over spring physics and dismiss thresholds without a third-party sheet library.

### Accessibility

Every interactive element includes `accessibilityRole`, `accessibilityLabel`, and where appropriate `accessibilityHint`. Decorative elements (icons, dividers, avatar decorations) are marked with `accessible={false}` and `importantForAccessibility="no"` to keep the screen reader tree clean.

---

## Design System

Fonts, colours, spacing and radius values are defined in two places:

- **`styles/tokens.ts`** — JavaScript/TypeScript constants for use in `StyleSheet` and inline styles
- **`styles/global.css`** — CSS custom properties for use in NativeWind `className` strings

Both sources are kept in sync manually. The single source of truth for colour values is `global.css`; `tokens.ts` mirrors the values needed in non-NativeWind contexts (e.g. SVG colours, Reanimated interpolation targets).

### Colour Palette

| Scale | Usage |
|---|---|
| Primary (Indigo) | Brand actions, active states, primary buttons |
| Secondary (Orange) | Accents, badges, secondary highlights |
| Gray (0–950) | Text, borders, backgrounds, surfaces |
| Success / Danger / Info | Status indicators |

### Typography

Manrope is the single typeface used across the app. Four weights are loaded:

| Weight | Font File | `weight` prop |
|---|---|---|
| 400 | Manrope_400Regular | `regular` (default) |
| 500 | Manrope_500Medium | `medium` |
| 600 | Manrope_600SemiBold | `semibold` |
| 700 | Manrope_700Bold | `bold` |

---

## Known Limitations

- **NativeWind 5 is a preview release.** CSS-based font family resolution (`--font-sans` variables, `@layer base` universal selector) does not work reliably in this version. Font application is handled at the component level as a workaround.
- **Mock data only.** The API service layer is fully wired but returns seeded data. Backend integration requires updating `services/` only.
- **Dutch locale only.** Date formatting in `lib/date.ts` is hardcoded to `nl-NL`. Internationalisation is not implemented.
