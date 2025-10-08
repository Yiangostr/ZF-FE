# ZenithFlix Frontend

Next-generation AI-driven streaming platform UI built with Next.js 14 and modern React patterns.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit + TanStack Query
- **Testing**: Vitest + React Testing Library

## Prerequisites

- Node.js 18+
- npm (recommended) or npm
- Backend API running (see ZF-BE)

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### 3. Run Development Server

```bash
npm dev
```

Application runs at `http://localhost:3000`

## Testing

```bash

npm test


npm test:ui

npm test:coverage
```

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── providers.tsx      # Global providers
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Base UI components
│   ├── streaming/        # Feature components
│   └── layout/           # Layout components
├── features/             # Feature modules
│   └── streaming/
│       ├── api.ts        # API client
│       └── hooks/        # Custom hooks
├── store/                # Redux store
│   ├── slices/
│   └── index.ts
├── lib/                  # Utilities
├── types/                # TypeScript types
└── test/                 # Test setup
```

## Architecture Decisions

### State Management Strategy

**Server State (TanStack Query)**

- Content fetching from API
- Automatic caching and refetching
- AbortController for request cancellation

**Global State (Redux)**

- User authentication
- App-wide preferences

**Local State (React Hooks)**

- UI toggles (modal open/close)
- Form inputs
- Component-specific state

**Persistent State (localStorage)**

- Watch history and progress

### Component Patterns

**Hook Usage Hierarchy**

1. `useMemo` - Derived state and expensive calculations
2. `useCallback` - Stable function references
3. `useRef` - DOM refs and mutable values
4. `useReducer` - Complex local state
5. `useState` - Simple UI state (last resort)

**Performance Optimizations**

- React.memo for pure components
- useMemo for object/array computations
- Image optimization with Next.js Image
- Code splitting with dynamic imports

### Design System

**Netflix-Inspired Theme**

```js
colors: {
  primary: '#E50914',
  background: {
    primary: '#141414',
    secondary: '#1F1F1F',
    tertiary: '#2F2F2F'
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#B3B3B3',
    muted: '#808080'
  }
}
```

**Responsive Breakpoints**

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Accessibility

- ARIA labels on interactive elements
- Keyboard navigation support
- Focus management in modals
- Semantic HTML structure
- Screen reader friendly

## Key Features

### Content Browsing

- Horizontal scrollable rows
- Hover interactions with scale effects
- Loading skeletons
- Responsive grid layout

### Content Modal

- Detailed content information
- Play button with mock player
- Add to list functionality
- Progress indicator
- Keyboard accessible (ESC to close)

### Watch History

- localStorage persistence
- Progress tracking per content
- Visual progress bars
- Custom hook pattern

## Development Commands

```bash
npm dev
npm build
npm start
npm lint
npm test
```

## Production Deployment

### Vercel (AFTER CONNECTED TO VERCEL)

```bash
vercel deploy
```

### Manual Deployment

```bash
npm build
npm start
```

## Performance Targets

- First Contentful Paint < 1.5s
- Time to Interactive < 3s
- Lighthouse Score > 90
- Core Web Vitals optimized

## Design Patterns

### Custom Hooks

- `useWatchHistory` - Watch progress management
- `useStreamingContent` - API data fetching
- `useContentById` - Single content fetching

### Component Composition

- Modal wrapper for dialogs
- ContentRow for horizontal scrolling
- ContentCard for individual items
- Skeleton for loading states

## Future Enhancements

- User authentication flow
- Personalized recommendations
- Search functionality
- Genre filtering
- Video player integration
- Social features (reviews, ratings)
- PWA capabilities

## Code Quality

- TypeScript strict mode enabled
- ESLint + Prettier configured
- Component testing coverage
- Hook testing with renderHook
- Accessibility audits

1. **API Integration**: Backend runs on localhost:3001
2. **Authentication**: JWT token structure from backend
3. **Content Images**: Using TMDB image URLs (We can use their API directly, which means we won’t need to maintain our own backend for most of the functions)
4. **Video Player**: Mock implementation (play icon only)
5. **Responsive Design**: Mobile-first approach
6. **Browser Support**: Modern browsers (ES2021+)

## Challenges & Solutions

### Challenge: Hook Order Violations

**Solution**: All hooks called before conditional logic, CSS for responsive rendering

### Challenge: Watch History Persistence

**Solution**: Custom hook with localStorage, memoized getters

### Challenge: Smooth Scrolling

**Solution**: useRef with smooth scroll behavior, arrow navigation

### Challenge: Modal Accessibility

**Solution**: Focus trap, ESC key handler, ARIA attributes

## Notes

- No real video playback (mock player UI only)
- Sample data from backend seed
- Theme inspired by Netflix
- Following React best practices and rules
- AbortController pattern for API calls
