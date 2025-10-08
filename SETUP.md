# Zenflix Frontend - Setup & Installation Guide

## Prerequisites

- **Node.js**: v18.x or higher
- **npm**: v9.x or higher (comes with Node.js)
- **Git**: Latest version

## Initial Setup

### 1. Clone the Repository (if not already done)

```bash
git clone
cd ZF-FE
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including:

- Next.js
- React 18
- Redux Toolkit
- TanStack Query
- Tailwind CSS
- TypeScript

### 3. Environment Configuration

Create a `.env.local` file in the root directory:

```bash
cp env.example .env.local
```

Edit `.env.local` and configure:

```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# Optional: Enable debug mode
NEXT_PUBLIC_DEBUG=false
```

**Important**: Make sure the `NEXT_PUBLIC_API_URL` matches your backend port.

## Running the Application

### Development Mode

```bash
npm run dev
```

The application will start on **http://localhost:3000**

Features in development mode:

-  Hot Module Replacement (HMR)
-  Fast Refresh
-  Source maps
-  Detailed error messages

### Production Build

#### 1. Build the application

```bash
npm run build
```

This will:

- Compile TypeScript
- Optimize bundles
- Generate static pages
- Create production assets in `.next/` folder

#### 2. Start production server

```bash
npm start
```

The production server will run on **http://localhost:3000**

## Available Scripts

| Command                 | Description                           |
| ----------------------- | ------------------------------------- |
| `npm run dev`           | Start development server on port 3000 |
| `npm run build`         | Build production-ready application    |
| `npm start`             | Start production server               |
| `npm run lint`          | Run ESLint to check code quality      |
| `npm test`              | Run unit tests with Vitest            |
| `npm run test:watch`    | Run tests in watch mode               |
| `npm run test:coverage` | Run tests with coverage report        |

## Project Structure

```
ZF-FE/
├── src/
│   ├── app/                    # Next.js 13 App Router pages
│   │   ├── login/             # Login page
│   │   ├── register/          # Registration page
│   │   ├── profile/           # User profile page
│   │   ├── my-list/           # My List page
│   │   └── trending/          # Trending content page
│   ├── components/
│   │   ├── auth/              # Authentication components
│   │   ├── layout/            # Header, navigation, etc.
│   │   ├── profile/           # Profile-related components
│   │   ├── streaming/         # Content display components
│   │   └── ui/                # Reusable UI components
│   ├── features/              # Feature-specific logic
│   │   └── streaming/
│   │       ├── api.ts         # API client
│   │       └── hooks/         # Custom hooks
│   ├── hooks/                 # Global custom hooks
│   ├── store/                 # Redux store
│   │   └── slices/            # Redux slices
│   ├── lib/                   # Utilities and helpers
│   ├── types/                 # TypeScript type definitions
│   └── config/                # Configuration files
├── public/                     # Static assets
├── tailwind.config.ts         # Tailwind CSS configuration
├── next.config.js             # Next.js configuration
└── tsconfig.json              # TypeScript configuration
```

## Testing

### Run All Tests

```bash
npm test
```

### Run Tests in Watch Mode

```bash
npm run test:watch
```

### Generate Coverage Report

```bash
npm run test:coverage
```

Coverage reports will be generated in the `coverage/` directory.

## Common Issues & Troubleshooting

### Issue: Port 3000 already in use

**Solution**: Kill the process or use a different port

```bash
# Kill process on port 3000 (macOS/Linux)
lsof -ti:3000 | xargs kill -9

# Or run on a different port
PORT=3002 npm run dev
```

### Issue: Module not found errors

**Solution**: Clear cache and reinstall

```bash
rm -rf node_modules package-lock.json .next
npm install
```

### Issue: TypeScript errors after git pull

**Solution**: Restart TypeScript server in your IDE or rebuild

```bash
npm run build
```

### Issue: Can't connect to backend API

**Solution**: Verify backend is running and check `.env.local`

1. Ensure backend is running on port 3001
2. Check `NEXT_PUBLIC_API_URL` in `.env.local`
3. Verify CORS is enabled on backend

### Issue: Styles not loading

**Solution**: Restart dev server

```bash
# Stop the server (Ctrl+C) and restart
npm run dev
```

## Authentication Flow

1. User visits **http://localhost:3000**
2. If not authenticated → redirected to `/login`
3. After login/register → redirected to home page
4. Protected routes:
   - `/` (Home)
   - `/trending`
   - `/my-list`
   - `/profile`

## Development Tips

### Hot Reload

- Changes to `.tsx`, `.ts`, `.css` files trigger automatic reload
- Changes to `.env.local` require server restart

### Code Quality

Run linter before committing:

```bash
npm run lint
```

### Browser DevTools

- Install [React Developer Tools](https://react.dev/learn/react-developer-tools)
- Install [Redux DevTools](https://github.com/reduxjs/redux-devtools)

### Performance Monitoring

Next.js includes built-in performance metrics:

1. Open browser DevTools
2. Go to **Lighthouse** tab
3. Run performance audit

## Building for Production

### 1. Environment Variables

Create `.env.production.local`:

```env
NEXT_PUBLIC_API_URL=https://your-api-domain.com/api
```

### 2. Build

```bash
npm run build
```

### 3. Test Production Build Locally

```bash
npm start
```

### 4. Deploy

The `out/` or `.next/` folder can be deployed to:

- Vercel (recommended for Next.js)
- Netlify
- AWS
- Docker container

## Next Steps

1.  Ensure backend is running (see `ZF-BE/SETUP.md`)
2.  Register a new user account
3.  Browse streaming content
4.  Test all features

## Support

For issues or questions:

- Check backend logs if API calls fail
- Review browser console for client-side errors
- Verify all environment variables are set correctly

## Related Documentation

- [Frontend README](README.md) - Project overview
- [Quick Start Guide](QUICK_START.md) - Step-by-step setup
- [Backend Setup Guide](../ZF-BE/SETUP.md) - Backend documentation
- [Backend Expert Setup](../ZF-BE/EXPERT_SETUP.md) - Quick commands
