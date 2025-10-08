# Zenflix - Quick Start Guide

Complete setup guide to get both frontend and backend running in minutes.

---

## Prerequisites

Before you begin, ensure you have installed:

- **Node.js** v18.x or higher ([Download](https://nodejs.org/))
- **PostgreSQL** v14.x or higher ([Download](https://www.postgresql.org/download/))
- **Git** ([Download](https://git-scm.com/))

Verify installations:

```bash
node --version   # Should show v18.x or higher
npm --version    # Should show v9.x or higher
psql --version   # Should show PostgreSQL 14.x or higher
```

---

## Complete Setup (5 Steps)

### Step 1: Clone Repository

```bash
git clone <repository-url>
cd zenflix
```

You should now have two directories:

- `ZF-FE/` (Frontend)
- `ZF-BE/` (Backend)

---

### Step 2: Setup Database

#### Start PostgreSQL

**macOS**:

```bash
brew services start postgresql@14
```

**Linux**:

```bash
sudo systemctl start postgresql
```

**Windows**: Start PostgreSQL service from Services app

#### Create Database

```bash
psql postgres
```

Then run these SQL commands:

```sql
CREATE DATABASE zenflix;
CREATE USER zenflix_user WITH PASSWORD 'secure_password_123';
GRANT ALL PRIVILEGES ON DATABASE zenflix TO zenflix_user;
\q
```

---

### Step 3: Setup Backend

```bash
cd ZF-BE

# Install dependencies
npm install

# Create environment file
cp env.example .env
```

Edit `.env` file:

```env
DATABASE_URL="postgresql://zenflix_user:secure_password_123@localhost:5432/zenflix?schema=public"
JWT_SECRET="your-super-secret-jwt-key-change-this"
PORT=3001
NODE_ENV=development
```

Generate a secure JWT secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output and paste it as your `JWT_SECRET`.

#### Setup Prisma & Seed Database

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# Seed database with sample data
npm run seed
```

#### Start Backend Server

```bash
npm run start:dev
```

Backend should now be running on **http://localhost:3001**

You should see:

```
Application running on: http://localhost:3001/api
```

---

### Step 4: Setup Frontend

Open a **NEW TERMINAL** window:

```bash
cd ZF-FE

# Install dependencies
npm install

# Create environment file
cp env.example .env.local
```

Edit `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

#### Start Frontend Server

```bash
npm run dev
```

Frontend should now be running on **http://localhost:3000**

You should see:

```
- Local:        http://localhost:3000
- Ready in X.Xs
```

---

### Step 5: Test the Application

1. Open browser: **http://localhost:3000**
2. You should see the login page
3. Click "Sign up now" to register
4. Create an account:
   - Name: `Test User`
   - Email: `test@example.com`
   - Password: `password123`
5. After registration, you'll be logged in automatically
6. Browse the streaming content!

---

## Verify Everything is Working

### Check Backend (Terminal 1)

Backend should show:

```
[Nest] LOG [NestApplication] Nest application successfully started
```

Test API manually:

```bash
curl http://localhost:3001/api/streaming
# Should return: {"message":"Unauthorized","statusCode":401}
# (This is correct - it means API is working but needs auth)
```

### Check Frontend (Terminal 2)

Frontend should show:

```
✓ Ready in 2.5s
```

Open browser DevTools (F12):

- Console: No errors
- Network tab: Requests to `http://localhost:3001/api` should succeed

---

## Directory Structure

```
zenflix/
├── ZF-BE/                  # Backend (NestJS + Prisma)
│   ├── src/
│   ├── prisma/
│   ├── .env               # Backend environment variables
│   └── SETUP.md           # Detailed backend guide
│
└── ZF-FE/                  # Frontend (Next.js + React)
    ├── src/
    ├── .env.local          # Frontend environment variables
    └── SETUP.md            # Detailed frontend guide
```

---

## 🔧 Daily Development Workflow

### Starting the Application

**Terminal 1 - Backend**:

```bash
cd ZF-BE
npm run start:dev
```

**Terminal 2 - Frontend**:

```bash
cd ZF-FE
npm run dev
```

### Stopping the Application

Press `Ctrl + C` in each terminal window.

---

## Useful Commands

### Backend Commands

```bash
cd ZF-BE

# Development
npm run start:dev          # Start with hot reload
npm run build              # Build for production
npm run start:prod         # Start production server

# Database
npx prisma studio          # Open database GUI
npx prisma migrate dev     # Create new migration
npx prisma migrate reset   # Reset database
npm run seed               # Re-seed database

# Testing
npm test                   # Run tests
npm run test:e2e           # E2E tests
```

### Frontend Commands

```bash
cd ZF-FE

# Development
npm run dev                # Start dev server
npm run build              # Build for production
npm start                  # Start production server

# Testing & Quality
npm run lint               # Check code quality
npm test                   # Run tests
npm run test:watch         # Tests in watch mode
```

---

## Database Management

### View Database (Prisma Studio)

```bash
cd ZF-BE
npx prisma studio
```

Opens **http://localhost:5555** - A GUI to browse/edit database

### Reset Database (Clear all data)

```bash
cd ZF-BE
npx prisma migrate reset   # This will delete ALL data!
npm run seed               # Re-add sample data
```

---

## Common Issues & Solutions

### Issue: "Port already in use"

**Backend (3001)**:

```bash
# macOS/Linux
lsof -ti:3001 | xargs kill -9

# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F
```

**Frontend (3000)**:

```bash
# macOS/Linux
lsof -ti:3000 | xargs kill -9

# Or run on different port
PORT=3002 npm run dev
```

### Issue: "Can't connect to database"

1. Check PostgreSQL is running:

   ```bash
   # macOS
   brew services list

   # Linux
   sudo systemctl status postgresql
   ```

2. Verify database exists:

   ```bash
   psql -U zenflix_user -d zenflix
   # If error, recreate database (see Step 2)
   ```

3. Check `DATABASE_URL` in `ZF-BE/.env`

### Issue: "Frontend can't connect to backend"

1. Verify backend is running on port 3001
2. Check `NEXT_PUBLIC_API_URL` in `ZF-FE/.env.local`
3. Open http://localhost:3001/api in browser (should show "Not Found" - this is OK)

### Issue: "Module not found" errors

**Backend**:

```bash
cd ZF-BE
rm -rf node_modules package-lock.json dist
npm install
```

**Frontend**:

```bash
cd ZF-FE
rm -rf node_modules package-lock.json .next
npm install
```

### Issue: Prisma errors

```bash
cd ZF-BE

# Regenerate Prisma Client
npx prisma generate

# If that doesn't work, reset everything
npx prisma migrate reset
npm run seed
```

---

## Default Test Credentials

After seeding, you can use these or create your own:

**Create your own account**:

1. Go to http://localhost:3000/register
2. Sign up with any email/password
3. Start using the app!

---

## Features to Test

### Authentication

- Register new account
- Login with email/password
- Update profile (name, email, avatar)
- Change password
- Logout

### Content Browsing

- View homepage with featured content
- Browse trending content
- Filter by Movies/Series
- Search functionality
- View content details

### My List

- Add content to "My List"
- Remove from "My List"
- View all saved content

### Video Player

- Play content
- Track watch progress
- Resume from last position

---

## Next Steps

### Explore the Code

**Backend**:

- `ZF-BE/src/modules/auth/` - Authentication logic
- `ZF-BE/src/modules/streaming/` - Content management
- `ZF-BE/prisma/schema.prisma` - Database schema

**Frontend**:

- `ZF-FE/src/app/` - Next.js pages
- `ZF-FE/src/components/` - React components
- `ZF-FE/src/store/` - Redux state management

### Documentation

- [Backend Setup Guide](ZF-BE/SETUP.md) - Detailed backend instructions
- [Frontend Setup Guide](ZF-FE/SETUP.md) - Detailed frontend instructions

### Development Tools

- **Prisma Studio**: http://localhost:5555 (database GUI)
- **API Endpoint**: http://localhost:3001/api
- **Frontend**: http://localhost:3000

---

## Pro Tips

1. **Keep terminals visible**: Use split screen to see both backend and frontend logs
2. **Use Prisma Studio**: Great for debugging database issues
3. **Enable React DevTools**: Install browser extension for debugging
4. **Check Network tab**: Browser DevTools > Network to see API calls
5. **Watch logs**: Both servers show helpful error messages

---

## Need Help?

If you're stuck:

1.  Check the error message carefully
2.  Review the [Common Issues](#-common-issues--solutions) section
3.  Verify all prerequisites are installed
4.  Make sure both servers are running
5.  Check `.env` and `.env.local` files are configured correctly

---

## Success!

If you can:

- See the homepage at http://localhost:3000
- Register and login
- Browse streaming content
- Add items to your list

**You're all set!** Happy coding!

---

## Speed Run (Under 2 Minutes)

For experienced developers who want to get running as fast as possible:

### Terminal 1 - Backend

```bash
cd ZF-BE && npm i && cp env.example .env && npx prisma generate && npx prisma migrate dev --name init && npm run seed && npm run start:dev
```

### Terminal 2 - Frontend

```bash
cd ZF-FE && npm i && cp env.example .env.local && npm run dev
```

**Note**: You still need to:

1. Have PostgreSQL running
2. Create the `zenflix` database first (see Step 2)
3. Update `.env` with your database credentials and JWT secret

Then open http://localhost:3000 and start coding!

---

## Documentation

### Setup Guides

- **[Frontend README](README.md)** - Project overview and features
- **[Frontend Setup Guide](SETUP.md)** - Detailed frontend instructions
- **[Backend Setup Guide](../ZF-BE/SETUP.md)** - Detailed backend instructions
- **[Backend Expert Setup](../ZF-BE/EXPERT_SETUP.md)** - Quick commands for experienced developers
