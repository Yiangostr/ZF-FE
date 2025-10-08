# Zenflix

A modern Netflix-style streaming platform built with Next.js, NestJS, and PostgreSQL.

---

## Quick Start

Choose your setup guide based on your experience level:

### For Beginners

**[Quick Start Guide](QUICK_START.md)** - Step-by-step guide with explanations (5-10 minutes)

### Detailed Documentation

- **[Frontend Setup](SETUP.md)** - Complete Next.js/React guide
- **[Backend Setup](../ZF-BE/SETUP.md)** - Complete NestJS/Prisma guide

### For Experts

**[Backend Expert Setup](../ZF-BE/EXPERT_SETUP.md)** - Command reference for fast setup (2 minutes)

---

## Tech Stack

### Frontend (`ZF-FE/`)

- **Framework**: Next.js 13 (App Router)
- **UI Library**: React 18
- **State Management**: Redux Toolkit
- **Data Fetching**: TanStack Query
- **Styling**: Tailwind CSS
- **Language**: TypeScript

### Backend (`ZF-BE/`)

- **Framework**: NestJS
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT
- **Validation**: class-validator
- **Security**: Helmet, Rate Limiting
- **Language**: TypeScript

---

## Features

### User Features

-  User registration and authentication
-  Profile management (avatar, name, email, password)
-  Browse streaming content (movies & series)
-  Search and filter content
-  "My List" - save favorite content
-  Watch history tracking
-  Video player with progress tracking
-  Trending content page
-  Responsive design (mobile & desktop)

### Technical Features

-  JWT-based authentication
-  Password hashing (bcrypt)
-  Protected routes
-  Real-time data synchronization
-  Optimistic UI updates
-  Image optimization
-  XSS protection
-  Input validation
-  CORS configuration
-  Database migrations
-  Seed data scripts

---

## Project Structure

```
zenflix/
├── ZF-FE/                  # Frontend (Next.js)
│   ├── src/
│   │   ├── app/           # Next.js pages (App Router)
│   │   ├── components/    # React components
│   │   ├── features/      # Feature-specific logic
│   │   ├── hooks/         # Custom React hooks
│   │   ├── store/         # Redux store & slices
│   │   ├── lib/           # Utilities
│   │   └── types/         # TypeScript types
│   └── public/            # Static assets
│
├── ZF-BE/                  # Backend (NestJS)
│   ├── src/
│   │   ├── modules/       # Feature modules
│   │   │   ├── auth/     # Authentication
│   │   │   ├── streaming/# Content management
│   │   │   └── prisma/   # Database service
│   │   └── common/        # Shared utilities
│   └── prisma/
│       ├── schema.prisma  # Database schema
│       └── seed.ts        # Sample data
│
├── QUICK_START.md         # Beginner-friendly setup
├── EXPERT_SETUP.md        # Quick command reference
└── README.md              # This file
```

---

## Getting Started (Ultra Quick)

### Prerequisites

- Node.js v18+
- PostgreSQL v14+
- npm v9+

### Installation

**Option 1: Beginners**

```bash
# Follow the interactive guide
open QUICK_START.md
```

**Option 2: Experts**

```bash
# Backend (Terminal 1)
cd ZF-BE && npm i && npx prisma generate && npx prisma migrate dev && npm run seed && npm run start:dev

# Frontend (Terminal 2)
cd ZF-FE && npm i && npm run dev
```

Then open **http://localhost:3000**

---

## Usage

### Access Points

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001/api
- **Database GUI**: http://localhost:5555 (run `npx prisma studio`)

### Default Flow

1. Register a new account at `/register`
2. Login with your credentials
3. Browse content on the homepage
4. Add movies/series to "My List"
5. Track your watch progress

---

## Testing

### Frontend Tests

```bash
cd ZF-FE
npm test                   # Run tests
npm run test:watch         # Watch mode
npm run test:coverage      # Coverage report
```

### Backend Tests

```bash
cd ZF-BE
npm test                   # Unit tests
npm run test:e2e           # E2E tests
npm run test:cov           # Coverage report
```

---

## Database Management

### Prisma Studio (GUI)

```bash
cd ZF-BE
npx prisma studio
# Opens http://localhost:5555
```

### Create Migration

```bash
cd ZF-BE
npx prisma migrate dev --name migration_name
```

### Reset Database

```bash
cd ZF-BE
npx prisma migrate reset
npm run seed
```

---

## Production Deployment

### Build Frontend

```bash
cd ZF-FE
npm run build
npm start
```

### Build Backend

```bash
cd ZF-BE
npm run build
npx prisma migrate deploy
npm run start:prod
```

---

## Security

- **Password Hashing**: bcrypt with 10 salt rounds
- **JWT Tokens**: Secure token-based authentication
- **Input Validation**: All DTOs validated with class-validator
- **XSS Protection**: Helmet security headers + input sanitization
- **Rate Limiting**: Prevents brute-force attacks (100 req/15min)
- **CORS**: Configured for specific origins
- **SQL Injection**: Prevented by Prisma ORM

---

## Troubleshooting

### Port Already in Use

```bash
# Kill process on port 3000 (frontend)
lsof -ti:3000 | xargs kill -9

# Kill process on port 3001 (backend)
lsof -ti:3001 | xargs kill -9
```

### Database Connection Issues

```bash
# Check PostgreSQL is running
brew services list           # macOS
sudo systemctl status postgresql  # Linux

# Restart if needed
brew services restart postgresql@14
```

### Module Not Found

```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## API Documentation

### Authentication Endpoints

| Method | Endpoint             | Description       |
| ------ | -------------------- | ----------------- |
| POST   | `/api/auth/register` | Register new user |
| POST   | `/api/auth/login`    | Login user        |
| GET    | `/api/auth/me`       | Get current user  |
| PUT    | `/api/auth/profile`  | Update profile    |
| PUT    | `/api/auth/password` | Change password   |

### Streaming Endpoints

| Method | Endpoint                    | Description       |
| ------ | --------------------------- | ----------------- |
| GET    | `/api/streaming`            | Get all content   |
| GET    | `/api/streaming/:id`        | Get content by ID |
| GET    | `/api/streaming/trending`   | Get trending      |
| GET    | `/api/streaming/type/:type` | Filter by type    |

---

## 🤝 Contributing

### Code Quality Rules

-  All files must be under 200 lines
-  Use `useReducer` for 4+ related state values
-  Minimize `useState` and `useEffect` usage
-  Extract reusable logic into custom hooks
-  Follow DRY principles
-  Add TSDoc comments to exported functions

### Before Committing

```bash
# Frontend
cd ZF-FE
npm run lint
npm test

# Backend
cd ZF-BE
npm run lint
npm test
```

---

## License

This project is for educational purposes.

---

## Support

For setup help:

1. Check [Quick Start Guide](QUICK_START.md)
2. Review [Expert Setup Guide](EXPERT_SETUP.md)
3. Read detailed docs in [ZF-FE/SETUP.md](ZF-FE/SETUP.md) and [ZF-BE/SETUP.md](ZF-BE/SETUP.md)

---

## Learning Resources

### Official Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [NestJS Documentation](https://docs.nestjs.com)
- [Prisma Documentation](https://www.prisma.io/docs)
- [React Documentation](https://react.dev)
- [Redux Toolkit](https://redux-toolkit.js.org)

### Project Guides

- [Frontend Architecture](SETUP.md#project-structure)
- [Backend Architecture](../ZF-BE/SETUP.md#project-structure)
- [Database Schema](../ZF-BE/SETUP.md#database-schema-overview)

---
